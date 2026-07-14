import { post } from "@/app/post";
import Control from "./componentspage/control";

export interface propsgetProduct {
    id: number
    product_name: string
    category: string
    description: string
    price: number
    promotion: number
    current_product: number
    producy_image: string[]
    created_at: number
}

async function getdataproduct() {
    const res = await fetch(`${post}/product/producthome`, { cache: 'no-store' })

    const dataproduct = await res.json()

    return dataproduct.data
}

export default async function Home() {

    const respodaw: propsgetProduct[] = await getdataproduct()

    return (
        <div className="relative flex flex-col min-h-screen">
            <main className="flex-1">
                <Control respodaw={respodaw} />
            </main>
        </div>
    )
}