## 🚀 API Endpoints ทั้งหมด

---

### 1. Register User (สมัครสมาชิก) POST /register

`````json
{
  "full_name": "string (Required)",
  "email": "string (Required)",
  "password": "string (Required)",
  "phone": "string (Optional)"
}
### Response Data Schema (data):
````json
{
  "id": "number",
  "full_name": "string",
  "email": "string",
  "phone": "string | null",
  "status": "string ('ลูกค้า')",
  "created_at": "string (ISO Date)"
}

### 2. Login (POST /login)
````json
{
  "email": "string (Required)",
  "password": "string (Required)"
}
### Response Data Schema (data):
````json
{
  "id": "number",
  "full_name": "string",
  "email": "string",
  "phone": "string | null",
  "status": "string",
  "address": "string | null",
  "created_at": "string (ISO Date)"
}
`````

### 3. Get All Profiles (GET /accountuserprofile)
````json
[
  {
    "id": "number",
    "full_name": "string",
    "email": "string",
    "phone": "string | null",
    "status": "string",
    "address": "string | null",
    "created_at": "string (ISO Date)"
  }
]
`````


### 4. Update Profile (PUT /users/:id)
````json
{
  "full_name": "string (Optional)",
  "email": "string (Optional)",
  "phone": "string (Optional)",
  "address": "string (Optional)"
}
### Response Data Schema (data):
````json
{
  "id": "number",
  "full_name": "string",
  "email": "string",
  "phone": "string | null",
  "status": "string",
  "address": "string | null"
}
`````