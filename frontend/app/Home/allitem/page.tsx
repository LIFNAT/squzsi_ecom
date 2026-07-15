import { post } from "@/app/post";
import { products as fallbackProducts } from "@/app/data/mockProducts";
import AllItem from "./component/allitemlist";

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

const fallbackProductData: propsgetProduct[] = fallbackProducts.map((item, index) => ({
  id: index + 1,
  product_name: item.name,
  category: item.category,
  description: item.description,
  price: Number(item.priceWhole) || 0,
  promotion: 0,
  current_product: 1,
  producy_image: item.emoji ? [item.emoji] : [],
  created_at: Date.now() + index,
}));

async function dataproduct(): Promise<propsgetProduct[]> {
  try {
    const res = await fetch(`${post}/product/select-products`, { cache: 'no-store' })

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`)
    }

    const dataproduct = await res.json()

    if (Array.isArray(dataproduct?.data)) {
      return dataproduct.data as propsgetProduct[]
    }
  } catch (error) {
    console.error('Failed to load all products from API, using fallback data:', error)
  }

  return fallbackProductData
}

export default async function HomePage() {

  const respobaw: propsgetProduct[] = await dataproduct()

  return (
    <main>
      <AllItem
        respobaw={respobaw}
      />
    </main>
  );
}
