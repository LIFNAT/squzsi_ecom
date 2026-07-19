'use client'

import { propsaccount } from "@/app/admin/account/page";
import Accountuser from "./sections/accountuser";
import Scoremanagement from "./sections/scoremanagement";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminGuard } from "@/app/hooks/useAdminGuard";

interface propsAccountcontrol {
    respodaw: propsaccount[]
}

export default function Accountcontrol({ respodaw }: propsAccountcontrol) {

    const loading = useAdminGuard()

    if (loading) {
        return <div className="min-h-screen bg-white"></div>;
    }

    return (
        <div className="mx-auto w-full px-10 h-full py-10">
            <Scoremanagement respodaw={respodaw} />
            <div className="my-10">
                <Accountuser respodaw={respodaw} />
            </div>
        </div>
    )
}