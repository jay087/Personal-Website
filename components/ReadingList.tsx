"use client"

import { useState } from "react"
import BookCard3D from "./BookCard3D"

type Book = {
  title: string
  author: string
  cover: string
  link: string
}

const books: Book[] = [
  {
    title: "Death in Venice",
    author: "Thomas Mann",
    cover: "/assets/books/death-in-venice.png",
    link: "https://literal.club/book/thomas-manndeath-in-venice-h5cfe",
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    cover: "/assets/books/animal-farm.png",
    link: "https://literal.club/book/animal-farm-exmz3",
  },
  {
    title: "1984",
    author: "George Orwell",
    cover: "/assets/books/1984.png",
    link: "https://literal.club/book/george-orwell-1984-4w1fe",
  },
  {
    title: "Persepolis",
    author: "Marjane Satrapi",
    cover: "/assets/books/persepolis.png",
    link: "https://literal.club/book/persepolis-5e8rw",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/assets/books/to-kill-a-mockingbird.png",
    link: "https://literal.club/book/to-kill-a-mockingbird-89wxl",
  },
  // ➕ Add more books here as needed
]

const academicPapers: Book[] = [
  // Academic papers will be added here
]

export default function ReadingList() {
  const [activeTab, setActiveTab] = useState<"novels" | "papers">("novels")

  return (
      <section id="reading" className="border-t border-zinc-800/70 py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">Reading List</h2>

          <div className="flex gap-6 mb-8 border-b border-zinc-800/50">
            <button
              onClick={() => setActiveTab("novels")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "novels" ? "text-zinc-100 border-b-2 border-zinc-100" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Novels
              <sup className="ml-1 text-xs text-zinc-500">{books.length}</sup>
            </button>
            <button
              onClick={() => setActiveTab("papers")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === "papers" ? "text-zinc-100 border-b-2 border-zinc-100" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Academic Papers
              <sup className="ml-1 text-xs text-zinc-500">{academicPapers.length}</sup>
            </button>
          </div>

          {activeTab === "novels" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {books.map((b) => (
                <BookCard3D key={b.title} cover={b.cover} title={b.title} author={b.author} href={b.link} />
              ))}
            </div>
          )}

          {activeTab === "papers" && (
            <div className="flex items-center justify-center py-16 text-zinc-400">
              <p>No academic papers added yet.</p>
            </div>
          )}
        </div>
      </section>
    )
  }
