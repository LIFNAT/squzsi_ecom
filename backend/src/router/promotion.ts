import { Hono } from "hono";
import { pool } from "../DB/db.js";


const promotion = new Hono();


// GET ALL
promotion.get("/", async (c) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                code,
                name,
                discount,
                type,
                start_date AS "startDate",
                end_date AS "endDate",
                status
            FROM promotions
            ORDER BY id DESC
        `);

        return c.json(result.rows);

    } catch (error) {
        console.log(error);
        return c.json([], 500);
    }
});



// CREATE
promotion.post("/", async (c) => {

    try {

        const body = await c.req.json();


        const result = await pool.query(
            `
            INSERT INTO promotions
            (
                code,
                name,
                discount,
                type,
                start_date,
                end_date,
                status
            )

            VALUES
            ($1,$2,$3,$4,$5,$6,$7)

            RETURNING
                id,
                code,
                name,
                discount,
                type,
                start_date AS "startDate",
                end_date AS "endDate",
                status
            `,
            [
                body.code,
                body.name,
                Number(body.discount),
                body.type,
                body.startDate,
                body.endDate,
                body.status || "เปิดใช้งาน"
            ]
        );


        return c.json(result.rows[0], 201);


    } catch (error) {

        console.log(error);

        return c.json({
            message: "create error"
        }, 500);

    }

});




// UPDATE
promotion.put("/:id", async (c) => {

    try {

        const id = c.req.param("id");

        const body = await c.req.json();


        const result = await pool.query(
            `
            UPDATE promotions

            SET
                code=$1,
                name=$2,
                discount=$3,
                type=$4,
                start_date=$5,
                end_date=$6,
                status=$7

            WHERE id=$8

            RETURNING
                id,
                code,
                name,
                discount,
                type,
                start_date AS "startDate",
                end_date AS "endDate",
                status
            `,
            [
                body.code,
                body.name,
                Number(body.discount),
                body.type,
                body.startDate,
                body.endDate,
                body.status,
                id
            ]
        );


        return c.json(result.rows[0]);


    } catch (error) {

        console.log(error);

        return c.json({
            message: "update error"
        }, 500);

    }

});

// DELETE
promotion.delete("/:id", async (c) => {

    try {

        const id = c.req.param("id");


        await pool.query(
            `
            DELETE FROM promotions
            WHERE id=$1
            `,
            [id]
        );


        return c.json({
            message: "delete success"
        });


    } catch (error) {

        console.log(error);

        return c.json({
            message: "delete error"
        }, 500);

    }

});

//เพิ่มใหม่: CHECK COUPON (ใช้เช็กในหน้ายืนยันการชำระเงิน)
promotion.post("/check", async (c) => {
    try {
        const body = await c.req.json();
        const code = body.code;

        const result = await pool.query(
            `
            SELECT
                id,
                code,
                name,
                discount,
                type,
                start_date AS "startDate",
                end_date AS "endDate",
                status
            FROM promotions
            WHERE code = $1
            `,
            [code]
        );

        // เคสไม่พบคูปอง
        if (result.rows.length === 0) {
            return c.json({ success: false, message: "ไม่พบรหัสคูปองนี้ในระบบ" }, 404);
        }

        const coupon = result.rows[0];

        // เคสคูปองโดนปิดใช้งาน
        if (coupon.status === "ปิดใช้งาน") {
            return c.json({ success: false, message: "คูปองนี้ถูกปิดใช้งานแล้ว" }, 400);
        }

        // คูปองใช้งานได้ปกติ ส่งกลับเป็นก้อน JSON
        return c.json(coupon);

    } catch (error) {
        console.log(error);
        return c.json({ success: false, message: "ระบบตรวจสอบคูปองขัดข้อง" }, 500);
    }
});


export default promotion;