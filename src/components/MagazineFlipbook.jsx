import { useCallback, useEffect, useRef, useState } from 'react'
import { PageFlip } from 'page-flip'
import { pageFlipSound } from '../lib/sound.js'

const BREAK = 680 // below this container width show one page at a time

// Realistic page-curl flipbook of the whole magazine (StPageFlip).
// Flip sound is opt-in via a local toggle (off by default).
export default function MagazineFlipbook({ pages, label = 'Magazine', pageW = 800, pageH = 1036 }) {
  const PAGE_W = pageW
  const PAGE_H = pageH
  const wrapRef = useRef(null)
  const hostRef = useRef(null)
  const book = useRef(null)
  const sound = useRef(false)
  const [soundOn, setSoundOn] = useState(false)
  const [page, setPage] = useState(0)
  const [single, setSingle] = useState(false)
  const [active, setActive] = useState(false)
  const [turned, setTurned] = useState(false)
  const total = pages.length

  // only load the 64 images once the book is near the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setActive(true), io.disconnect()),
      { rootMargin: '600px 0px' },
    )
    io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [])

  // size the host to the container so the book scales fluidly
  useEffect(() => {
    const el = wrapRef.current
    const fit = () => {
      const w = el.clientWidth
      const one = w < BREAK
      setSingle(one)
      hostRef.current.style.height = `${Math.round(w * (one ? PAGE_H / PAGE_W : PAGE_H / (PAGE_W * 2)))}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [PAGE_W, PAGE_H])

  useEffect(() => {
    if (!active) return
    // StPageFlip removes its host's PARENT on destroy, so give it a fresh one every mount.
    const wrap = document.createElement('div')
    wrap.className = 'mag-inner'
    const el = document.createElement('div')
    el.className = 'mag-el'
    wrap.appendChild(el)
    hostRef.current.appendChild(wrap)
    const pf = new PageFlip(el, {
      width: PAGE_W,
      height: PAGE_H,
      size: 'stretch',
      minWidth: 300,
      maxWidth: 900,
      minHeight: Math.round(300 * (PAGE_H / PAGE_W)),
      maxHeight: Math.round(1170 * (PAGE_H / PAGE_W) / 1.295),
      showCover: true,
      usePortrait: true,
      drawShadow: true,
      maxShadowOpacity: 0.5,
      flippingTime: 800,
      mobileScrollSupport: true,
      swipeDistance: 24,
      clickEventForward: false,
      autoSize: true,
    })
    pf.loadFromImages(pages)
    const render = pf.getRender()
    // StPageFlip draws 1:1 CSS pixels, which looks soft on retina screens. Back the canvas with
    // device pixels and scale the context so all of its geometry keeps working in CSS pixels.
    const ui = pf.getUI()
    ui.resizeCanvas = function () {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const box = this.canvas.parentElement.getBoundingClientRect()
      const w = Math.round(box.width)
      const h = Math.round(box.height)
      this.canvas.width = Math.round(w * dpr)
      this.canvas.height = Math.round(h * dpr)
      this.canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    ui.resizeCanvas()
    render.clear = function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    // StPageFlip can lay out off-centre if it initialised off-screen / before images arrived:
    // nudge its own resize handler whenever the book scrolls into view.
    const seen = new IntersectionObserver(([e]) => e.isIntersecting && window.dispatchEvent(new Event('resize')))
    seen.observe(hostRef.current)
    const timers = [400, 1200, 2500].map((ms) => setTimeout(() => window.dispatchEvent(new Event('resize')), ms))
    pf.on('flip', (e) => { setPage(e.data); setTurned(true) })
    pf.on('changeState', (e) => { if (e.data === 'flipping' && sound.current) pageFlipSound() })
    book.current = pf
    return () => {
      seen.disconnect()
      timers.forEach(clearTimeout)
      try { pf.destroy() } catch { /* already gone */ }
      wrap.remove()
      book.current = null
    }
  }, [active, pages, PAGE_W, PAGE_H])

  const next = useCallback(() => book.current?.flipNext('bottom'), [])
  const prev = useCallback(() => book.current?.flipPrev('bottom'), [])
  const onKey = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }
  const toggleSound = () => {
    sound.current = !sound.current
    setSoundOn(sound.current)
    if (sound.current) pageFlipSound() // preview, and unlocks audio
  }

  // cover / back cover sit alone on the right / left, so nudge the closed book to centre
  const pos = single ? '' : page === 0 ? 'at-start' : page >= total - 1 ? 'at-end' : ''
  const shown = page === 0 ? '1' : single ? `${page + 1}` : page >= total - 1 ? `${total}` : `${page + 1}–${Math.min(page + 2, total)}`

  return (
    <div className="mag" tabIndex={0} role="region" aria-label={`${label} flipbook, ${total} pages. Use the left and right arrow keys to turn pages.`} onKeyDown={onKey}>
      <div ref={wrapRef} className={`mag-stage ${pos}`}>
        <div ref={hostRef} className="mag-host" />
      </div>
      <div className="mag-bar">
        <button type="button" className="mag-btn" onClick={prev} aria-label="Previous page" disabled={page === 0}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <div className={`mag-hint${turned ? ' done' : ''}`}>
          <span className="mag-arr l" aria-hidden="true">←</span>
          <span>Swipe left / right to turn the pages</span>
          <span className="mag-arr r" aria-hidden="true">→</span>
        </div>
        <button type="button" className="mag-btn" onClick={next} aria-label="Next page" disabled={page >= total - 1}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="mag-meta">
        <span className="mag-count" aria-live="polite">Page {shown} of {total}</span>
        <button type="button" className="mag-sound" aria-pressed={soundOn} onClick={toggleSound}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            {soundOn ? <path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14" /> : <path d="M22 9l-6 6M16 9l6 6" />}
          </svg>
          Page-turn sound: {soundOn ? 'on' : 'off'}
        </button>
      </div>
    </div>
  )
}
