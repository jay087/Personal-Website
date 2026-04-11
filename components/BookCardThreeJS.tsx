"use client"

import { Canvas } from "@react-three/fiber"
import { useTexture, Html } from "@react-three/drei"
import { useRef, useState, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type Props = { cover: string; title: string; author: string; href: string }

function Book3D({ cover, title, author, href, isHovered }: Props & { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(cover)

  const createRoundedBookGeometry = () => {
    const width = 2
    const height = 2.6
    const depth = 0.15
    const segments = 16

    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const indices = []
    const uvs = []

    // Create vertices for rounded left edge and angular right edge
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI
      const x = i === 0 ? -width / 2 : -width / 2 + Math.sin(angle) * (depth / 2)
      const z = Math.cos(angle) * (depth / 2)

      // Front face vertices
      vertices.push(x, height / 2, z)
      vertices.push(x, -height / 2, z)
    }

    // Add right edge vertices (angular)
    vertices.push(width / 2, height / 2, depth / 2)
    vertices.push(width / 2, -height / 2, depth / 2)
    vertices.push(width / 2, height / 2, -depth / 2)
    vertices.push(width / 2, -height / 2, -depth / 2)

    // Create faces
    for (let i = 0; i < segments; i++) {
      const a = i * 2
      const b = i * 2 + 1
      const c = (i + 1) * 2
      const d = (i + 1) * 2 + 1

      indices.push(a, b, c, b, d, c)
    }

    // Connect to right edge
    const lastLeft = segments * 2
    const rightStart = lastLeft + 2
    indices.push(lastLeft, lastLeft + 1, rightStart, lastLeft + 1, rightStart + 1, rightStart)

    // Add UV coordinates
    for (let i = 0; i <= segments; i++) {
      uvs.push(i / segments, 1, i / segments, 0)
    }
    uvs.push(1, 1, 1, 0, 1, 1, 1, 0)

    geometry.setIndex(indices)
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2))
    geometry.computeVertexNormals()

    return geometry
  }

  const frontMaterial = new THREE.MeshStandardMaterial({ map: texture })
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: "white" })

  const materials = [
    whiteMaterial, // right
    whiteMaterial, // left
    whiteMaterial, // top
    whiteMaterial, // bottom
    frontMaterial, // front (cover)
    whiteMaterial, // back
  ]

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()

      if (isHovered) {
        // On hover: tilt up and rotate to show cover
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          -Math.PI / 4,
          0.08
        )
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          Math.PI / 6,
          0.08
        )
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          0.18,
          0.08
        )
      } else {
        // Idle: gentle float + slow pendulum sway
        const idleY = Math.sin(t * 0.7) * 0.07
        const idleRotX = Math.sin(t * 0.4) * 0.035
        const idleRotY = Math.sin(t * 0.5) * 0.12

        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          idleRotX,
          0.035
        )
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          idleRotY,
          0.035
        )
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          idleY,
          0.035
        )
      }
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]} material={materials}>
        <primitive object={createRoundedBookGeometry()} />
      </mesh>

      {/* Hover text elements */}
      {isHovered && (
        <>
          <Html position={[0, 2, 0]} center>
            <div className="text-center pointer-events-none">
              <h3 className="text-white text-sm font-semibold mb-1">{title}</h3>
              <p className="text-xs text-zinc-300">{author}</p>
            </div>
          </Html>

          <Html position={[0, -2, 0]} center>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-lime-300 hover:text-lime-200 transition-colors"
            >
              View on Literal →
            </a>
          </Html>
        </>
      )}
    </group>
  )
}

function BookFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-16 h-20 bg-zinc-700 rounded animate-pulse"></div>
    </div>
  )
}

export default function BookCardThreeJS({ cover, title, author, href }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm overflow-hidden cursor-pointer transition-colors duration-300 hover:border-zinc-600"
      style={{ aspectRatio: "3 / 4", height: "300px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Suspense fallback={<BookFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, alpha: true }}
          onCreated={() => console.log("[v0] Canvas created successfully")}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, 5]} intensity={0.4} />

          <Book3D cover={cover} title={title} author={author} href={href} isHovered={isHovered} />
        </Canvas>
      </Suspense>
    </div>
  )
}
