import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

export default function Icon() {
  const bg = "#E02826"
  const fg = "#FFFFFF"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="380" height="380" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="380" height="380" fill="none" />
          <g fill={fg}>
            <path d="M75 100h40v60h38v-60h40v160h-40v-60h-38v60H75z" />
            <path d="M205 100h74c28 0 46 16 46 41 0 19-10 31-26 36v1c12 3 19 14 23 29l11 53h-44l-9-44c-3-15-10-22-24-22h-11v66h-40V100zm68 67c12 0 19-6 19-16s-7-15-19-15h-28v31h28z" />
            <path d="M190 300l-60 45h-40l100-75 100 75h-40l-60-45z" />
            <path d="M190 265l-50 37h-36l86-63 86 63h-36l-50-37z" />
            <path d="M190 230l-40 30h-32l72-54 72 54h-32l-40-30z" />
          </g>
        </svg>
      </div>
    ),
    size
  )
}


