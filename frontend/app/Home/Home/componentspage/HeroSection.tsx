export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-[88vh] flex items-center">
      {/* Decorative background blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/20 rounded-full blur-3xl pointer-events-none" />




      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Text */}
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-500 text-xs font-semibold tracking-wider uppercase">
            ✨ คอลเลคชั่นใหม่ 2026
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight">
            นุ่มนิ่ม, น่ารัก{" "}
            <span className="relative">
              <span className="relative z-10 text-pink-500">&amp; ฟินนน</span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-pink-200/60 rounded-full -z-0" />
            </span>
            <br />

          </h1>

          <p className="text-lg text-gray-500 max-w-md leading-relaxed">
            พบกับสกุชชี่และของเล่นสไตล์คาวาอี้สุดน่ารักที่จะช่วยเติมความสดใสให้วันของคุณ สินค้าทุกชิ้นผ่านการคัดสรรมาเป็นพิเศษเพื่อมอบความน่ารักและความสุขเต็มเปี่ยม. 🌸
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#featured"
              className="px-8 py-3.5 bg-pink-400 text-white font-bold rounded-full shadow-lg shadow-pink-200/60 hover:bg-pink-500 hover:shadow-pink-300/70 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm"
            >
              ช้อปเลย
            </a>
            <a
              href="#categories"
              className="px-8 py-3.5 bg-white text-pink-500 font-bold rounded-full border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm shadow-sm"
            >
              ดูคอลเลกชัน
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 pt-4">
            {[
              { icon: "🚚", label: "Free Shipping $30+" },
              { icon: "💖", label: "1K+ Happy Customers" },
              { icon: "🎁", label: "Gift Wrapping" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                <span className="text-base">{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="relative flex items-center justify-center">
          {/* Glow ring */}
          <div className="absolute w-[380px] h-[380px] md:w-[440px] md:h-[440px] rounded-full bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 blur-2xl opacity-60" />

          {/* Main image container */}
          <div className="relative z-10 w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/50 border-4 border-white">
            <img
              src="/mqytoljtgeYfW558jDS-o.jpg"
              alt="Kawaii squishies collection hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute bottom-6 -left-4 z-20 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-pink-100/80 border border-pink-100 flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-xs font-bold text-gray-700">Top Rated</p>
              <p className="text-xs text-gray-400">4.9 / 5 stars</p>
            </div>
          </div>

          {/* Floating tag */}
          <div className="absolute top-6 -right-4 z-20 bg-pink-400 text-white rounded-2xl px-4 py-2 shadow-lg shadow-pink-300/50 text-xs font-bold">
            New Arrivals 🌸
          </div>
        </div>
      </div>
    </section>
  );
}
