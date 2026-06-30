const categories = [
  {
    id: 1,
    name: "Squishies",
    icon: "🧁",
    description: "Soft & satisfying",
    color: "from-pink-100 to-rose-100",
    accent: "bg-pink-400",
    count: "120+ items",
  },
  {
    id: 2,
    name: "Plushies",
    icon: "🐻",
    description: "Huggably cute",
    color: "from-purple-100 to-pink-100",
    accent: "bg-purple-400",
    count: "85+ items",
  },
  {
    id: 3,
    name: "Blind Box",
    icon: "🎁",
    description: "Surprise inside!",
    color: "from-yellow-100 to-pink-100",
    accent: "bg-yellow-400",
    count: "40+ series",
  },
  {
    id: 4,
    name: "Cute Accessories",
    icon: "🌸",
    description: "Kawaii everyday",
    color: "from-blue-100 to-pink-100",
    accent: "bg-sky-400",
    count: "200+ items",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-pink-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-pink-400 text-xs font-bold uppercase tracking-widest">Browse by type</span>
          <h2 className="mt-2 text-4xl font-extrabold text-gray-800">Shop Categories</h2>
          <p className="mt-3 text-gray-400 text-sm max-w-md mx-auto">Find exactly what you&apos;re looking for in our curated collections.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#"
              className={`group relative rounded-3xl bg-gradient-to-br ${cat.color} p-6 flex flex-col items-center text-center gap-4 border border-white hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer`}
            >
              {/* Background decoration */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500" />

              {/* Icon bubble */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <span className="text-3xl">{cat.icon}</span>
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3 className="font-extrabold text-gray-700 text-base group-hover:text-pink-600 transition-colors duration-200">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{cat.description}</p>
              </div>

              {/* Count pill */}
              <span className={`relative z-10 text-white text-xs font-bold px-3 py-1 rounded-full ${cat.accent} opacity-80 group-hover:opacity-100 transition-opacity duration-200`}>
                {cat.count}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
