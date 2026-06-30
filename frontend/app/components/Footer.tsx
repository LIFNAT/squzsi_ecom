export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🧸</span>
              <span className="text-xl font-bold text-pink-500 tracking-tight group-hover:text-pink-400 transition-colors duration-200">
                SquishyLand
              </span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Your ultimate destination for kawaii squishies, plushies, and cute accessories. Spread joy, one squishy at a time. 🌸
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-2">
              {[
                { label: "Instagram", icon: "📸" },
                { label: "TikTok", icon: "🎵" },
                { label: "Pinterest", icon: "📌" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-sm hover:bg-pink-100 hover:scale-110 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-700 mb-5 uppercase tracking-widest">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {["Home", "Shop All", "New Arrivals", "Best Sellers", "Sale"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-pink-500 transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-700 mb-5 uppercase tracking-widest">Categories</h4>
            <ul className="flex flex-col gap-3">
              {["Squishies", "Plushies", "Blind Boxes", "Cute Accessories", "Gift Sets"].map((cat) => (
                <li key={cat}>
                  <a href="#" className="text-sm text-gray-400 hover:text-pink-500 transition-colors duration-200">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-700 mb-5 uppercase tracking-widest">Contact Us</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span>📧</span>
                <span>hello@squishyland.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span>📱</span>
                <span>+1 (800) KAWAII-1</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span>🕐</span>
                <span>Mon–Fri, 9am–6pm (EST)</span>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="mt-6">
              <p className="text-xs font-bold text-gray-600 mb-2">Subscribe for cute updates 🌸</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 rounded-full border border-pink-200 text-xs text-gray-600 placeholder-gray-300 focus:outline-none focus:border-pink-400 transition-colors duration-200 bg-pink-50/50"
                />
                <button className="px-3 py-2 bg-pink-400 text-white rounded-full text-xs font-bold hover:bg-pink-500 transition-colors duration-200 active:scale-95">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-pink-50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-300">
            © 2025 <span className="font-semibold text-pink-400">SquishyLand</span>. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Refunds"].map((link) => (
              <a key={link} href="#" className="text-xs text-gray-300 hover:text-pink-400 transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
