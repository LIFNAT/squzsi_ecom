import { post } from "@/app/post";
import StockPage from "./components/control";
import Sizebar from "./components/sizebar";

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
    status: string
}

async function getProduct() {
    if (!post) throw new Error('API base URL is not configured (post is empty)');

    const url = `${post}/product/select-products`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Failed to fetch products from ${url}. Status ${res.status}. ${text}`);
    }

    const data = await res.json();
    return data.data;
}

export default async function Pagestock() {
    const response: propsgetProduct[] = await getProduct();
    return (
        <div className="flex w-full  ">
          <div className="">
                <Sizebar />
            </div>

            <div className="flex-1  ">
                <StockPage response={response} />
            </div>
        </div>
    )
}