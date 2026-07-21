## 🚀 API Endpoints ทั้งหมด

---

### 1. Checkout (POST /checkout)

`````json
{
  "user_id": "number (Required)",
  "payment_method": "string (Required)",
  "items": [
    {
      "product_id": "number (Required)",
      "quantity": "number (Required)",
      "promotion": "number (Optional, Default 0)"
    }
  ]
}

### 2. Get Orders (GET /orders & GET /orders/user/:id)
````json
[
  {
    "order_id": "number",
    "quantity": "number",
    "price": "number",
    "total_price": "number",
    "payment_method": "string",
    "created_at": "string (ISO Date)",
    "state": "string | null",
    "receipt": "string",
    "user_id": "number",
    "full_name": "string",
    "email": "string",
    "address": "string | null",
    "product_id": "number",
    "product_name": "string",
    "category": "string | null",
    "promotion": "number | null",
    "producy_image": "array (ส่งมาเฉพาะ endpoint ของ user)"
  }
]


### 3. Get All Orders (GET /orders)

````json
{
  "success": true,
  "data": [
    {
      "order_id": 1,
      "quantity": 2,
      "price": 1500,
      "total_price": 3000,
      "payment_method": "PromptPay",
      "created_at": "2026-07-21T10:00:00.000Z",
      "state": "pending",
      "receipt": "receipt-583920",
      "user_id": 10,
      "full_name": "Somchai Jaidee",
      "email": "somchai@email.com",
      "address": "123/45 Bangkok",
      "product_id": 5,
      "product_name": "Wireless Mouse",
      "category": "Electronics",
      "promotion": 0
    }
  ]
}