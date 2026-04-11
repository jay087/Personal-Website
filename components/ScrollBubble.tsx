"use client"

import * as React from "react"

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function ScrollBubble() {
  const hostRef = React.useRef<HTMLDivElement>(null)
  const dotRef = React.useRef<HTMLDivElement>(null)

  const mouse = React.useRef({ x: 0.5, y: 0.35 })
  const vel = React.useRef(0)
  const t = React.useRef(0)
  const pos = React.useRef({ x: 0.5, y: 0.35 })
  const aim = React.useRef({ x: 0.5, y: 0.35 })

  const trail = React.useRef({ x: 0, y: 0 }) // accumulated offset in both directions
  const lastY = React.useRef(0) // Initialize lastY to 0 to prevent SSR window error
  const scrollDirection = React.useRef(0) // -1 for up, 1 for down, 0 for idle

  const KICK = 1.2 // how much scroll delta pushes the bubble (increased from 0.35)
  const DECAY = 0.88 // how quickly trail settles (slightly slower decay)
  const LAG = 0.035 // how quickly bubble moves toward targets (slightly faster)
  const DIAGONAL_FACTOR = 0.8 // how much horizontal movement from vertical scroll

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      lastY.current = window.scrollY
    }
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return

    let lastT = performance.now()
    const onScroll = () => {
      const now = performance.now()
      const y = window.scrollY
      const dy = y - lastY.current
      const dt = Math.max(1, now - lastT)

      scrollDirection.current = dy > 0 ? 1 : dy < 0 ? -1 : 0

      trail.current.y += dy * KICK

      // Calculate horizontal position based on total scroll position for traversal effect
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = y / maxScroll // 0 to 1 based on scroll position
      const traversalX = (Math.sin(scrollProgress * Math.PI * 2) * 0.4 + 0.5) * window.innerWidth // sine wave traversal
      trail.current.x = lerp(trail.current.x, traversalX - pos.current.x * window.innerWidth, 0.1)

      // keep a speed estimate for pulsing
      const v = Math.abs(dy) / dt
      vel.current = lerp(vel.current, v, 0.35)

      lastY.current = y
      lastT = now
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    let raf: number
    const loop = () => {
      const host = hostRef.current
      const dot = dotRef.current
      if (host && dot) {
        const w = host.clientWidth
        const h = host.clientHeight

        // time
        t.current += 0.0025

        if (Math.floor(t.current * 2000) % 800 === 0) {
          aim.current.x = clamp(Math.random() * 0.8 + 0.1, 0.05, 0.95)
          aim.current.y = clamp(Math.random() * 0.7 + 0.15, 0.05, 0.9)
        }

        const driftX = Math.sin(t.current) * 0.04 + Math.cos(t.current * 0.7) * 0.02
        const driftY = Math.sin(t.current * 0.8 + 1.2) * 0.03 + Math.cos(t.current * 1.1) * 0.015
        const px = (mouse.current.x - 0.5) * 0.06
        const py = (mouse.current.y - 0.5) * 0.05

        // move towards target with smoothing (LAG)
        const targetX = aim.current.x + driftX + px
        const targetY = aim.current.y + driftY + py
        pos.current.x = lerp(pos.current.x, targetX, LAG)
        pos.current.y = lerp(pos.current.y, targetY, LAG)

        trail.current.x *= DECAY
        trail.current.y *= DECAY

        const x = pos.current.x * w + trail.current.x
        const y = pos.current.y * h + trail.current.y

        const v = Math.min(0.12, vel.current)
        const k = v / 0.12
        const scale = lerp(1, 1.4, k)
        const opacity = lerp(0.12, 0.35, k)
        const blurPx = lerp(44, 80, k)

        dot.style.opacity = String(opacity)
        dot.style.filter = `blur(${blurPx}px)`
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={hostRef} aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div
        ref={dotRef}
        className="absolute rounded-full"
        style={{
          width: "64vmin",
          height: "64vmin",
          left: "50%",
          top: "35%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(closest-side, rgba(180,255,200,0.55), rgba(120,200,255,0.25) 60%, rgba(255,255,255,0) 72%)",
          mixBlendMode: "screen",
          opacity: 0.12,
          filter: "blur(44px)",
          transition: "opacity 120ms ease",
        }}
      />
    </div>
  )
}
