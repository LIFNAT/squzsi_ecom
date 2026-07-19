'use client'

import TrackingSummary from "./TrackingSummary";
import TrackingList from "./TrackingList";
import TrackingDetails from "./TrackingDetails";
import { propsTracking } from "../page";
import { useEffect, useState } from "react";
import axios from "axios";
import { post } from "@/app/post";
import { useAdminGuard } from "@/app/hooks/useAdminGuard";

interface propsControltracking {
    respodaw: propsTracking[]
}

export default function Controltracking({ respodaw }: propsControltracking) {

    const [respodaws, setRespodaw] = useState<propsTracking[]>(respodaw);
    const [selectedOrder, setSelectedOrder] = useState<propsTracking | null>(null);

    const loading = useAdminGuard()

    // โหลดข้อมูลใหม่อัตโนมัติ
    useEffect(() => {
        const fetchTracking = async () => {
            try {
                const res = await axios.get(`${post}/payment/getorders`);

                if (res.data.success) {
                    setRespodaw(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        // โหลดทันทีครั้งแรก
        fetchTracking();

        // โหลดทุก 5 วิ
        const interval = setInterval(() => {
            fetchTracking();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className='min-h-screen bg-white'></div>
    }


    return (
        <div className="relative min-h-screen bg-[#FFF8FB] py-10 px-10 w-full">

            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />


            <div className="relative mx-auto">

                <TrackingSummary respodaw={respodaws} />


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                    <div className="md:col-span-1 flex flex-col gap-4 bg-white rounded-3xl border border-pink-50 p-5 shadow-sm">

                        <TrackingList
                            respodaw={respodaws}
                            onSelect={setSelectedOrder}
                        />

                    </div>


                    <div className="col-span-2">

                        <TrackingDetails
                            order={selectedOrder}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}