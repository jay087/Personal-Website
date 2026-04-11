"use client"

import { motion } from "framer-motion"

const papers = [
  {
    title: "Supply Chain Resilience in Southeast Asia",
    venue: "AIIB Policy Paper · 2021",
    desc: "Policy recommendations to increase the resilience of Malaysia's supply chains post-pandemic.",
  },
]

export default function Research() {
  return (
    <section id="research" className="border-b border-zinc-800/70 py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-baseline justify-between"
      >
        <h2 className="text-2xl tracking-tight font-semibold">Research</h2>
      </motion.div>
      <div className="mt-6 grid gap-4">
        {papers.map((p) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"
          >
            <h3 className="font-medium">{p.title}</h3>
            <p className="mt-0.5 text-xs font-mono text-zinc-500">{p.venue}</p>
            <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
