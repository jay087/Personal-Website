"use client"

import { motion } from "framer-motion"

const places = [
  "🇬🇧 London", "🇯🇵 Tokyo", "🇺🇸 New York", "🇸🇬 Singapore",
  "🇫🇷 Paris", "🇩🇰 Copenhagen", "🇭🇰 Hong Kong", "🇲🇾 Kuala Lumpur",
]

export default function TravelFootprint() {
  return (
    <section className="border-b border-zinc-800/70 py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl tracking-tight font-semibold">Travel</h2>
        <p className="mt-1 text-sm text-zinc-400">Places I've lived or worked from.</p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        className="mt-6 flex flex-wrap gap-2"
      >
        {places.map((place) => (
          <motion.span
            key={place}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
            }}
            className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-sm text-zinc-300"
          >
            {place}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
