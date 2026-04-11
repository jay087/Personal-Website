"use client"

import { useEffect, useRef } from "react"

export default function ScrollBubble() {
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bubbleRef.current) return
      bubbleRef.current.style.left = `${e.clientX}px`
      bubbleRef.current.style.top = `${e.clientY}px`
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={bubbleRef}
      className="pointer-events-none fixed z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/5 blur-3xl transition-all duration-500"
    />
  )
}
