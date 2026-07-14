"use client";

export interface PointTransaction {
  id: string;
  date: string;
  description: string;
  points: number; // positive = รับ, negative = ใช้
}

interface Props {
  points: number;
  transactions: PointTransaction[];
}

const TIERS = [
  { label: "🌸 New Member", min: 0,    max: 499,  color: "from-pink-300 to-pink-400"       },
  { label: "⭐ Regular",    min: 500,  max: 1499, color: "from-yellow-300 to-amber-400"    },
  { label: "💎 VIP",        min: 1500, max: 2999, color: "from-purple-300 to-purple-500"   },
];

function getCurrentTier(pts: number) {
  return TIERS.findLast((t) => pts >= t.min) ?? TIERS[0];
}

function getNextTier(pts: number) {
  return TIERS.find((t) => pts < t.min);
}

export default function PointsSection({ points, transactions }: Props) {
  const current = getCurrentTier(points);
  const next = getNextTier(points);
  const progressTo = next ? ((points - current.min) / (next.min - current.min)) * 100 : 100;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-700">🎁 คะแนนสะสม</h2>

      {/* Points Card */}
      <div className={`bg-gradient-to-br ${current.color} rounded-2xl p-5 text-white shadow-md`}>
        <p className="text-sm opacity-80 mb-1">คะแนนของคุณ</p>
        <p className="text-5xl font-bold">{points.toLocaleString()}</p>
        <p className="text-sm mt-1 opacity-90 font-medium">{current.label}</p>

        {next && (
          <div className="mt-4">
            <div className="flex justify-between text-xs opacity-80 mb-1">
              <span>อีก {(next.min - points).toLocaleString()} คะแนน → {next.label}</span>
              <span>{Math.round(progressTo)}%</span>
            </div>
            <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${progressTo}%` }}
              />
            </div>
          </div>
        )}

        {!next && (
          <p className="text-sm mt-3 opacity-80">🎉 คุณอยู่ในระดับสูงสุดแล้ว!</p>
        )}
      </div>

      {/* Tier Chart */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-4">
        <p className="text-sm font-semibold text-gray-600 mb-3">ระดับสมาชิก</p>
        <div className="flex flex-col gap-2">
          {TIERS.map((tier) => (
            <div
              key={tier.label}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                tier.label === current.label
                  ? "bg-pink-50 border border-pink-200 font-semibold text-pink-600"
                  : "text-gray-500"
              }`}
            >
              <span>{tier.label}</span>
              <span className="text-xs">{tier.min.toLocaleString()} – {tier.max.toLocaleString()} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-pink-50">
          <p className="text-sm font-semibold text-gray-600">ประวัติการรับ / ใช้คะแนน</p>
        </div>
        <div className="divide-y divide-pink-50">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-gray-700">{tx.description}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
              <span className={`text-sm font-bold ${tx.points > 0 ? "text-green-500" : "text-red-400"}`}>
                {tx.points > 0 ? "+" : ""}{tx.points.toLocaleString()} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
