import { useEffect, useRef, useState } from 'react'
import { PageFlip } from 'page-flip'

const W = 260
const H = 343
// pages → spreads: cover | (blank,p2) | (p3,p4) | (p5,p6) | (p7,blank) | back cover
const SPREAD_START = [0, 1, 3, 5, 7, 9]
const pageToSpread = (p) => (p <= 0 ? 0 : p >= 9 ? 5 : Math.ceil(p / 2))

function paper() {
  const c = document.createElement('canvas')
  c.width = W * 2
  c.height = H * 2
  const g = c.getContext('2d')
  g.fillStyle = '#f3efe6'
  g.fillRect(0, 0, c.width, c.height)
  return c.toDataURL('image/png')
}

// Real page-curl flipbook (StPageFlip). `spreads` is the original 6-spread content.
export default function Flipbook({ spreads }) {
  const host = useRef(null)
  const book = useRef(null)
  const [spread, setSpread] = useState(0)

  useEffect(() => {
    const blank = paper()
    const flat = spreads.flat()
    // [cover, blank, p2, p3, p4, p5, p6, p7, blank, back]
    const pages = [flat[0], blank, flat[1], flat[2], flat[3], flat[4], flat[5], flat[6], blank, flat[7]]
    // StPageFlip removes its host's PARENT on destroy, so give it a fresh one every mount.
    const wrap = document.createElement('div')
    wrap.className = 'fb-wrap'
    const el = document.createElement('div')
    el.className = 'fb-host'
    wrap.appendChild(el)
    host.current.appendChild(wrap)
    const pf = new PageFlip(el, {
      width: W,
      height: H,
      size: 'fixed',
      showCover: true,
      drawShadow: true,
      maxShadowOpacity: 0.55,
      flippingTime: 900,
      usePortrait: false,
      startPage: 0,
      mobileScrollSupport: false,
      swipeDistance: 30,
      clickEventForward: false,
    })
    pf.loadFromImages(pages)
    // the library paints a solid white backdrop each frame; make it transparent so the page background shows
    const render = pf.getRender()
    render.clear = function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    render.drawFrame()
    pf.on('init', () => render.drawFrame())
    pf.on('flip', (e) => setSpread(pageToSpread(e.data)))
    book.current = pf
    return () => {
      try { pf.destroy() } catch {}
      wrap.remove()
      book.current = null
    }
  }, [spreads])

  const onKey = (e) => {
    if (e.key === 'ArrowRight') book.current?.flipNext('top')
    if (e.key === 'ArrowLeft') book.current?.flipPrev('top')
  }
  const goto = (s) => book.current?.flip(SPREAD_START[s], 'top')

  return (
    <div className="fb" tabIndex={0} role="region" aria-label="Photo book" onKeyDown={onKey}>
      <div className={`fb-stage s${spread}`}>
        <div ref={host} />
      </div>
      <div className="sr-only" aria-live="polite">{`Spread ${spread + 1} of 6`}</div>
      <div className="fb-dots">
        {SPREAD_START.map((_, k) => (
          <button key={k} type="button" aria-label={`Go to spread ${k + 1}`} className={k === spread ? 'on' : ''} onClick={() => goto(k)} />
        ))}
      </div>
    </div>
  )
}
