🔐 Security & Password Hashing
Hashing Algorithm: SHA-256

Salt Strategy: อ่านจาก Environment Variable (process.env.AUTH_SALT) หากไม่มีจะใช้ค่า fallback 'squzsi-default-salt'

Format การ Hash: SHA256(SALT:password)

🚀 API Endpoints ทั้งหมด
1. Register User (สมัครสมาชิก)
เพิ่มผู้ใช้งานใหม่เข้าสู่ระบบ และกำหนดค่าเริ่มต้นสถานะเป็น 'ลูกค้า'

HTTP Method: POST

Endpoint: /register

📥 Request Body
JSON
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "mysecretpassword",
  "phone": "0812345678"
}
📤 Response Success (201 Created)
JSON
{
  "success": true,
  "message": "สมัครสมาชิกสำเร็จ",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "0812345678",
    "status": "ลูกค้า",
    "created_at": "2026-07-21T10:00:00.000Z"
  }
}
2. Login User (เข้าสู่ระบบ)
ตรวจสอบอีเมลและรหัสผ่านเพื่อยืนยันตัวตนเข้าสู่ระบบ

HTTP Method: POST

Endpoint: /login

📥 Request Body
JSON
{
  "email": "john@example.com",
  "password": "mysecretpassword"
}
📤 Response Success (200 OK)
JSON
{
  "success": true,
  "message": "เข้าสู่ระบบสำเร็จ",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "0812345678",
    "status": "ลูกค้า",
    "address": "123/45 Bangkok",
    "created_at": "2026-07-21T10:00:00.000Z"
  }
}
3. Get All Profiles (ดึงรายการโปรไฟล์ผู้ใช้ทั้งหมด)
เรียกดูข้อมูลผู้ใช้งานทั้งหมด เรียงจากใหม่ไปเก่า (ORDER BY id DESC)

HTTP Method: GET

Endpoint: /accountuserprofile

📥 Request Body
(ไม่มี Request Body)

📤 Response Success (200 OK)
JSON
{
  "success": true,
  "data": [
    {
      "id": 2,
      "full_name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "0898765432",
      "status": "ลูกค้า",
      "address": null,
      "created_at": "2026-07-21T10:05:00.000Z"
    },
    {
      "id": 1,
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "0812345678",
      "status": "ลูกค้า",
      "address": "123/45 Bangkok",
      "created_at": "2026-07-21T10:00:00.000Z"
    }
  ]
}
4. Update User Profile (อัปเดตข้อมูลผู้ใช้งาน)
แก้ไขข้อมูลส่วนตัวเฉพาะฟิลด์ที่ส่งเข้ามา (full_name, email, address, phone) โดยไม่แตะต้องรหัสผ่านหรือสถานะ

HTTP Method: PUT

Endpoint: /users/:id

📥 Request Body
JSON
{
  "full_name": "John Updated",
  "phone": "0811112222",
  "address": "456 Sukhumvit Rd, Bangkok"
}
📤 Response Success (200 OK)
JSON
{
  "success": true,
  "message": "อัปเดทข้อมูลสําเร็จ",
  "data": {
    "id": 1,
    "full_name": "John Updated",
    "email": "john@example.com",
    "phone": "0811112222",
    "status": "ลูกค้า",
    "address": "456 Sukhumvit Rd, Bangkok"
  }
}