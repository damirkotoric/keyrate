"use client"

import { Globe } from "@/components/ui/globe"

export function GlobeSection() {
  return (
    <div className="relative flex size-full max-h-[400px] mx-auto aspect-square items-center justify-center overflow-hidden border-b border-border">
      <Globe
        className="top-0"
        config={{
          width: 1600,
          height: 1600,
          onRender: () => {},
          devicePixelRatio: 2,
          phi: 0,
          theta: 0.3,
          dark: 0,
          diffuse: 0.4,
          mapSamples: 16000,
          mapBrightness: 1.2,
          baseColor: [0.9, 0.9, 0.9],
          markerColor: [224 / 255, 40 / 255, 38 / 255],
          glowColor: [0.9, 0.9, 0.9],
          markers: [
            { location: [45.4215, -75.6972], size: 0.08 }, // Ottawa
            { location: [43.6532, -79.3832], size: 0.08 }, // Toronto
            { location: [25.7617, -80.1918], size: 0.08 }, // Miami, Florida
            { location: [25.2048, 55.2708], size: 0.08 },  // Dubai, UAE
          ],
        }}
      />
    </div>
  )
}

