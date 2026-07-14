"use client";
import { propsgetProduct } from "../page";

interface prosFeaturedProducts {
  respodaw: propsgetProduct[]
}

export default function FeaturedProducts({ respodaw }: prosFeaturedProducts) {
  return (
    <section id="featured" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-pink-400 text-xs font-bold uppercase tracking-widest">คัดสรรมาเพื่อคุณโดยเฉพาะ</span>
          <h2 className="mt-2 text-4xl font-extrabold text-gray-800">สินค้าแนะนำ</h2>
          <p className="mt-3 text-gray-400 text-sm max-w-md mx-auto">สินค้าสุดน่ารักขวัญใจทุกคนที่รอให้คุณรับกลับบ้านไป</p>
        </div>


        <div className="grid grid-cols-4 gap-5">
          {respodaw.map((e, i) => {
            return (
              <div key={i}>
                {/* Info */}
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md shadow-pink-100/60 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col border border-pink-50">

                  <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 aspect-square">
                    <img
                      src={e.producy_image?.[0] || "/no-image.png"}
                      alt={e.product_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                    <div className="absolute inset-0 flex justify-end p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 p-2  bg-gray-50 text-gray-300  rounded-full group-hover:bg-pink-400 group-hover:text-white duration-300"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    
                  </div>

                  <div className="p-3">
                    <h3 className="font-bold text-gray-700 text-base leading-snug group-hover:text-pink-500 transition-colors duration-200">
                      {e.product_name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      หมวดหมู่: {e.category}
                    </p>

                    <p className="text-sm text-gray-400 line-clamp-2">
                      รายละเอียด : {e.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-extrabold text-pink-500">
                        ${e.price}
                      </span>

                      <button
                        className="px-4 py-2 rounded-full text-xs font-bold bg-pink-500 text-white hover:bg-pink-600 cursor-pointer transition-all duration-300 active:scale-95"
                      >
                        ดูสินค้า
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="px-8 py-3 bg-pink-50 text-pink-500 font-bold rounded-full border-2 border-pink-200 hover:bg-pink-400 hover:text-white hover:border-pink-400 hover:-translate-y-0.5 transition-all duration-300 text-sm"
          >
            ดูสินค้าทั้งหมด →
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductCard() {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md shadow-pink-100/60 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col border border-pink-50">
      {/* Wishlist button */}
      <button
        aria-label="Toggle wishlist"

        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-pink-50 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-colors duration-200 `}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}

        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 aspect-square">
        {/* <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        /> */}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-gray-700 text-base leading-snug group-hover:text-pink-500 transition-colors duration-200">
          {/* {product.name} */}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-extrabold text-pink-500">
            {/* ${product.price.toFixed(2)} */}
          </span>
          <button

            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 
              }`}
          >
            {/* {addedToCart ? "Added ✓" : "+ Cart"} */}
          </button>
        </div>
      </div>
    </div>
  );
}

