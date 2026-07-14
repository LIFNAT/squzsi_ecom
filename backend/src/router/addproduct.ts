import 'dotenv/config'
import { pool } from "../DB/db.js";
import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import sharp from "sharp";

const addproduct = new Hono()

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

addproduct.post("/", async (c) => {
    try {
        const formData = await c.req.formData();

        const product_name = String(formData.get("product_name") || "");
        const category = String(formData.get("category") || "");
        const description = String(formData.get("description") || "");
        const price = Number(formData.get("price") || 0);
        const promotion = Number(formData.get("promotion") || 0);
        const current_product = Number(formData.get("current_product") || 0);

        // รับหลายรูป
        const imageFiles = formData.getAll("images") as File[];

        const imageUrls: string[] = [];

        // =========================
        // Upload Images
        // =========================
        for (const imageFile of imageFiles) {
            if (!imageFile || imageFile.size === 0) continue;

            const fileName = `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}.webp`;

            const filePath = `products/${fileName}`;

            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const webpBuffer = await sharp(buffer)
                .webp({ quality: 70 })
                .toBuffer();

            const { error: uploadError } = await supabase.storage
                .from("product-images")
                .upload(filePath, webpBuffer, {
                    contentType: "image/webp",
                    upsert: true,
                });

            if (uploadError) {
                console.log("UPLOAD ERROR:", uploadError);

                return c.json(
                    {
                        success: false,
                        message: "อัปโหลดรูปไม่สำเร็จ",
                        error: uploadError.message,
                    },
                    500
                );
            }

            const { data } = supabase.storage
                .from("product-images")
                .getPublicUrl(filePath);

            imageUrls.push(data.publicUrl);
        }

        // เก็บเป็น jsonb array
        const producy_image = JSON.stringify(imageUrls);

        console.log("FINAL IMAGES =", imageUrls);

        // =========================
        // Insert DB
        // =========================
        const sql = `
            INSERT INTO product (
                product_name,
                category,
                description,
                price,
                promotion,
                current_product,
                producy_image
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
        `;

        const values = [
            product_name,
            category,
            description,
            price,
            promotion,
            current_product,
            producy_image,
        ];

        const result = await pool.query(sql, values);

        return c.json({
            success: true,
            message: "เพิ่มสินค้าเรียบร้อย",
            data: result.rows[0],
        });

    } catch (error) {
        console.log("SERVER ERROR:", error);

        return c.json(
            {
                success: false,
                message: "เกิดข้อผิดพลาด",
                error: error instanceof Error
                    ? error.message
                    : "Server Error",
            },
            500
        );
    }
});

addproduct.get('/select-product', async (c) => {
    try {
        const sql = `
        SELECT * from product
        `
        const result = await pool.query(sql)

        return c.json({
            suceess: true,
            const: result.rows.length,
            message: 'ข้อมูลทั้งหมดเเสดงปกติ',
            data: result.rows,
        }, 200)
    } catch (error) {
        return c.json({
            suceess: false,
            error: error instanceof Error ? error.message : 'server Error'
        })
    }
})
// addproduct.post('/', async (c) => {
//     try {
//         const body = await c.req.json()

//         const {
//             product_name,
//             category,
//             description,
//             price,
//             promotion,
//             current_product,
//             producy_image,
//         } = body

//         const sql = `
//         INSERT INTO product (
//          product_name,
//             category,
//             description,
//             price,
//             promotion,
//             current_product,
//             producy_image
//         ) VALUES ($1 , $2 , $3 , $4 ,$5 ,$6 , $7)
//          RETURNING * ;
//         `

//         const value = [
//             product_name,
//             category,
//             description,
//             price,
//             promotion,
//             current_product,
//             JSON.stringify(producy_image)
//         ]

//         const result = await pool.query(sql, value)

//         return c.json({
//             suceess: true,
//             message: 'เพิ่มสินค้าเรียบร้อย',
//             data: result.rows[0]
//         }, 201)// 201 หมายถึง Created (สร้างข้อมูลสำเร็จ)
//     } catch (error) {
//         return c.json({
//             suceess: false,
//             message: 'เพิ่มข้อมูลไม่ลองใหม่',
//             error: error instanceof Error ? error.message : 'server Error'
//         })
//     }
// })

export default addproduct