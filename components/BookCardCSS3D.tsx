"use client"

import { motion } from "motion/react"
import Image from "next/image"

type Props = { cover: string; title: string; author: string; href: string }

export default function BookCardCSS3D({ cover, title, author, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative block rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm overflow-hidden"
      style={{ aspectRatio: "3 / 4", perspective: "1200px" }} // perspective defines 3D depth
    >
      {/* 3D book */}
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={{ rotateX: 0 }}
        whileHover={{ rotateX: -75 }} // ⬅️ flips book forward to horizontal
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Cover */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden">
          <Image src={cover} alt={title} fill className="object-cover" />
        </div>

        {/* Fake book thickness (spine edge) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-zinc-800"
          style={{
            transform: "rotateX(90deg) translateZ(1px)",
            transformOrigin: "bottom",
          }}
        />
      </motion.div>

      {/* Overlay text (appears only on hover, above the flat book) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-950/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <div className="px-4 text-center">
          <h3 className="text-white text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-xs text-zinc-300">{author}</p>
          <p className="mt-4 text-xs text-lime-300">View on Literal →</p>
        </div>
      </div>
    </a>
  )
}
