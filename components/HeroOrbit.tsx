"use client"

import { motion } from "framer-motion"

const ORBIT_ITEMS = [
  { label: "Bloomberg", angle: 0 },
  { label: "Python", angle: 60 },
  { label: "Fixed Income", angle: 120 },
  { label: "Excel", angle: 180 },
  { label: "Analytics", angle: 240 },
  { label: "BQNT", angle: 300 },
]

export default function HeroOrbit({
  centerTitle,
  centerSubtitle,
}: {
  centerTitle: string
  centerSubtitle: string
}) {
  return (
    <div className="relative flex items-center justify-center h-[420px] overflow-hidden">
      {/* Orbit ring */}
      <div className="absolute h-[320px] w-[320px] rounded-full border border-zinc-800/60" />

      {/* Orbiting labels */}
      {ORBIT_ITEMS.map((item, i) => {
        const rad = (item.angle * Math.PI) / 180
        const x = Math.cos(rad) * 160
        const y = Math.sin(rad) * 160

        return (
          <motion.div
            key={item.label}
            className="absolute font-mono text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%, -50%)" }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {item.label}
          </motion.div>
        )
      })}

      {/* Center */}
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-semibold tracking-tight"
        >
          {centerTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-1 text-sm text-zinc-400 font-mono"
        >
          {centerSubtitle}
        </motion.p>
      </div>
    </div>
  )
}
