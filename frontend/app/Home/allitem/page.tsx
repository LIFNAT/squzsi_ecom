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

async function dataproduct(): Promise<propsgetProduct[]> {
  const res = await fetch(`${post}/product/select-products`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
  }>;
}) {

  const params = await searchParams;

  const products = await dataproduct();

  const category = params.category ?? "all";

  const filterProducts =
    category === "all"
      ? products
      : products.filter(
          (item) => item.category === category
        );

  return (
    <main>
      <AllItem
        respobaw={filterProducts}
        category={category}
      />
    </main>
  );
}