import { Context } from "hono";
import { pool } from "../DB/db.js";

export const checkout = async (c: Context) => {

    const client = await pool.connect();

    try {
        const body = await c.req.json();
        console.log("BODY:", body);
        const {
            user_id,
            items,
            payment_method
        } = body;
        await client.query("BEGIN");
        for (const item of items) {
            const result = await client.query(
                "SELECT * FROM product WHERE id = $1",
                [
                    item.product_id
                ]
            );
            if (result.rows.length === 0) {
                throw new Error("ไม่พบสินค้า");
            }
            const product = result.rows[0];
            const totalPrice =
                Number(product.price) *
                Number(item.quantity);

            const random = Math.floor(100000 + Math.random() * 900000);
            const receipt = `receipt-${random}`;

            await client.query(
                `
                INSERT INTO orders
                (
                    user_id,
                    product_id,
                    quantity,
                    price,
                    category,
                    total_price,
                    payment_method,
                    receipt
                )
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
                `,
                [
                    user_id,
                    product.id,
                    item.quantity,
                    product.price,
                    product.category,
                    totalPrice,
                    payment_method,
                    receipt
                ]
            );

        }
        await client.query("COMMIT");
        return c.json({
            success: true,
            message: "สร้างคำสั่งซื้อสำเร็จ"
        });
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        return c.json({
            success: false,
            message: "Server Error"
        }, 500);
    } finally {
        client.release();
    }
};

export const getorders = async (c: Context) => {
    try {

        const sql = `
        SELECT 

        orders.id AS order_id,
        orders.quantity,
        orders.price,
        orders.total_price,
        orders.payment_method,
        orders.created_at,
        orders.state,
        orders.receipt,

        users.id AS user_id,
        users.full_name,
        users.email,
        users.address,

        product.id AS product_id,
        product.product_name AS product_name,
        product.category

        FROM orders

        INNER JOIN users
        ON orders.user_id = users.id

        INNER JOIN product
        ON orders.product_id = product.id

        ORDER BY orders.created_at DESC
        `;

        const result = await pool.query(sql);

        return c.json({
            success: true,
            data: result.rows
        });

    } catch (error: any) {

        console.error("GET ORDERS ERROR:", error.message);

        return c.json({
            success: false,
            error: error.message
        }, 500);
    }
};

export const changestate = async (c: Context) => {
    try {
        const body = await c.req.json()

        const {
            order_id,
            state
        } = body;


        if (!order_id || !state) {
            return c.json({
                success: false,
                message: "กรุณาส่ง order_id และ state"
            }, 400);
        }

        const result = await pool.query(
            `
      UPDATE orders
      SET state = $1
      WHERE id = $2
      RETURNING *
      `,
            [
                state,
                order_id
            ]
        );

        if (result.rowCount === 0) {
            return c.json({
                success: false,
                message: "ไม่พบ order"
            }, 404);
        }


        return c.json({
            success: true,
            message: "เปลี่ยนสถานะสำเร็จ",
            data: result.rows[0]
        });
    } catch (error) {

    console.error(error);

    return c.json({
      success: false,
      message: "Server error"
    }, 500);
  }
}

// import { Context } from "hono";
// import { pool } from "../DB/db.js";

// export const checkout = async (c: Context) => {
//     const client = await pool.connect();
//     try {
//         const body = await c.req.json();

//         console.log("BODY:", body);

//         const {
//             user_id,
//             items,
//             payment_method
//         } = body;

//         await client.query("BEGIN");

//         for (const item of items) {
//             // เช็คสินค้าและจำนวนคงเหลือ
//             const result = await client.query(
//                 `
//                 SELECT *
//                 FROM product
//                 WHERE id = $1
//                 AND current_product >= $2
//                 `,
//                 [
//                     item.product_id,
//                     item.quantity
//                 ]
//             );

//             if (result.rows.length === 0) {
//                 throw new Error(
//                     "สินค้าไม่เพียงพอ หรือไม่พบสินค้า"
//                 );
//             }

//             const product = result.rows[0];

//             const totalPrice =
//                 Number(product.price) *
//                 Number(item.quantity);

//             // สร้าง order
//             await client.query(
//                 `
//                 INSERT INTO orders
//                 (
//                     user_id,
//                     product_id,
//                     quantity,
//                     price,
//                     category,
//                     total_price,
//                     payment_method
//                 )
//                 VALUES ($1,$2,$3,$4,$5,$6,$7)
//                 `,
//                 [
//                     user_id,
//                     product.id,
//                     item.quantity,
//                     product.price,
//                     product.category,
//                     totalPrice,
//                     payment_method
//                 ]
//             );

//             // ลดจำนวนสินค้าใน stock
//             await client.query(
//                 `
//                 UPDATE product
//                 SET current_product = current_product - $1
//                 WHERE id = $2
//                 `,
//                 [
//                     item.quantity,
//                     product.id
//                 ]
//             );
//         }

//         await client.query("COMMIT");

//         return c.json({
//             success: true,
//             message: "สร้างคำสั่งซื้อสำเร็จ"
//         });


//     } catch (error) {

//         await client.query("ROLLBACK");

//         console.error(error);

//         return c.json(
//             {
//                 success:false,
//                 message:
//                 error instanceof Error
//                 ? error.message
//                 : "Server Error"
//             },
//             500
//         );
//     } finally {
//         client.release();
//     }
// };




// export const getorders = async (c: Context) => {

//     try {

//         const sql = `
//         SELECT

//         orders.id,
//         orders.quantity,
//         orders.price,
//         orders.total_price,
//         orders.payment_method,
//         orders.created_at,

//         users.id AS user_id,
//         users.full_name,
//         users.email,

//         product.id AS product_id,
//         product.name,
//         product.category

//         FROM orders

//         JOIN users
//         ON orders.user_id = users.id

//         JOIN product
//         ON orders.product_id = product.id

//         ORDER BY orders.created_at DESC
//         `;

//         const result = await pool.query(sql);

//         return c.json({
//             success:true,
//             data:result.rows
//         });

//     } catch(error){
//         console.error(error);
//         return c.json({
//             success:false,
//             message:"Server Error"
//         },500);
//     }
// };