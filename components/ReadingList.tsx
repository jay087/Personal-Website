"use client"

import { motion } from "framer-motion"
import BookCardThreeJS from "./BookCardThreeJS"

const books = [
  {
    title: "The Deficit Myth",
    author: "Stephanie Kelton",
    cover: "/assets/cover.png",
    href: "https://literal.club",
  },
]

export default function ReadingList() {
  return (
    <section className="border-b border-zinc-800/70 py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl tracking-tight font-semibold">Reading</h2>
        <p className="mt-1 text-sm text-zinc-400">What I'm currently reading.</p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
      >
        {books.map((book) => (
          <motion.div
            key={book.title}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <BookCardThreeJS
              cover={book.cover}
              title={book.title}
              author={book.author}
              href={book.href}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
