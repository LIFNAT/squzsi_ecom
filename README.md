# 🧸 Squishy CS (สกุชชี่ CS)

> แพลตฟอร์มดิจิทัลสำหรับการจัดการคลังสะสมและร้านค้าออนไลน์ที่ยกระดับประสบการณ์การซื้อสกุชชี่ จาก "ของเล่น" สู่ "เครื่องมือบำบัดทางอารมณ์" (Emotional Tool) ที่ทรงพลัง

---

## 📋 ข้อมูลโครงงาน

* **ชื่อโครงงาน:** สกุชชี่ CS / Squishy CS
* **สมาชิก:**
  - `67134327` พิชรัตน์ มีสรรพวงศ์ — **Project Manager**
  - `67093772` อดิเทพ ประกอบมี — **Frontend Developer**
  - `67111002` ศุภโชติ ค้าขาย — **Full-Stack**
  - `67128190` อานัส มุขมุกดา — **Frontend Developer**
  - `67077781` ภูรี ปัดภัย — **Full-Stack**
* **แนวคิดหลัก:** เปลี่ยนพื้นที่ร้านค้าออนไลน์ให้เป็น Digital Experience ที่ตอบโจทย์นักสะสมและผู้ที่ชื่นชอบความผ่อนคลาย (Sensory Enthusiasts)

---

## 🎯 วัตถุประสงค์ของโครงงาน Squishy E-commerce Platform

* **เพื่อพัฒนาระบบแพลตฟอร์มจัดจำหน่ายสินค้า Squishy ด้วยเทคโนโลยีสมัยใหม่:**  
  เพื่อสร้างเว็บไซต์พาณิชย์อิเล็กทรอนิกส์ที่มีประสิทธิภาพสูง รองรับการเข้าถึงที่รวดเร็ว (High Performance) โดยเลือกใช้ Next.js และ Tailwind CSS เพื่อมอบประสบการณ์การเลือกซื้อสินค้าที่ลื่นไหล ตอบโจทย์ไลฟ์สไตล์ของผู้ที่ชื่นชอบของสะสม

* **เพื่อยกระดับการนำเสนอสินค้าผ่านประสบการณ์เชิงสัมผัสทางดิจิทัล (Digital Tactile Experience):**  
  เพื่อออกแบบอินเทอร์เฟซ (UI) และสื่อมัลติมีเดียที่สื่อถึงความนุ่มนิ่ม (Squishiness) และความน่ารักของตัวสินค้า เพื่อสร้างแรงบันดาลใจและส่งเสริมสุขภาวะทางจิตใจ (Emotional Well-being) ให้แก่ผู้ใช้งานผ่านการเลือกซื้อและสะสม

* **เพื่อสร้างระบบการบริหารจัดการสินค้าสะสมและตลาดซื้อขายมือสองที่มีมาตรฐาน:**  
  เพื่อพัฒนาระบบนิเวศการซื้อขายที่น่าเชื่อถือ รองรับการจัดการสินค้าหายาก (Limited Edition) และระบบตลาดกลาง (Marketplace) สำหรับสินค้ามือสอง เพื่อสร้างความมั่นใจในด้านความปลอดภัยและการตรวจสอบคุณภาพสินค้าให้กับคอมมูนิตี้คนรัก Squishy

* **เพื่อพัฒนาระบบจัดการหลังบ้าน (Back-end) และเครื่องมือวิเคราะห์ข้อมูลเชิงลึก:**  
  เพื่อสร้างระบบการจัดการคลังสินค้า (Inventory Management) ที่มีความแม่นยำสูง พร้อมระบบวิเคราะห์ข้อมูลพฤติกรรมผู้บริโภค (Data Analytics) เพื่อนำมาใช้ในการบริหารจัดการสต็อกสินค้าและวางกลยุทธ์การตลาดที่ตอบโจทย์ความต้องการของกลุ่มเป้าหมายได้อย่างตรงจุด

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

* **Frontend:** [Next.js](https://nextjs.org/) (SSR for performance & SEO), [Tailwind CSS](https://tailwindcss.com/)
* **Backend:** Node.js & Hono.js (Middleware & Business Logic)
* **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Real-time Subscription, Row Level Security)

---

## 🏗 สถาปัตยกรรมระบบ (SDLC)

กระบวนการพัฒนาโครงการนี้ยึดตามหลักมาตรฐาน **SDLC (Software Development Life Cycle)**:

1. 📌 **Planning & Requirement Analysis:** วิเคราะห์ความต้องการเชิงธุรกิจและฟังก์ชันระบบ
2. 📝 **Defining Requirements:** จัดทำเอกสารข้อกำหนดซอฟต์แวร์ (SRS)
3. 🎨 **Designing:** ออกแบบ UI/UX และ Database Architecture
4. 💻 **Building / Developing:** พัฒนาระบบด้วย Next.js และ Hono.js
5. 🧪 **Testing:** ทดสอบระบบเพื่อความถูกต้องและความปลอดภัย
6. 🚀 **Deployment:** ติดตั้งระบบบน Server พร้อมรองรับผู้ใช้งานจริง
7. 🛠️ **Maintenance:** การดูแลรักษาและปรับปรุงฟีเจอร์อย่างต่อเนื่อง

---

## 🚀 ขอบเขตของระบบ (System Scope & Roles)

