import { useEffect, useRef, useState } from 'react'
import { tick } from '../../lib/sound.js'

// An original little roller-skater who rolls along the footer divider.
// Scroll speed makes it roll faster; clicking makes it do a trick.
export default function Skater() {
  const wrap = useRef(null)
  const [trick, setTrick] = useState(false)
  const st = useRef({ x: 40, dir: 1 })

  useEffect(() => {
    const el = wrap.current
    const parent = el.parentElement
    let last = scrollY, vel = 0, raf
    const loop = () => {
      const dy = scrollY - last
      last = scrollY
      vel += (Math.abs(dy) - vel) * 0.12
      const max = parent.clientWidth - 40
      const s = st.current
      s.x += s.dir * (0.45 + vel * 0.35)
      if (s.x > max) { s.x = max; s.dir = -1 }
      if (s.x < 0) { s.x = 0; s.dir = 1 }
      el.style.transform = `translateX(${s.x}px)`
      el.style.setProperty('--spin', `${Math.max(0.12, 0.8 - vel * 0.05)}s`)
      el.classList.toggle('left', s.dir < 0)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const doTrick = () => {
    if (trick) return
    setTrick(true)
    tick(440, 0.04, 0.12)
    setTimeout(() => tick(880, 0.04, 0.1), 380)
    setTimeout(() => setTrick(false), 800)
  }

  return (
    <div className="skater" ref={wrap}>
      <button className={`skater-btn${trick ? ' trick' : ''}`} onClick={doTrick} aria-label="Make the skater do a trick">
        <svg width="40" height="46" viewBox="0 0 40 46" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="20" cy="8" r="5" fill="var(--bg)" />
          <path d="M20 13 L19 25" />
          <path d="M19 17 L10 20 M19 17 L28 14" />
          <path d="M19 25 L12 33 L14 38 M19 25 L27 31 L30 38" />
          <path d="M16 6 q4 -6 9 -1" stroke="var(--accent)" />
          <path d="M18 14 l2 10 l-6 1 z" fill="var(--accent)" stroke="var(--accent)" />
          <g className="wheels" stroke="none" fill="currentColor">
            <circle cx="10" cy="42" r="2.6" />
            <circle cx="17" cy="42" r="2.6" />
            <circle cx="27" cy="42" r="2.6" />
            <circle cx="34" cy="42" r="2.6" />
          </g>
          <path d="M8 39 H19 M25 39 H36" />
        </svg>
      </button>
    </div>
  )
}
