"use client"

import type React from "react"

import { motion } from "framer-motion"
import ReadingList from "../components/ReadingList"
import TravelFootprint from "../components/TravelFootprint"
import TravelFootprintEmbed from "../components/TravelFootprintEmbed"
import { Github, Linkedin, Instagram } from "lucide-react"
import HeroOrbit from "../components/HeroOrbit"
import Research from "../components/Research"

const Section = ({
  id,
  title,
  kbd,
  children,
}: {
  id: string
  title: string
  kbd: string
  children: React.ReactNode
}) => (
  <section id={id} className="border-b border-zinc-800/70 py-14">
    <div className="flex items-baseline justify-between">
      <h2 className="text-2xl tracking-tight font-semibold">{title}</h2>
      <span className="font-mono text-xs text-zinc-400">{kbd}</span>
    </div>
    <div className="mt-6">{children}</div>
  </section>
)

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.article
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"
  >
    {children}
  </motion.article>
)

export default function Home() {
  return (
    <main className="bg-zinc-950/1 text-zinc-100">
      {/* Orbiting logos hero */}
      <HeroOrbit centerTitle="Jason Wu" centerSubtitle="Fixed Income · Analytics · Client Strategy" />

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/1">
        <div className="flex h-16 items-center justify-between border-b border-zinc-800/1">
          <div className="font-semibold tracking-tight">Jason Wu</div>
          <nav className="hidden gap-5 md:flex text-sm text-zinc-300">
            <a href="#about" className="hover:text-white">
              About
            </a>
            <a href="#experience" className="hover:text-white">
              Experience
            </a>
            <a href="#projects" className="hover:text-white">
              Projects
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>
          <div className="flex gap-4 ml-6">
            <a
              href="https://github.com/jay087"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/jasonwu1508/"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/jasonwu087/"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white transition"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero text */}
      <section className="py-16">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold leading-tight"
        >
          Building clear, useful <span className="font-mono text-lime-300">fixed-income</span> tools & stories.
        </motion.h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          London-based account manager focused on analytics adoption, client training, and data-driven workflows.
        </p>
        <div className="mt-6 flex gap-3">
          <a
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800"
            href="mailto:hello@example.com"
          >
            Get in touch
          </a>
          <a
            className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-800"
            href="/assets/Jason_Wu_CV.pdf"
          >
            View CV
          </a>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About" kbd="[section: about]">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-zinc-300">
              I help banks and asset managers get more out of their terminals — from curve/ASW diagnostics to workflow
              automation.
            </p>
          </Card>
          <Card>
            <ul className="font-mono text-sm text-zinc-400 space-y-1">
              <li>Location: London, UK</li>
              <li>Focus: Fixed Income, Equities, Python</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" kbd="[section: experience]">
        <div className="grid gap-4">
          {[
            {
              role: "Account Manager · Bloomberg",
              meta: "London · 2024 — present",
              bullets: [
                "Drove adoption of terminal usage across Danish banks.",
                "Delivered trainings on fixed income analytics.",
                "Built BQNT apps and Excel templates for data analytics.",
              ],
            },
            {
              role: "Senior Fixed Income & Equity Specialist · Bloomberg",
              meta: "London · 2022 — 2024",
              bullets: [
                "Resolved advanced analytics queries with clear walkthroughs.",
                "Partnered with product on bonds & pricing feedback.",
              ],
            },
            {
              role: "Policy Consultant · Asian Infrastructure Investment Bank",
              meta: "London · 2020 — 2021",
              bullets: [
                "Present research findings to Erik Berglof, head economist of AIIB.",
                "Creating data visualisation charts.",
                "Policy recommendations for the Malaysian government to increase the resiliency of the country's supply chains.",
              ],
            },
            {
              role: "Part Time Assistant · Bain & Company",
              meta: "London · 2019 — 2019",
              bullets: [
                "Assisted one of China's leading smartphone brand to enter the European market for expansion.",
                "Conduct market research in London's telecommunications industry.",
                "Assessed consumer behaviour in smartphone purchasing through focus groups interviews.",
              ],
            },
          ].map((job) => (
            <Card key={job.role}>
              <header className="flex items-center justify-between">
                <h3 className="font-medium">{job.role}</h3>
                <span className="text-xs text-zinc-400">{job.meta}</span>
              </header>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300 space-y-1">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" kbd="[section: projects]">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Bond Screener App", desc: "Custom app built for debt capital markets", href: "#" },
            { title: "Curve Builder App", desc: "Custom app built for credit analysts", href: "#" },
            {
              title: "Cloud Generator App",
              desc: "Custom app built to summarise transcripts and documents",
              href: "#",
            },
            { title: "Automated Equity Pitches", desc: "Custom app built for equity sales", href: "#" },
          ].map((p) => (
            <Card key={p.title}>
              <h4 className="font-medium">{p.title}</h4>
              <p className="mt-1 text-sm text-zinc-400">{p.desc}</p>
              <a className="mt-3 inline-block text-sm text-lime-300 hover:underline" href={p.href}>
                Learn more
              </a>
            </Card>
          ))}
        </div>
      </Section>

      {/* Research */}
      <Research />

      <TravelFootprintEmbed />

      {/* Travel */}
      <TravelFootprint />

      <ReadingList />

      {/* Contact */}
      <Section id="contact" title="Contact" kbd="[section: contact]">
        <Card>
          <p className="text-sm text-zinc-300">
            Email:{" "}
            <a className="underline underline-offset-2" href="mailto:jason.wu.17@ucl.ac.uk">
              jason.wu.17@ucl.ac.uk
            </a>{" "}
            · LinkedIn:{" "}
            <a
              className="underline underline-offset-2"
              href="https://www.linkedin.com/in/jasonwu1508/"
              target="_blank"
              rel="noreferrer"
            >
              Profile
            </a>
          </p>
        </Card>
      </Section>

      <footer className="py-10 text-xs text-zinc-500">© {new Date().getFullYear()} Jason Wu</footer>
    </main>
  )
}
