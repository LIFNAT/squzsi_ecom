import { post } from "@/app/post";
import StockPage from "./components/control";

export interface propsgetProduct {
    id: number
    product_name: string
    category: string
    description: string
    price: number
    promotion: number
    current_product: number
    producy_image: string[]
    created_at : number
}

async function getProduct() {
    const res = await fetch(`${post}/product/select-products`, { cache: 'no-store' })

    const data = await res.json();

    return data.data;
}

export default async function Pagestock() {
    const response: propsgetProduct[] = await getProduct();
    return (
        <div>
            <StockPage response={response} />
        </div>
    )
}