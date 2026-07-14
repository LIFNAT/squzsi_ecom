import 'dotenv/config'
import { Pool } from 'pg'

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,// เปลี่ยนตรงนี้เป็น false เพื่อยอมรับ self-signed certificate ของ Supabase
    }
})

export const connectDB = async () => {
    try {
        const client = await pool.connect()
        console.log('DB connect')
        client.release()
    } catch (error) {
        console.error(" Database connection failed:", error);
        process.exit(1);
    }
}