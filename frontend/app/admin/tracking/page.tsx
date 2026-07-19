import { post } from "@/app/post";
import Controltracking from "./components/control";

export interface propsTracking {
  order_id: number
  quantity: number
  price: number
  total_price: number
  payment_method: string
  created_at: string
  user_id: number
  full_name: string
  email: string
  product_id: string
  product_name: string
  category: string
  state: string
  receipt: string
  address: string
  id : string
}

async function getdataoders(): Promise<propsTracking[]> {
  try {
    const res = await fetch(`${post}/payment/getorders`, {
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error(`Request failed ${res.status}`)
    }

    const dataorders = await res.json()

    return dataorders.data

  } catch (err) {

    console.error("FETCH ERROR:", err)

    return []
  }
}

export default async function Tracking() {

  const respodaw = await getdataoders()

  return (
    <div>
      <Controltracking
        respodaw={respodaw}
      />
    </div>
  )
}