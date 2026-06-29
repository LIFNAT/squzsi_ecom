<img width="293" height="757" alt="image" src="https://github.com/user-attachments/assets/002d58b8-09c2-44a4-be6c-624dc0f6a173" /># squzsi_ecom

ecom_sell_squzsi

 frontend
 react,nextjs,tailwind
 
 backend
 hono
 
 database
 supabase , mongodb

แบ่งงาน
frontend
-
-
-
-
backend
-
-
-
database
-
-
-
graph TD
    %% ชั้น Frontend
    subgraph Frontend [Client - Next.js / React]
        Visitor[Home]
        profproduct[สินค้า]
        profproduct_ID[รายละเอียดสินค้า]
        Track_status[ติดตามสถานะ]
        Sign_Up[สมัครสมาชิก]
    end

    %% ชั้น Admin
    subgraph ADMIN [Admin - Backoffice]
        Manage_Account[จัดการสต๊อก]
        DatingBot[เดทบอท]
        Track_status_Admin[ติดตามสถานะuser]
        promotion[โปรโมชั่น]
    end

    %% ชั้น Logic & API
    subgraph LogicLayer [API & Business Logic Layer]
        subgraph API_Gateway [API Gateway]
            Auth[Auth / JWT Validation]
            Route[Routing & Filtering]
        end
        subgraph BusinessLogic [Business Logic Functions]
            StockCalc[Stock Calculation]
            BotEngine[fitter product]
            StatusManager[Status Tracking Logic]
            SalesModule[Sales & Checkout System]
        end
    end

    %% ชั้นข้อมูล
    subgraph StorageLayer [Data & Storage Layer - Supabase]
        DB[
