import { Hono } from "hono";
import 'dotenv/config'
import { pool } from "../DB/db.js";

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

export default product