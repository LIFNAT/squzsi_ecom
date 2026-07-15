import { Hono } from "hono";
import 'dotenv/config'
import { pool } from "../DB/db.js";
import { producthome,getProductById } from "../controllers/dbproduct.js";

const product = new Hono()

product.get('/select-products', async (c) => {
    try {

        const sql = `
        SELECT * from  product
        `
        const result = await pool.query(sql)

        return c.json({
            suess: true,
            data: result.rows,
        })
    } catch (error) {
        console.error(error);

        return c.json(
            {
                status: false,
                message: "Server Error",
            },
            500
        );
    }
})
// ใน product.ts
product.put('/update-product/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    // ดึงค่าจาก body
    const { product_name, price, current_product, category, status, producy_image } = body;

    try {
        // อัปเดตข้อมูลใน Database
        const sql = `
            UPDATE product 
            SET 
                product_name = $1, 
                price = $2, 
                current_product = $3, 
                category = $4, 
                status = $5, 
                producy_image = $6
            WHERE id = $7
        `;
        
        // หมายเหตุ: ถ้า producy_image เป็น Array ใน DB ให้ส่งเป็น JSON.stringify ไปครับ
        const values = [product_name, price, current_product, category, status, JSON.stringify(producy_image), id];
        
        await pool.query(sql, values);

        return c.json({ success: true, message: "Update successful" });
    } catch (error) {
        console.error(error);
        return c.json({ status: false, message: "Server Error" }, 500);
    }
});
product.get('/producthome' , producthome)
product.get('/getProductById/:id',  getProductById)

export default product