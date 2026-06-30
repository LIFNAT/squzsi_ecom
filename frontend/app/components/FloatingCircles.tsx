// Fixed full-page decorative layer — sits BEHIND all content (z-index: -1)
// pointer-events: none  →  never blocks clicks/text
// Very low opacity      →  subtle, never distracts

const circles = [
  // ── size / color / position / animDelay (staggered so they don't move in sync)
  { id:  1, top: "3%",  left: "5%",   w: 28, color: "rgba(255,143,177,0.18)", delay: "0s",    dur: "6s"  },
  { id:  2, top: "6%",  left: "22%",  w: 16, color: "rgba(248,187,217,0.22)", delay: "1.2s",  dur: "8s"  },
  { id:  3, top: "2%",  left: "40%",  w: 36, color: "rgba(255,220,232,0.20)", delay: "0.4s",  dur: "7s"  },
  { id:  4, top: "8%",  left: "58%",  w: 20, color: "rgba(255,143,177,0.15)", delay: "2.1s",  dur: "9s"  },
  { id:  5, top: "4%",  left: "75%",  w: 24, color: "rgba(248,187,217,0.18)", delay: "0.7s",  dur: "6.5s"},
  { id:  6, top: "7%",  left: "91%",  w: 14, color: "rgba(255,180,210,0.20)", delay: "3.0s",  dur: "8s"  },

  { id:  7, top: "15%", left: "11%",  w: 40, color: "rgba(255,220,232,0.15)", delay: "1.5s",  dur: "9s"  },
  { id:  8, top: "18%", left: "30%",  w: 18, color: "rgba(255,143,177,0.18)", delay: "0.2s",  dur: "7s"  },
  { id:  9, top: "13%", left: "49%",  w: 22, color: "rgba(248,187,217,0.20)", delay: "2.8s",  dur: "8.5s"},
  { id: 10, top: "17%", left: "67%",  w: 44, color: "rgba(255,180,210,0.13)", delay: "1.0s",  dur: "10s" },
  { id: 11, top: "14%", left: "84%",  w: 14, color: "rgba(255,143,177,0.18)", delay: "3.5s",  dur: "6s"  },

  { id: 12, top: "26%", left: "3%",   w: 18, color: "rgba(248,187,217,0.20)", delay: "0.9s",  dur: "7.5s"},
  { id: 13, top: "29%", left: "17%",  w: 30, color: "rgba(255,220,232,0.18)", delay: "2.3s",  dur: "9s"  },
  { id: 14, top: "24%", left: "37%",  w: 14, color: "rgba(255,143,177,0.15)", delay: "0.5s",  dur: "6s"  },
  { id: 15, top: "31%", left: "54%",  w: 34, color: "rgba(255,180,210,0.18)", delay: "1.7s",  dur: "8s"  },
  { id: 16, top: "25%", left: "71%",  w: 20, color: "rgba(248,187,217,0.22)", delay: "3.2s",  dur: "7s"  },
  { id: 17, top: "28%", left: "93%",  w: 24, color: "rgba(255,143,177,0.15)", delay: "0.3s",  dur: "9.5s"},

  { id: 18, top: "40%", left: "8%",   w: 48, color: "rgba(255,220,232,0.12)", delay: "1.4s",  dur: "10s" },
  { id: 19, top: "38%", left: "25%",  w: 14, color: "rgba(255,143,177,0.18)", delay: "2.6s",  dur: "6.5s"},
  { id: 20, top: "42%", left: "45%",  w: 28, color: "rgba(248,187,217,0.18)", delay: "0.8s",  dur: "8s"  },
  { id: 21, top: "37%", left: "62%",  w: 18, color: "rgba(255,180,210,0.20)", delay: "3.7s",  dur: "7s"  },
  { id: 22, top: "41%", left: "80%",  w: 38, color: "rgba(255,220,232,0.15)", delay: "1.1s",  dur: "9s"  },

  { id: 23, top: "52%", left: "2%",   w: 22, color: "rgba(255,143,177,0.18)", delay: "2.0s",  dur: "7.5s"},
  { id: 24, top: "55%", left: "15%",  w: 32, color: "rgba(248,187,217,0.18)", delay: "0.6s",  dur: "9s"  },
  { id: 25, top: "50%", left: "33%",  w: 14, color: "rgba(255,180,210,0.22)", delay: "3.4s",  dur: "6s"  },
  { id: 26, top: "54%", left: "52%",  w: 44, color: "rgba(255,220,232,0.13)", delay: "1.9s",  dur: "10s" },
  { id: 27, top: "51%", left: "70%",  w: 18, color: "rgba(255,143,177,0.18)", delay: "0.1s",  dur: "8s"  },
  { id: 28, top: "53%", left: "88%",  w: 26, color: "rgba(248,187,217,0.20)", delay: "2.5s",  dur: "7s"  },

  { id: 29, top: "64%", left: "10%",  w: 20, color: "rgba(255,180,210,0.18)", delay: "1.3s",  dur: "6.5s"},
  { id: 30, top: "67%", left: "27%",  w: 28, color: "rgba(255,220,232,0.18)", delay: "3.1s",  dur: "9s"  },
  { id: 31, top: "62%", left: "43%",  w: 14, color: "rgba(255,143,177,0.15)", delay: "0.4s",  dur: "7s"  },
  { id: 32, top: "66%", left: "60%",  w: 36, color: "rgba(248,187,217,0.18)", delay: "2.2s",  dur: "8.5s"},
  { id: 33, top: "63%", left: "77%",  w: 22, color: "rgba(255,180,210,0.20)", delay: "3.8s",  dur: "6s"  },
  { id: 34, top: "65%", left: "95%",  w: 14, color: "rgba(255,220,232,0.18)", delay: "1.6s",  dur: "8s"  },

  { id: 35, top: "76%", left: "6%",   w: 32, color: "rgba(255,143,177,0.18)", delay: "0.7s",  dur: "9s"  },
  { id: 36, top: "78%", left: "22%",  w: 18, color: "rgba(248,187,217,0.22)", delay: "2.9s",  dur: "7s"  },
  { id: 37, top: "74%", left: "39%",  w: 22, color: "rgba(255,180,210,0.18)", delay: "1.8s",  dur: "8s"  },
  { id: 38, top: "79%", left: "56%",  w: 14, color: "rgba(255,220,232,0.20)", delay: "3.3s",  dur: "6.5s"},
  { id: 39, top: "75%", left: "73%",  w: 42, color: "rgba(255,143,177,0.13)", delay: "0.5s",  dur: "10s" },
  { id: 40, top: "77%", left: "89%",  w: 18, color: "rgba(248,187,217,0.18)", delay: "2.4s",  dur: "7.5s"},

  { id: 41, top: "88%", left: "3%",   w: 26, color: "rgba(255,180,210,0.20)", delay: "1.0s",  dur: "8s"  },
  { id: 42, top: "91%", left: "18%",  w: 14, color: "rgba(255,220,232,0.18)", delay: "3.6s",  dur: "6s"  },
  { id: 43, top: "86%", left: "35%",  w: 36, color: "rgba(255,143,177,0.15)", delay: "0.2s",  dur: "9.5s"},
  { id: 44, top: "90%", left: "52%",  w: 18, color: "rgba(248,187,217,0.20)", delay: "2.7s",  dur: "7s"  },
  { id: 45, top: "87%", left: "68%",  w: 22, color: "rgba(255,180,210,0.18)", delay: "1.2s",  dur: "8.5s"},
  { id: 46, top: "92%", left: "83%",  w: 30, color: "rgba(255,220,232,0.18)", delay: "3.9s",  dur: "7s"  },
  { id: 47, top: "89%", left: "97%",  w: 14, color: "rgba(255,143,177,0.18)", delay: "0.8s",  dur: "9s"  },
];

// Alternate between 3 animation names for variety
const anims = ["float-a", "float-b", "float-c"];

export default function FloatingCircles() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {circles.map((c, i) => (
        <span
          key={c.id}
          className="absolute rounded-full"
          style={{
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.w,
            backgroundColor: c.color,
            animationName: anims[i % 3],
            animationDuration: c.dur,
            animationDelay: c.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
          }}
        />
      ))}
    </div>
  );
}
