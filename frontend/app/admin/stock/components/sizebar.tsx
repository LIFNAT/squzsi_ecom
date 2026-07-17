import Link from "next/link";

export default function Sizebar() {
    const data = [
        { title: "จัดการสต็อก", link: '/admin/stock' },
        { title: "การสั่งซื้อ", link: '/admin/Ordering' },
        { title: "บัญชี", link: '/admin/account' },
    ];

    return (
        <aside className="w-64 sticky top-16 h-screen border-r border-pink-100 bg-gradient-to-b from-pink-50 to-white">
            <div className="p-3 space-y-2">
                {data.map((e, i) => (
                    <Link
                        href={e.link}
                        key={i}
                        className="
              w-full
              text-[14px]
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-700
              font-medium
              transition-all
              duration-200
              hover:bg-pink-400
              hover:text-white
              hover:shadow-lg
              hover:shadow-pink-200
              active:scale-[0.98]
              cursor-pointer
            "
                    >

                        <span>{e.title}</span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}