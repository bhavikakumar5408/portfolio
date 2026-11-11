import { useEffect, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ScrollProgress from '../components/fx/ScrollProgress.jsx'
import MagazineFlipbook from '../components/MagazineFlipbook.jsx'
import './ProjectAfreen.css' // flipbook (.mag*) styles
import './ProjectBijoi.css'

const TOTAL = 38
const src = (n) => `/bijoi/p${String(n).padStart(2, '0')}.webp`

const roles = [
  ['Photography', 'The whole Kavya shoot: dupattas and stoles worn, draped and held.'],
  ['Photo editing', 'One warm, peach-toned grade across every frame.'],
  ['Shoot direction & styling', 'Poses, props and palette on set, with red as the thread.'],
  ['Content', 'Collection and product copy: fabric, size, and how each piece feels.'],
  ['Cover design', 'Rangat-e-Ajrakh, drawn from the catalogue’s own brown, gold and motif.'],
]

const gallery = [
  { n: 10, cap: 'Kavya collection', h: 520 },
  { n: 12, cap: 'Modal silk dupatta', h: 440 },
  { n: 14, cap: 'Kavya collection', h: 560 },
  { n: 16, cap: 'Modal silk stole', h: 460 },
  { n: 18, cap: 'Modal silk stole', h: 540 },
  { n: 26, cap: 'Kavya collection', h: 450 },
  { n: 28, cap: 'Kavya collection', h: 530 },
  { n: 30, cap: 'Mashru silk stole', h: 470 },
  { n: 34, cap: 'Mashru silk stole', h: 550 },
]

const palette = [
  ['Crimson', '#911e23'],
  ['Rust', '#82411c'],
  ['Earth brown', '#391b13'],
  ['Gold-tan', '#ad8756'],
  ['Peach backdrop', '#efd7c2'],
]

const statement = 'Photographs that started in a catalogue and ended up on a storefront.'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.bjx [data-r]')
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// scroll-linked effects: word-by-word statement + pinned horizontal gallery
function useScrollFx(statementRef, hRef) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const st = { raf: 0 }
    const run = () => {
      st.raf = 0
      const vh = window.innerHeight
      const s = statementRef.current
      if (s) {
        const r = s.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55 + r.height)))
        const words = s.querySelectorAll('span')
        const n = reduce ? words.length : Math.round(p * words.length * 1.15)
        words.forEach((w, i) => w.classList.toggle('on', i < n))
      }
      const h = hRef.current
      if (h && window.innerWidth > 860 && !reduce) {
        const track = h.querySelector('.bjx-track')
        const r = h.getBoundingClientRect()
        const total = h.offsetHeight - vh
        const p = Math.min(1, Math.max(0, -r.top / total))
        const dist = track.scrollWidth - window.innerWidth
        track.style.transform = `translate3d(${-p * dist}px,0,0)`
        h.style.setProperty('--hp', p.toFixed(3))
      } else if (h) {
        h.querySelector('.bjx-track').style.transform = ''
      }
    }
    const onScroll = () => { if (!st.raf) st.raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(st.raf)
    }
  }, [statementRef, hRef])
}

