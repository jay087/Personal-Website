"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Fallback names
const VISITED_NAMES = new Set([
  "United Kingdom",
  "Ireland",
  "Gibraltar",
  "France",
  "Germany",
  "Austria",
  "Austria",
  "Switzerland",
  "Monaco",
  "Netherlands",
  "Albania",
  "Italy",
  "Greece",
  "Spain",
  "Vatican City",
  "Denmark",
  "Norway",
  "Sweden",
  "Iceland",
  "Qatar",
  "Japan",
  "Singapore",
  "China",
  "Hong Kong",
  "Taiwan",
  "Macau",
  "Malaysia",
  "India",
  "Turkey",
  "Indonesia",
  "Philippines",
])

const color = scaleLinear<string>().domain([0, 1]).range(["#111827", "#84cc16"]) // zinc-900 -> lime-400

export default function TravelFootprint() {
  const visitedCountries = Array.from(new Set([...Array.from(VISITED_NAMES)]))
  const lastUpdated = new Date().toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  })

  return (
    <section id="travel-simple" className="border-t border-zinc-800/70 py-16">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Travel Footprint </h2>
          <span className="text-sm text-zinc-400">Places I've visited</span>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
          {/* relative container for overlay */}
          <div className="relative w-full">
            {/* keep map responsive, no forced height */}
            <ComposableMap projectionConfig={{ scale: 160 }} style={{ width: "100%", height: "auto" }}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const props = geo.properties as any
                    const iso3 = props?.ISO_A3 ?? props?.iso_a3 ?? props?.A3
                    const name = props?.NAME ?? props?.name

                    const isVisited = name && VISITED_NAMES.has(name)

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            outline: "none",
                            fill: isVisited ? color(1) : "#18181b",
                            stroke: "#27272a",
                            strokeWidth: 0.5,
                          },
                          hover: {
                            outline: "none",
                            fill: isVisited ? "#a3e635" : "#27272a",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    )
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* Overlay text box */}
            <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-4 text-white text-sm shadow leading-snug">
              <div>📍 Currently in London, United Kingdom</div>
              <div>
                🌍 Updated {lastUpdated} · {visitedCountries.length} countries
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-zinc-400">Highlighted countries are places I’ve visited.</p>
        </div>
      </div>
    </section>
  )
}
