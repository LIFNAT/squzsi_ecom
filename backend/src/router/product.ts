import { Hono } from "hono";
import 'dotenv/config'
import { pool } from "../DB/db.js";
import { producthome, getProductById, getproductLimitThree } from "../controllers/dbproduct.js";

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

    const {
        product_name,
        price,
        promotion,
        description,
        current_product,
        category,
        status,
        producy_image
    } = body;

    try {
        const sql = `
            UPDATE product 
            SET 
                product_name = $1,
                price = $2,
                promotion = $3,
                description = $4,
                current_product = $5,
                category = $6,
                status = $7,
                producy_image = $8
            WHERE id = $9
            RETURNING *
        `;

        const values = [
            product_name,
            price,
            promotion,
            description,
            current_product,
            category,
            status,
            JSON.stringify(producy_image || []),
            id
        ];

        const result = await pool.query(sql, values);

        if (result.rows.length === 0) {
            return c.json({
                success: false,
                message: "ไม่พบสินค้า"
            }, 404);
        }

        return c.json({
            success: true,
            message: "Update successful",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return c.json({
            success: false,
            message: "Server Error"
        }, 500);
    }
});


product.get('/producthome', producthome)
product.get('/getProductById/:id', getProductById)
product.get('/getproductLimitThree', getproductLimitThree)

export default product