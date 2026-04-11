"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import { useRef, useState } from "react"

type Props = { cover: string; title: string; author: string; href: string }

/* ------------ 3D BOOK ONLY (no Html here) ------------ */
function Book3D({ cover, isHovered }: { cover: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(cover)

  // Cover on front; other faces white
  const frontMaterial = new THREE.MeshStandardMaterial({ map: texture })
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: "white" })
  const materials = [
    whiteMaterial, // +X
    whiteMaterial, // -X
    whiteMaterial, // +Y
    whiteMaterial, // -Y
    frontMaterial, // +Z (front cover)
    whiteMaterial, // -Z (back)
  ]

  // Your rounded-left-edge geometry
  const createBookGeometry = () => {
    const geometry = new THREE.BoxGeometry(2, 2.6, 0.3, 8, 1, 1)
    const positions = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      if (x < -0.9) {
        const normalizedY = y / 1.3
        const curve = Math.sqrt(1 - normalizedY * normalizedY) * 0.1
        positions[i] = x + curve
      }
    }
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
    return geometry
  }

  // Animate rotation/scale based on parent hover
  useFrame((_, dt) => {
    if (!meshRef.current) return

    // keep your exact XYZ targets
    const targetX = isHovered ? -Math.PI / 2.3 : 0
    const targetY = isHovered ?  Math.PI / 80  : 0
    const targetZ = isHovered ? -Math.PI / 4   : 0

    // subtle size change to feel like a zoom-out (without touching camera)
    const targetScale = isHovered ? 0.92 : 1.0

    const lerp = (a: number, b: number, k = 10) => a + (b - a) * Math.min(1, k * dt)

    meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, targetX)
    meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, targetY)
    meshRef.current.rotation.z = lerp(meshRef.current.rotation.z, targetZ)

    const s = lerp(meshRef.current.scale.x, targetScale)
    meshRef.current.scale.setScalar(s)
  })

  return <mesh ref={meshRef} geometry={createBookGeometry()} material={materials} />
}

/* ------------ CARD: hover + overlay UI ------------ */
export default function BookCardThreeJS({ cover, title, author, href }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm overflow-hidden"
      style={{ aspectRatio: "3 / 4", height: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Canvas layer */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, 5]} intensity={0.4} />
        <Book3D cover={cover} isHovered={isHovered} />
      </Canvas>

      {/* Overlay UI (DOM) — always mounted; fades in on hover */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between p-3
                    transition-opacity duration-200
                    ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        {/* Title/author at top */}
        <div className="pointer-events-none w-full text-center">
          <h3 className="text-white font-semibold text-sm mx-auto max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h3>
          <p className="mt-1 text-xs text-zinc-300 whitespace-nowrap">{author}</p>
        </div>

        {/* Link at bottom — clickable (re-enable pointer events here) */}
        <div className="pointer-events-auto">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg border border-zinc-700/60 bg-zinc-900/70 px-3 py-1.5 text-xs
                       text-lime-300 hover:text-lime-200 hover:bg-zinc-900 transition-colors whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            View on Literal →
          </a>
        </div>
      </div>
    </div>
  )
}
