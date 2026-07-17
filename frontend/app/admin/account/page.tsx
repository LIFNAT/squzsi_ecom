import Accountcontrol from "@/app/components/account/accountcontrol";
import Sizebar from "../stock/components/sizebar";
import { post } from "@/app/post";

export interface propsaccount {
    id: number
    full_name: string
    email: string
    stauts : string
    address : string
}

async function getdataaccount() {
    try {
        const res = await fetch(`${post}/auth/accountuserprofile`, { cache: 'no-store' })

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`)
        }

        const dataaccount = await res.json()

        return dataaccount.data
    } catch (error) {
        console.error('Failed to load products from API, using fallback data:', error)
    }
}

export default async function account() {

    const respodaw = await getdataaccount()

    return (
        <div className="flex w-full">
            <div>
                <Sizebar />
            </div>
            <div className="flex-1">
                <Accountcontrol respodaw={respodaw} />
            </div>
        </div>
    )
}