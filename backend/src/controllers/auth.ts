import 'dotenv/config'
import { pool } from '../DB/db.js'
import { Context } from 'hono'
import crypto from 'node:crypto'

const SALT = process.env.AUTH_SALT || 'squzsi-default-salt'

const hashPassword = (password: string) => {
  return crypto.createHash('sha256').update(`${SALT}:${password}`).digest('hex')
}

export const registerUser = async (c: Context) => {
  try {
    const body = await c.req.json()
    const { full_name, email, password } = body as {
      full_name?: string
      email?: string
      password?: string
    }

    if (!full_name || !email || !password) {
      return c.json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' }, 400)
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [normalizedEmail])

    if (existing.rowCount && existing.rowCount > 0) {
      return c.json({ success: false, message: 'อีเมลนี้ถูกใช้แล้ว' }, 409)
    }

    const passwordHash = hashPassword(password)
    const result = await pool.query(
      `
        INSERT INTO users (full_name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, full_name, email, created_at
      `,
      [full_name.trim(), normalizedEmail, passwordHash]
    )

    return c.json({ success: true, message: 'สมัครสมาชิกสำเร็จ', data: result.rows[0] }, 201)
  } catch (error) {
    console.error('REGISTER_ERROR', error)
    return c.json({ success: false, message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' }, 500)
  }
}

export const loginUser = async (c: Context) => {
  try {
    const body = await c.req.json()
    const { email, password } = body as {
      email?: string
      password?: string
    }

    if (!email || !password) {
      return c.json({ success: false, message: 'กรุณากรอกอีเมลและรหัสผ่าน' }, 400)
    }

    const normalizedEmail = email.trim().toLowerCase()
    const result = await pool.query(
      `
        SELECT id, full_name, email, password_hash, created_at
        FROM users
        WHERE email = $1
        LIMIT 1
      `,
      [normalizedEmail]
    )

    if (result.rowCount === 0) {
      return c.json({ success: false, message: 'ไม่พบผู้ใช้นี้' }, 404)
    }

    const user = result.rows[0]
    const passwordHash = hashPassword(password)

    if (passwordHash !== user.password_hash) {
      return c.json({ success: false, message: 'รหัสผ่านไม่ถูกต้อง' }, 401)
    }

    return c.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      data: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        created_at: user.created_at,
      },
    })
  } catch (error) {
    console.error('LOGIN_ERROR', error)
    return c.json({ success: false, message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' }, 500)
  }
}

export const accountuserprofile = async (c: Context) => {
  try {
    const sql = `
    SELECT * FROM users
    `
    const reslut = await pool.query(sql)

    return c.json({
      success: true,
      data: reslut.rows
    }, 200)
  } catch (err) {
    return c.json({
      suceess: false,
      message: 'server error'
    }, 500)
  }
}

export const updateUserProfile = async (c: Context) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { full_name, email, status, address } = body

    const result = await pool.query(
      `
    UPDATE users
    SET full_name = COALESCE($1 ,full_name),
    email = COALESCE($2 ,email),
    stauts = COALESCE($3 ,stauts),
    address = COALESCE($4,address)
    WHERE id = $5
    RETURNING id ,full_name , email , stauts , address
    `,
      [full_name, email, status, address, id]
    )

    if (result.rowCount === 0) {
      return c.json({
        success: false,
        message: 'ไม่พบผู้ใช้งาน'
      }, 404)
    }

    return c.json({
      success: true,
      message: 'อัปเดทข้อมูลสําเร็จ',
      data: result.rows[0]
    }, 200)
  } catch (err) {
    return c.json({
      success: false,
      message: 'UPDATE_USER_ERROR', err
    }, 500)
  }
}
