"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReadingList from "../components/ReadingList";
import TravelFootprint from "../components/TravelFootprint";
import TravelFootprintEmbed from "../components/TravelFootprintEmbed";
import { Github, Linkedin, Instagram } from "lucide-react";
import HeroOrbit from "../components/HeroOrbit";
import Research from "../components/Research";

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Scroll progress bar ───────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-lime-300 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

const Section = ({
  id,
  title,
  kbd,
  children,
}: {
  id: string;
  title: string;
  kbd?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="border-b border-zinc-800/70 py-14">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
      className="flex items-baseline justify-between"
    >
      <h2 className="text-2xl tracking-tight font-semibold">{title}</h2>
      {kbd && <span className="font-mono text-xs text-zinc-400">{kbd}</span>}
    </motion.div>
    <div className="mt-6">{children}</div>
  </section>
);

// ── Card with stagger variant ─────────────────────────────────────────────────

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.article
    variants={itemVariants}
    whileHover={{ scale: 1.01, borderColor: "rgba(163, 230, 53, 0.2)" }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"
  >
    {children}
  </motion.article>
);

// ── Staggered grid container ──────────────────────────────────────────────────

const StaggerGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={containerVariants}
    className={className}
  >
    {children}
  </motion.div>
);

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-zinc-950/1 text-zinc-100">
      <ScrollProgressBar />

      {/* Orbiting logos hero */}
      <HeroOrbit
        centerTitle="Jason Wu"
        centerSubtitle="Fixed Income · Analytics · Client Strategy"
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/1"
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-800/1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-semibold tracking-tight"
          >
            Jason Wu
          </motion.div>
          <nav className="hidden gap-5 md:flex text-sm text-zinc-300">
            {["About", "Experience", "Projects", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="relative hover:text-white transition-colors group"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime-300 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex gap-4 ml-6"
          >
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
          </motion.div>
        </div>
      </motion.header>

      {/* Hero text */}
      <section className="py-16">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-semibold leading-tight"
        >
          Building clear, useful{" "}
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-lime-300"
          >
            fixed-income
          </motion.span>{" "}
          tools & stories.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 max-w-2xl text-zinc-400"
        >
          London-based account manager focused on analytics adoption, client
          training, and data-driven workflows.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6 flex gap-3"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
            href="mailto:hello@example.com"
          >
            Get in touch
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
            href="/assets/Jason_Wu_CV.pdf"
          >
            View CV
          </motion.a>
        </motion.div>
      </section>

      {/* About */}
      <Section id="about" title="About">
        <StaggerGrid className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-zinc-300">
              I help banks and asset managers get more out of their terminals —
              from curve/ASW diagnostics to workflow automation.
            </p>
          </Card>
          <Card>
            <ul className="font-mono text-sm text-zinc-400 space-y-1">
              <li>Location: London, UK</li>
              <li>Focus: Fixed Income, Equities, Python</li>
            </ul>
          </Card>
        </StaggerGrid>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <StaggerGrid className="grid gap-4">
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
        </StaggerGrid>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <StaggerGrid className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Bond Screener App",
              desc: "Custom app built for debt capital markets",
              href: "#",
            },
            {
              title: "Curve Builder App",
              desc: "Custom app built for credit analysts",
              href: "#",
            },
            {
              title: "Cloud Generator App",
              desc: "Custom app built to summarise transcripts and documents",
              href: "#",
            },
            {
              title: "Automated Equity Pitches",
              desc: "Custom app built for equity sales",
              href: "#",
            },
          ].map((p) => (
            <Card key={p.title}>
              <h4 className="font-medium">{p.title}</h4>
              <p className="mt-1 text-sm text-zinc-400">{p.desc}</p>
              <motion.a
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="mt-3 inline-block text-sm text-lime-300 hover:underline"
                href={p.href}
              >
                Learn more →
              </motion.a>
            </Card>
          ))}
        </StaggerGrid>
      </Section>

      {/* Research */}
      <Research />

      <TravelFootprintEmbed />

      {/* Travel */}
      <TravelFootprint />

      <ReadingList />

      {/* Contact */}
      <Section id="contact" title="Contact">
        <StaggerGrid className="grid">
          <Card>
            <p className="text-sm text-zinc-300">
              Email:{" "}
              <a
                className="underline underline-offset-2 hover:text-lime-300 transition-colors"
                href="mailto:jason.wu.17@ucl.ac.uk"
              >
                jason.wu.17@ucl.ac.uk
              </a>{" "}
              · LinkedIn:{" "}
              <a
                className="underline underline-offset-2 hover:text-lime-300 transition-colors"
                href="https://www.linkedin.com/in/jasonwu1508/"
                target="_blank"
                rel="noreferrer"
              >
                Profile
              </a>
            </p>
          </Card>
        </StaggerGrid>
      </Section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-10 text-xs text-zinc-500"
      >
        © {new Date().getFullYear()} Jason Wu
      </motion.footer>
    </main>
  );
}
