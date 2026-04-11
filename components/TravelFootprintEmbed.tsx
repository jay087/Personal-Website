"use client"

export default function TravelFootprintEmbed() {
  const visitedCountries = ["UK", "France", "Japan", "Singapore", "China"] // edit as needed
  const lastUpdated = new Date().toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  })

  return (
    <section id="travel" className="border-t border-zinc-800/70 py-16">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Travel footprint</h2>
          <span className="text-sm text-zinc-400">Places I’ve visited</span>
        </div>

        <div className="mt-6 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40">
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
            }}
          >
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1qhPUTD-gkGolOHvZkXfR_NJJBT11wqo&ehbc=2E312F"
              style={{
                position: "absolute",
                top: "-58px",
                left: 0,
                width: "100%",
                height: "calc(100% + 60px)",
                border: 0,
              }}
              loading="lazy"
              allowFullScreen
              aria-label="Travel footprint map"
            />

            {/* 🔽 Overlay box with two lines */}
            <div className="absolute bottom-3 left-3 rounded-lg bg-black/100 px-3 py-4 text-white text-sm shadow leading-snug">
              <div>📍 Currently in London, United Kingdom</div>
              <div>
                🌍 Updated {lastUpdated} · {visitedCountries.length} countries
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-zinc-400">Map updates automatically when I edit it in Google My Maps.</p>
      </div>
    </section>
  )
}
