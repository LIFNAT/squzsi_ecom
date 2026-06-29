graph TD

    subgraph Frontend [Client - Next.js / React]
        Visitor[Home]
        profproduct[สินค้า]
        profproduct_ID[รายละเอียดสินค้า]
        Track_status[ติดตามสถานะ]
        Sign_Up[สมัครสมาชิก]
    end


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

  
    subgraph StorageLayer [Data & Storage Layer - Supabase]
        DB[(PostgreSQL)]
        S3[(Storage - Assets)]
    end


    Frontend --> API_Gateway
    ADMIN --> API_Gateway
    
    API_Gateway --> BusinessLogic
    BusinessLogic --> DB
    BusinessLogic --> S3