export default function ProjectBijoi() {
  const { state } = useLocation()
  const pages = useMemo(() => Array.from({ length: TOTAL }, (_, i) => src(i + 1)), [])
  const stRef = useRef(null)
  const hRef = useRef(null)
  useReveal()
  useScrollFx(stRef, hRef)

  return (
    <div className="bjx">
      <ScrollProgress />

      {/* HERO */}
      <header className="bjx-hero">
        <div className="bjx-lattice" aria-hidden="true" />
        <div className="bjx-hero-in">
          <Link to="/work" className="bjx-back">← All projects</Link>
          <div className="bjx-hero-grid">
            <div>
              <p className="bjx-eyebrow">Bijoi · Kavya collection · 2024</p>
              <h1 className="bjx-title" aria-label="Rangat-e-Ajrakh">
                <span>Rangat</span>
                <em>e</em>
                <span>Ajrakh</span>
              </h1>
              <p className="bjx-lede">A 38-page handloom catalogue, shot, edited and written for Bijoi, with a cover to open it. The photographs now sell on Bijoi’s own website.</p>
              <ul className="bjx-chips">
                <li>Photography</li><li>Editing</li><li>Shoot direction</li><li>Styling</li><li>Content</li><li>Cover</li>
              </ul>
              
            </div>
          </div>
        </div>
        <div className="bjx-marquee" aria-hidden="true">
          <div className="bjx-mq">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k}>
                {Array.from({ length: 10 }).map((__, i) => <span key={i}>RANGAT-E-AJRAKH ✦ BIJOI ✦ KAVYA ✦ HANDBLOCKED ✦</span>)}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* FLIPBOOK */}
      <section className="bjx-read bjx-read-first" id="read">
        <div className="bjx-read-head" data-r>
          <p className="bjx-k">The catalogue</p>
          <h2>Turn the pages</h2>
          <p>All 38 pages. Drag or swipe a page corner, or tap the arrows. Switch the page-turn sound on if you like.</p>
        </div>
        <div className="afr-book">
          <MagazineFlipbook pages={pages} label="Rangat-e-Ajrakh catalogue" pageW={1000} pageH={1414} autoOpen={!!state?.fromShelf} />
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bjx-state">
        <p className="bjx-k">The idea</p>
        <p className="bjx-big" ref={stRef}>
          {statement.split(' ').map((w, i) => <span key={i}>{w} </span>)}
        </p>
        <div className="bjx-facts" data-r>
          <div><b>38</b><span>pages</span></div>
          <div><b>2</b><span>fabrics: Modal silk and Mashru silk</span></div>
          <div><b>1</b><span>cover, designed from scratch</span></div>
          <div><b>Live</b><span>photos used on bijoi.in</span></div>
        </div>
      </section>

      {/* CRAFT + ROLE */}
      <section className="bjx-craft">
        <div className="bjx-craft-l" data-r>
          <p className="bjx-k">The craft</p>
          <h2>Ajrakh is print you can read with your hands.</h2>
          <p>Born in Kutch in Gujarat and Sindh, Ajrakh is hand block printing known for geometric patterns and rich natural dyes. The catalogue lets that print lead, so the set stays warm, quiet and red.</p>
        </div>
        <ol className="bjx-roles">
          {roles.map(([t, d], i) => (
            <li key={t} data-r style={{ '--d': `${i * 70}ms` }}>
              <span className="bjx-ix">{String(i + 1).padStart(2, '0')}</span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* PINNED HORIZONTAL GALLERY */}
      <section className="bjx-h" ref={hRef}>
        <div className="bjx-h-pin">
          <div className="bjx-h-head">
            <p className="bjx-k">The shoot</p>
            <h2>Kavya, frame by frame</h2>
            <p className="bjx-scrollhint">Keep scrolling <i>→</i></p>
          </div>
          <div className="bjx-track">
            {gallery.map((g, i) => (
              <figure key={g.n} className="bjx-card" style={{ '--h': `${g.h}px`, '--i': i }}>
                <img src={src(g.n)} alt={`${g.cap}, catalogue page ${g.n}`} loading="lazy" />
                <figcaption><b>{g.cap}</b><span>p.{String(g.n).padStart(2, '0')}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="bjx-prog"><i /></div>
        </div>
      </section>

      {/* PALETTE */}
      <section className="bjx-pal">
        <div className="bjx-pal-head" data-r>
          <p className="bjx-k">The palette</p>
          <h2>Five colours, taken from the cloth.</h2>
        </div>
        <ul className="bjx-sw">
          {palette.map(([n, c], i) => (
            <li key={c} data-r style={{ '--c': c, '--d': `${i * 90}ms` }}>
              <span>{n}</span><code>{c}</code>
            </li>
          ))}
        </ul>
      </section>


      {/* COVER ANATOMY */}
      <section className="bjx-anat">
        <div className="bjx-anat-in">
          <div className="bjx-anat-img" data-r>
            <img src={src(1)} alt="Rangat-e-Ajrakh cover" loading="lazy" />
            <span className="pin p1">1</span><span className="pin p2">2</span><span className="pin p3">3</span><span className="pin p4">4</span>
          </div>
          <div className="bjx-anat-t" data-r>
            <p className="bjx-k">The cover</p>
            <h2>The catalogue had no cover. So I made one.</h2>
            <ol className="bjx-legend">
              <li><i>1</i><b>Title</b> A high-contrast serif with wide tracking, split over two lines around a small “e”.</li>
              <li><i>2</i><b>Motif</b> The star lattice from the book’s opening page, kept at one size and nothing else.</li>
              <li><i>3</i><b>Frame</b> A double hairline in gold, like the edge of a printed border.</li>
              <li><i>4</i><b>Colour</b> The catalogue’s own dark brown and gold-tan. No new colours.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* LIVE ON WEBSITE */}
      <section className="bjx-web">
        <div className="bjx-web-head" data-r>
          <p className="bjx-k">In the wild</p>
          <h2>Now live on <u>bijoi.in</u></h2>
          <p>Our catalogue photographs are used on Bijoi’s official website, across its product pages. This is the Ajrakh dupattas collection.</p>
        </div>
        <div className="bjx-browser" data-r>
          <div className="bjx-bar">
            <i /><i /><i />
            <span className="bjx-url">bijoi.in/collections/ajrakh-dupattas</span>
            <span className="bjx-live"><b /> Live</span>
          </div>
          <img src="/bijoi/website.webp" alt="Bijoi website, Ajrakh dupattas collection page, showing photographs from the catalogue shoot" loading="lazy" />
        </div>
        <a className="bjx-visit" href="https://bijoi.in/collections/ajrakh-dupattas" target="_blank" rel="noreferrer">Visit the page ↗</a>
      </section>

      {/* OUTCOME */}
      <section className="bjx-out">
        <p className="bjx-k">The outcome</p>
        <p className="bjx-out-big" data-r>A finished catalogue, a cover that opens it, and photographs a real handloom brand uses to sell.</p>
        <p className="bjx-out-s" data-r>Alongside AFREEN, it shows I have been making catalogues, magazines and fashion shoots since college.</p>
        <Link to="/work" className="bjx-cta bjx-cta-l">See more work <i>→</i></Link>
      </section>
    </div>
  )
}
