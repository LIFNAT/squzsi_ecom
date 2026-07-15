import { Link } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 px-8 py-14 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-pink-300/40">
          {/* Decorative blobs */}
          <div className="absolute top-[-40px] right-[-40px] w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-30px] left-[-30px] w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating emojis */}
          <span className="absolute top-4 left-8 text-2xl opacity-40 animate-bounce-slow select-none">🌸</span>
          <span className="absolute bottom-4 right-16 text-2xl opacity-40 animate-float-slow select-none">⭐</span>
          <span className="absolute top-6 right-32 text-xl opacity-30 animate-bounce-slow select-none">🎀</span>

          {/* Text */}
          <div className="relative z-10 text-center md:text-left">
            <span className="inline-block mb-2 px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Free Shipping on<br />
              Orders Over{" "}
              <span className="bg-white/20 px-2 py-0.5 rounded-xl">$30</span>
            </h2>
            <p className="mt-3 text-pink-100 text-sm md:text-base max-w-sm">
              Treat yourself (or a friend!) to something adorable. No minimum fuss.
            </p>
          </div>

          {/* CTA */}
          <div className="relative z-10 flex-shrink-0">
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-500 font-extrabold rounded-full shadow-lg hover:bg-pink-50 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm whitespace-nowrap"
            >
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
