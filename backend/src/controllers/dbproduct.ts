import { Hono } from "hono";
import 'dotenv/config'
import { pool } from "../DB/db.js";
import { Context } from "hono";

const dbproduct = new Hono()

export const producthome = async (c: Context) => {
    try {
        const sql = `
        SELECT * FROM product
        LIMIT 8;
        `
        const result = await pool.query(sql)

        return c.json({
            success: true,
            data: result.rows,
        })

    } catch (err) {
        return c.json(
            {
                success: false,
                message: "Server Error",
            },
            500
        );
    }
}

export const getproductLimitThree = async (c: Context) => {
    try {
        const sql = `
      SELECT *
      FROM product
      ORDER BY RANDOM()
      LIMIT 4;
    `;

        const result = await pool.query(sql);

        return c.json(
            {
                success: true,
                data: result.rows,
            },
            200
        );
    } catch (error) {
        return c.json(
            {
                success: false,
                message: "server error",
            },
            500
        );
    }
};

export const getProductById = async (c: Context) => {
    try {
        const id = c.req.param("id");

        const sql = `
            SELECT *
            FROM product
            WHERE id = $1
            LIMIT 1
        `;

        const result = await pool.query(sql, [id]);

        if (result.rows.length === 0) {
            return c.json(
                {
                    success: false,
                    message: "Product not found",
                },
                404
            );
        }

        return c.json({
            success: true,
            data: result.rows[0],
        });

    } catch (err) {
        return c.json(
            {
                success: false,
                message: "Server Error",
            },
            500
        );
    }
};

export default dbproduct