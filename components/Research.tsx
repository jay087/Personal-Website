"use client"

import { motion } from "framer-motion"
import { BookOpen, ExternalLink, FileText, Copy } from "lucide-react"
import * as React from "react"

const doi = "10.1080/23276665.2024.2398212"
const tfUrl = "https://www.tandfonline.com/doi/full/10.1080/23276665.2024.2398212#abstract"
const doiUrl = "https://doi.org/10.1080/23276665.2024.2398212"

const keywords = ["Privacy Concerns", "Facial Recognition", "Digital Surveillance", "Government Trust", "Company Trust"]

const thumbnail = "/assets/asia_pacific.png"

const bibtex = `@article{wu2024,
  title   = {Fear of nothing to hide? How do Chinese people feel about privacy when facing facial recognition cameras?},
  author  = {Wu, Jason and Fan, Ziteng},
  journal = {Asia Pacific Journal of Public Administration},
  year    = {2024},
  volume  = {46},
  number  = {<no>},
  pages   = {<pp-pp>},
  doi     = {${doi}}
}`

export default function Research() {
  const [copied, setCopied] = React.useState(false)

  const copyBib = async () => {
    try {
      await navigator.clipboard.writeText(bibtex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <section id="research" className="border-t border-zinc-800/70 py-16">
      <div className="max-w-5xl mx-auto px-5">
        {/* header */}
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Academic research</h2>
          <span className="font-mono text-xs text-zinc-400">[section: research]</span>
        </div>

        {/* card */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40"
        >
          {/* CHANGED: grid -> flex so thumbnail stays on the left */}
          <div className="flex items-start gap-5 md:gap-6 p-5 md:p-6">
            {/* thumbnail / badge column */}
            <div className="relative shrink-0">
              <div className="w-36 md:w-44 aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40">
                <img
                  src={thumbnail || "/placeholder.svg"}
                  alt="Paper thumbnail"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* small badge */}
              <div className="absolute -left-2 -top-2 rounded-full bg-zinc-950/80 backdrop-blur px-3 py-1 text-xs border border-zinc-800">
                <span className="inline-flex items-center gap-1 text-zinc-300">
                  <BookOpen size={14} /> 2024 · Peer-reviewed
                </span>
              </div>
            </div>

            {/* text column */}
            <div className="min-w-0 flex-1">
              {/* venue + doi */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span className="rounded-full border border-zinc-700/70 bg-zinc-900/60 px-2 py-0.5">
                  Journal article
                </span>
                <a
                  href={doiUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-zinc-700/70 bg-zinc-900/60 px-2 py-0.5 hover:bg-zinc-800 transition"
                >
                  DOI: {doi}
                </a>
              </div>

              {/* title */}
              <h3 className="mt-3 text-xl md:text-2xl font-semibold leading-snug text-white">
                Fear of nothing to hide? How do Chinese people feel about privacy when facing facial recognition
                cameras?
              </h3>

              {/* authors + venue line */}
              <p className="mt-1 text-sm text-zinc-400">
                Fan & Wu 2024 · <span className="italic">Asia Pacific Journal of Public Administration</span>
              </p>

              {/* abstract teaser */}
              <p className="mt-4 text-sm text-zinc-300">
                This study explores how citizens respond to government-sponsored facial-recognition cameras in terms of
                privacy concerns in China, which is a country with a well-established digital system.
              </p>

              {/* keywords (pills) */}
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-semibold text-zinc-300">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full border border-zinc-700/70 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* actions */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={tfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm hover:bg-zinc-800 transition"
                >
                  <ExternalLink size={16} />
                  View on Taylor & Francis
                </a>
                <a
                  href={doiUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-800 transition"
                >
                  <FileText size={16} />
                  Open DOI
                </a>
                <button
                  onClick={copyBib}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-800 transition"
                >
                  <Copy size={16} />
                  {copied ? "BibTeX copied!" : "Copy BibTeX"}
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
