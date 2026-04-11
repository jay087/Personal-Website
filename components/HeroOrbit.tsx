"use client"

import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import * as React from "react"

type Item = { src: string; alt: string }

function LogoAtAngle({
  angle,
  radius,
  children,
}: {
  angle: number // degrees
  radius: number // px
  children: React.ReactNode
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`,
      }}
    >
      {children}
    </div>
  )
}

export default function HeroOrbit({
  centerTitle = "Jason Wu",
  centerSubtitle = "Fixed Income · Quant Analytics · Account Manager",
  extraLines = [],

  // Logos
  outer = [
    { src: "/assets/logos/lse.png", alt: "LSE" },
    { src: "/assets/logos/bloomberg.png", alt: "Bloomberg" },
  ] as Item[],
  inner = [
    { src: "/assets/logos/fudan.png", alt: "Fudan" },
    { src: "/assets/logos/ucl.png", alt: "UCL" },
  ] as Item[],

  // Controls
  outerRadius = 260,
  innerRadius = 160,
  outerSize = 40,
  innerSize = 34,
  speedOuter = 28, // seconds per full turn (bigger = slower)
  speedInner = 36,
  pauseOnHover = true,
}: {
  centerTitle?: string
  centerSubtitle?: string
  extraLines?: string[]

  outer?: Item[]
  inner?: Item[]

  outerRadius?: number
  innerRadius?: number
  outerSize?: number
  innerSize?: number
  speedOuter?: number
  speedInner?: number
  pauseOnHover?: boolean
}) {
  const prefersReduced = useReducedMotion()
  const [paused, setPaused] = React.useState(false)

  const names = ["Jason Wu", "吴修泽"]
  const [nameIndex, setNameIndex] = React.useState(0)

  React.useEffect(() => {
    if (prefersReduced) return
    const id = setInterval(() => setNameIndex((n) => (n + 1) % names.length), 2200)
    return () => clearInterval(id)
  }, [prefersReduced, names.length])

  // Continuous rotation (respects prefers-reduced-motion + hover pause)
  const spin =
    prefersReduced || (pauseOnHover && paused)
      ? { rotate: 0 }
      : { rotate: 360, transition: { repeat: Number.POSITIVE_INFINITY, duration: speedOuter, ease: "linear" } }

  const spinReverse =
    prefersReduced || (pauseOnHover && paused)
      ? { rotate: 0 }
      : { rotate: -360, transition: { repeat: Number.POSITIVE_INFINITY, duration: speedInner, ease: "linear" } }

  // Evenly space items around the circle
  const outerAngles = outer.map((_, i) => (i * 360) / outer.length)
  const innerAngles = inner.map((_, i) => (i * 360) / inner.length)

  return (
    <section className="relative mx-auto my-10 flex w-full max-w-4xl items-center justify-center">
      {/* Stage */}
      <div
        className="relative aspect-square w-full max-w-[680px]"
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
      >
        {/* Outer ring */}
        <motion.div className="pointer-events-none absolute inset-0" animate={spin} aria-hidden>
          {outer.map((it, i) => (
            <LogoAtAngle key={`outer-${i}-${it.alt}`} angle={outerAngles[i]} radius={outerRadius}>
              <motion.div
                animate={prefersReduced ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.12 }}
                className="flex items-center justify-center"
                style={{ width: outerSize, height: outerSize }}
              >
                {/* You can swap <Image> for <img> if you prefer */}
                <Image
                  src={it.src || "/placeholder.svg"}
                  alt={it.alt}
                  width={outerSize}
                  height={outerSize}
                  className="max-w-full max-h-full object-contain opacity-90 drop-shadow-sm"
                  priority
                />
              </motion.div>
            </LogoAtAngle>
          ))}
        </motion.div>

        {/* Inner ring (counter-rotates) */}
        <motion.div className="pointer-events-none absolute inset-0" animate={spinReverse} aria-hidden>
          {inner.map((it, i) => (
            <LogoAtAngle key={`inner-${i}-${it.alt}`} angle={innerAngles[i]} radius={innerRadius}>
              <motion.div
                animate={prefersReduced ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.1 }}
                className="flex items-center justify-center"
                style={{ width: innerSize, height: innerSize }}
              >
                <Image
                  src={it.src || "/placeholder.svg"}
                  alt={it.alt}
                  width={innerSize}
                  height={innerSize}
                  className="max-w-full max-h-full object-contain opacity-90 drop-shadow-sm"
                  priority
                />
              </motion.div>
            </LogoAtAngle>
          ))}
        </motion.div>

        {/* Center card with name fade effect */}
        <div className="absolute left-1/2 top-1/2 w-[72%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center backdrop-blur">
          <AnimatePresence mode="wait">
            <motion.h1
              key={nameIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-white text-6xl md:text-7xl font-semibold tracking-tight"
            >
              {names[nameIndex]}
            </motion.h1>
          </AnimatePresence>

          <p className="mt-3 text-sm md:text-base text-zinc-400">{centerSubtitle}</p>
          {/* Optional extra lines under the subtitle */}
          {extraLines.map((line) => (
            <p key={line} className="mt-1 text-xs md:text-sm text-zinc-500">
              {line}
            </p>
          ))}

          <div className="mt-5 flex justify-center gap-3 text-sm">
            <a
              href="mailto:hello@example.com"
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 hover:bg-zinc-800"
            >
              Get in touch
            </a>
            <a href="/assets/Jason_Wu_CV.pdf" className="rounded-xl border border-zinc-700 px-4 py-2 hover:bg-zinc-800">
              View CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
