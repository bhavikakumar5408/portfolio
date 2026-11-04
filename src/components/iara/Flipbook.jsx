import { useEffect, useRef, useState } from 'react'

export default function Flipbook({ spreads }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const drag = useRef(null)
  const ref = useRef(null)

  const go = (n) => {
    const t = Math.max(0, Math.min(spreads.length - 1, n))
    setDir(t >= i ? 1 : -1)
    setI(t)
  }

  useEffect(() => {
    const el = ref.current
    const key = (e) => {
      if (e.key === 'ArrowRight') go(i + 1)
      if (e.key === 'ArrowLeft') go(i - 1)
    }
    el.addEventListener('keydown', key)
    return () => el.removeEventListener('keydown', key)
  })

  return (
    <div
      className="fb"
      ref={ref}
      tabIndex={0}
      role="region"
      aria-label="Photo book"
      onPointerDown={(e) => (drag.current = e.clientX)}
      onPointerUp={(e) => {
        if (drag.current == null) return
        const dx = e.clientX - drag.current
        drag.current = null
        if (dx < -40) go(i + 1)
        else if (dx > 40) go(i - 1)
      }}
    >
      <div className="fb-stage">
        <div key={i} className="fb-spread" style={{ '--dir': dir }}>
          {spreads[i].map((src, k) => (
            <div className={`fb-page ${spreads[i].length === 2 ? (k === 0 ? 'l' : 'r') : ''}`} key={src}>
              <img src={src} alt="" draggable="false" />
            </div>
          ))}
        </div>
      </div>
      <div className="sr-only" aria-live="polite">{`Spread ${i + 1} of ${spreads.length}`}</div>
      <div className="fb-dots">
        {spreads.map((_, k) => (
          <button key={k} type="button" aria-label={`Go to spread ${k + 1}`} className={k === i ? 'on' : ''} onClick={() => go(k)} />
        ))}
      </div>
    </div>
  )
}