### 1. 👤 ผู้ใช้งานทั่วไป / ลูกค้า (User)
1. **ระบบสมัครสมาชิก (Register):** ลงทะเบียนเพื่อเริ่มต้นใช้งานระบบ
2. **ระบบเข้าสู่ระบบ (Login):** เข้าใช้งานด้วยบัญชีส่วนตัวอย่างปลอดภัย
3. **ค้นหาสินค้า (Search Products):** ค้นหาสินค้าที่ต้องการได้อย่างรวดเร็ว
4. **คัดกรองสินค้า (Filter Products):** ตัวกรองแยกตามหมวดหมู่และคุณลักษณะสินค้า
5. **ตะกร้าสินค้า (Shopping Cart):** เพิ่ม/ลด/ลบ รายการสินค้าในตะกร้าก่อนทำการสั่งซื้อ
6. **รายการโปรด (Wishlist):** กดหัวใจบันทึกสินค้าที่สนใจไว้ดูภายหลัง
7. **ชำระเงินซื้อสินค้า (Checkout & Payment):** ดำเนินการชำระเงินค่าสินค้า
8. **จัดการโปรไฟล์ (Edit Profile):** แก้ไขข้อมูลส่วนตัว เช่น ชื่อ และที่อยู่จัดส่ง
9. **ประวัติการสั่งซื้อ (Order History):** ตรวจสอบรายการและสถานะการสั่งซื้อสินค้า
10. **ส่วนลด & โปรโมชัน (Coupon/Discount):** *(ฟีเจอร์เสริมตามระยะเวลาพัฒนา)* รองรับการใช้โค้ดส่วนลด

---

### 2. 🛠️ ผู้ดูแลระบบ (Admin)
1. **เข้าสู่ระบบหลังบ้าน (Admin Login):** ยืนยันตัวตนเพื่อเข้าใช้งานส่วนการจัดการ
2. **เพิ่มสินค้า (Add Product):** บันทึกรายการสินค้าใหม่เข้าสู่ระบบ
3. **แก้ไขสินค้า (Edit Product):** ปรับปรุงข้อมูล สต๊อก และรายละเอียดสินค้า
4. **จัดการสถานะคำสั่งซื้อ (Order Management):** ตรวจสอบและอัปเดตสถานะการจัดส่ง
5. **รายงานยอดขายรวม (Sales Overview):** ดูสรุปยอดขายรวมและการสั่งซื้อ
6. **แอดโปรโมชัน (Manage Promotion):** *(ฟีเจอร์เสริมตามระยะเวลาพัฒนา)* สร้างและจัดการแคมเปญส่วนลด

---

### 3. 👑 ผู้ดูแลระบบสูงสุด (Super Admin)
1. **จัดการบัญชีและสิทธิ์ผู้ใช้งาน (RBAC Management):** แก้ไขข้อมูล จัดการบัญชี และกำหนดระดับสิทธิ์ (Role & Permission) ของทีมงาน
2. **รายงานยอดขายรวมเชิงลึก (Executive Dashboard):** สรุปรายงานยอดขายและการเติบโตในระดับบริหาร

---

## 💡 คุณค่าของโครงการ (Value Proposition)

* 🧠 **Sensory & Emotional Relief:** รองรับไลฟ์สไตล์การคลายเครียดของคนรุ่นใหม่
* 📈 **Scalable Architecture:** ออกแบบมาเพื่อรองรับจำนวนผู้ใช้ที่เพิ่มขึ้น
* 🔒 **High Security:** ปกป้องข้อมูลลูกค้าด้วยระบบ Row Level Security (RLS) จาก Supabase

---
prototype
https://canva.link/cpjp9m3jbhyqrhe
---
## 🌐 UAT / SLA

https://uat-wheat.vercel.app/

---
## Persona
https://www.canva.com/design/DAHOZJWa2Qk/NoJ1E_g-VmJ4pvQ2p5IJyQ/edit

## 📐 Diagrams

### 🔄 Use Case Diagram
<img width="1232" alt="Use Case Diagram" src="https://github.com/user-attachments/assets/03e75a0e-ab6e-4961-90e3-e0d488ad124d" />

---

### 🗂️ Class Diagram
<img width="1250" alt="Class Diagram" src="https://github.com/user-attachments/assets/3fc0dc1c-0ce1-49ed-81c4-9becc7fa81b8" />

---

### ⏱️ Sequence Diagram
<img width="1758" alt="Sequence Diagram" src="https://github.com/user-attachments/assets/23498f8b-57a9-458d-bfd4-e6e7d9610fce" />
<img width="1860" height="3456" alt="image" src="https://github.com/user-attachments/assets/256cab17-2a95-4a0a-a447-5d8f52a038a7" />
<img width="1787" height="723" alt="image" src="https://github.com/user-attachments/assets/aff59d93-004a-488d-bd39-5a94a7f2ffaf" />

---

---
### Data Schema json
auth : https://github.com/LIFNAT/squzsi_ecom/blob/main/API%20Endpoints/User%20Authentication%20%26%20Profile.md  
product : https://github.com/LIFNAT/squzsi_ecom/blob/main/API%20Endpoints/dbproduct.md
addproduct : https://github.com/LIFNAT/squzsi_ecom/blob/main/API%20Endpoints/addproduct.md0
payment : https://github.com/LIFNAT/squzsi_ecom/blob/main/API%20Endpoints/payment.md
promotion : https://github.com/LIFNAT/squzsi_ecom/blob/main/API%20Endpoints/promotion.md
--

### ⚙️ System Architecture
<!-- <img width="522" alt="System Flow" src="https://github.com/user-attachments/assets/e80f2d4b-0492-45a6-bac1-44ccc901d53a" /> -->
<img width="1234" height="212" alt="systemarchitecture" src="https://github.com/user-attachments/assets/99517d4a-d4aa-48e5-8f8f-fcba98a5dca7" />

---

## 🔗 เครื่องมือเพิ่มเติม
markdown
https://frontend-weld-xi-cmw3u2x2t4.vercel.app/
