"use client";

import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Strawberry Cream Squishy",
    price: 12.99,
    badge: "Best Seller",
    image: "https://placehold.co/600x600/FFDCE8/FF8FB1?text=🍓+Squishy",
  },
  {
    id: 2,
    name: "Bunny Plushie Doll",
    price: 18.99,
    badge: "New",
    image: "https://placehold.co/600x600/F8BBD9/E91E8C?text=🐰+Plushie",
  },
  {
    id: 3,
    name: "Mystery Blind Box",
    price: 9.99,
    badge: "Hot",
    image: "https://placehold.co/600x600/FFD6E8/FF69B4?text=🎁+Blind+Box",
  },
  {
    id: 4,
    name: "Kawaii Star Charm Set",
    price: 7.99,
    badge: "Limited",
    image: "https://placehold.co/600x600/FFC8DD/FF8FB1?text=⭐+Charms",
  },
];

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-pink-400 text-white",
  New: "bg-green-400 text-white",
  Hot: "bg-orange-400 text-white",
  Limited: "bg-purple-400 text-white",
};

function ProductCard({ product }: { product: typeof products[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md shadow-pink-100/60 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col border border-pink-50">
      {/* Badge */}
      <span className={`absolute top-3 left-3 z-10 text-xs font-bold px-3 py-1 rounded-full ${badgeColors[product.badge]}`}>
        {product.badge}
      </span>

      {/* Wishlist button */}
      <button
        aria-label="Toggle wishlist"
        onClick={() => setWishlisted(!wishlisted)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-pink-50 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-colors duration-200 ${wishlisted ? "fill-pink-500 text-pink-500" : "text-gray-400"}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          fill={wishlisted ? "currentColor" : "none"}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-gray-700 text-base leading-snug group-hover:text-pink-500 transition-colors duration-200">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-extrabold text-pink-500">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 ${
              addedToCart
                ? "bg-green-400 text-white scale-95"
                : "bg-pink-100 text-pink-500 hover:bg-pink-400 hover:text-white"
            }`}
          >
            {addedToCart ? "Added ✓" : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-pink-400 text-xs font-bold uppercase tracking-widest">Hand-picked for you</span>
          <h2 className="mt-2 text-4xl font-extrabold text-gray-800">Featured Products</h2>
          <p className="mt-3 text-gray-400 text-sm max-w-md mx-auto">Our most-loved kawaii pieces, waiting to go home with you.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="px-8 py-3 bg-pink-50 text-pink-500 font-bold rounded-full border-2 border-pink-200 hover:bg-pink-400 hover:text-white hover:border-pink-400 hover:-translate-y-0.5 transition-all duration-300 text-sm"
          >
            View All Products →
          </a>
        </div>
      </div>
    </section>
  );
}
