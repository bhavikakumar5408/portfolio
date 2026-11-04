import { useState } from 'react'

const ROT = [-3, 0, 6, -5, 4, -2, 5, -4]

export default function PhoneStack({ images }) {
  const n = images.length
  const [top, setTop] = useState(0)
  return (
    <div className="ps" onClick={() => setTop((t) => (t + 1) % n)} role="button" aria-label="Next screenshot">
      {images.map((src, i) => {
        const d = (i - top + n) % n // 0 = front
        return (
          <div
            key={src}
            className="ps-card"
            style={{
              zIndex: n - d,
              opacity: d > 3 ? 0 : 1,
              transform: `translate(-50%, -50%) translateY(${Math.min(d, 3) * -6}px) rotate(${ROT[i % ROT.length]}deg) scale(${1 - Math.min(d, 3) * 0.015})`,
            }}
          >
            <img src={src} alt="" draggable="false" />
          </div>
        )
      })}
    </div>
  )
}
