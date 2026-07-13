import { post } from "@/app/post";
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

async function dataproduct() {

  const res = await fetch(`${post}/product/select-products`, { cache: 'no-store' })

  const dataproduct = await res.json()

  return dataproduct.data

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