## 🚀 API Endpoints ทั้งหมด

---

### 1. Object schema หลักของ Promotion (Response Data)

`````json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Promotion",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "ID อ้างอิงโปรโมชัน"
    },
    "code": {
      "type": "string",
      "description": "รหัสคูปองส่วนลด"
    },
    "name": {
      "type": "string",
      "description": "ชื่อโปรโมชัน"
    },
    "discount": {
      "type": "number",
      "description": "มูลค่าส่วนลด"
    },
    "type": "string",
    "description": "ประเภทส่วนลด (เช่น fixed, percent)",
    "startDate": {
      "type": "string",
      "format": "date-time",
      "description": "วันที่และเวลาเริ่มต้น"
    },
    "endDate": {
      "type": "string",
      "format": "date-time",
      "description": "วันที่และเวลาสิ้นสุด"
    },
    "status": {
      "type": "string",
      "enum": ["เปิดใช้งาน", "ปิดใช้งาน"],
      "description": "สถานะการใช้งาน"
    }
  },
  "required": ["id", "code", "name", "discount", "type", "startDate", "endDate", "status"]
}

### 2. GET / (Response)
````json
[
  {
    "id": 1,
    "code": "SUMMER50",
    "name": "ส่วนลดต้อนรับซัมเมอร์",
    "discount": 50,
    "type": "fixed",
    "startDate": "2026-03-01T00:00:00.000Z",
    "endDate": "2026-03-31T23:59:59.000Z",
    "status": "เปิดใช้งาน"
  }
]
`````

### POST / (Create Request Body)

```json
{
  "code": "SUMMER50",
  "name": "ส่วนลดต้อนรับซัมเมอร์",
  "discount": 50,
  "type": "fixed",
  "startDate": "2026-03-01T00:00:00Z",
  "endDate": "2026-03-31T23:59:59Z",
  "status": "เปิดใช้งาน"
}
```

### PUT /:id (Update Request Body)

`````json
{
  "code": "SUMMER50",
  "name": "ส่วนลดต้อนรับซัมเมอร์ (แก้ไข)",
  "discount": 100,
  "type": "fixed",
  "startDate": "2026-03-01T00:00:00Z",
  "endDate": "2026-04-15T23:59:59Z",
  "status": "เปิดใช้งาน"
}
`````
