## 🚀 API Endpoints ทั้งหมด

---

### 1.Product Data Schema
`````json
{
  "id": "number",
  "full_name": "string",
  "email": "string",
  "phone": "string | null",
  "status": "string",
  "address": "string | null",
  "created_at": "string (ISO Date)"
}

### 2 Database Schema (ตาราง product)
{
  "id": "number",
  "product_name": "string",
  "price": "number",
  "promotion": "number | null",
  "description": "string | null",
  "current_product": "number",
  "category": "string",
  "status": "string",
  "producy_image": "array (string[])"
}