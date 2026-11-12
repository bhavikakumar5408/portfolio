import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Shelf.css'

const BASE1 = 272 // top of the upper plank
const BASE2 = 500 // top of the lower plank
const OL = { stroke: 'var(--ol)', strokeOpacity: 'var(--ol-op)', strokeLinejoin: 'round', strokeLinecap: 'round' }

// x, width, height of every spine on the upper shelf. `go` marks the two that open a project.
const BOOKS = [
  { id: 'd1', x: 176, w: 44, h: 150, c: '#d9663a', band: '#f4e9dc', pattern: 'dash' },
  { id: 'afreen', x: 224, w: 60, h: 188, c: '#8c1b21', band: '#e3b45a', go: 'afreen-fashion-magazine', title: 'AFREEN', sub: 'Fashion magazine', cover: '/afreen/p01.webp', ratio: 1036 / 800 },
  { id: 'd2', x: 288, w: 40, h: 158, c: '#e3b45a', band: '#8c1b21', pattern: 'dot' },
  { id: 'rangat', x: 332, w: 64, h: 172, c: '#3a1a12', band: '#e3b45a', go: 'rangat-e-ajrakh-bijoi-catalogue', title: 'RANGAT-E-AJRAKH', sub: 'Handloom catalogue', cover: '/bijoi/p01.webp', ratio: 1839 / 1300 },
  { id: 'd3', x: 402, w: 42, h: 146, c: '#3f7c8a', band: '#f4e9dc', lean: -9, pattern: 'dash' },
]
const FRAME = { x: 250, w: 156, h: 190, rot: -3 }

// Lighten (positive) or darken (negative) a hex colour by a flat amount per channel — cheap, good enough for a flat-illustration shading pass.
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16)
  const clamp = (v) => Math.max(0, Math.min(255, v))
  const r = clamp((n >> 16) + amt)
  const g = clamp(((n >> 8) & 0xff) + amt)
  const b = clamp((n & 0xff) + amt)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

function Spine({ b }) {
  const top = BASE1 - b.h
  const gold = b.go
  const patternColor = shade(b.c, b.pattern === 'dot' ? -30 : 24)
  return (
    <g transform={b.lean ? `rotate(${b.lean} ${b.x + b.w} ${BASE1})` : undefined}>
      <rect x={b.x} y={top} width={b.w} height={b.h} rx="4" fill={b.c} {...OL} strokeWidth="2.4" />
      <rect x={b.x + 4} y={top + 4} width={Math.max(3, b.w * 0.14)} height={b.h - 8} rx="2" fill="#fff" opacity="0.16" />
      <rect x={b.x} y={top + 16} width={b.w} height="6" fill={b.band} />
      <rect x={b.x} y={BASE1 - 28} width={b.w} height="6" fill={b.band} />
      {b.pattern === 'dot' && Array.from({ length: Math.max(2, Math.floor(b.h / 26)) }, (_, i) => (
        <circle key={i} cx={b.x + b.w / 2} cy={top + 46 + i * 24} r="3.4" fill={patternColor} />
      ))}
      {b.pattern === 'dash' && Array.from({ length: Math.max(2, Math.floor(b.h / 22)) }, (_, i) => (
        <rect key={i} x={b.x + b.w * 0.26} y={top + 44 + i * 20} width={b.w * 0.48} height="4" rx="2" fill={patternColor} />
      ))}
      {gold && (
        <text
          transform={`translate(${b.x + b.w / 2 + 4} ${top + 44}) rotate(90)`}
          fill={b.band}
          fontSize={b.id === 'afreen' ? 15 : 10.5}
          letterSpacing={b.id === 'afreen' ? 3 : 1.4}
          fontFamily="'Playfair Display', Georgia, serif"
        >
          {b.title}
        </text>
      )}
    </g>
  )
}

// Flat silhouette of everything, drawn offset + blurred to cast the wall shadow.
function Silhouette() {
  return (
    <g fill="#000">
      <rect x="130" y={BASE1} width="740" height="24" rx="3" />
      <rect x="130" y={BASE2} width="740" height="24" rx="3" />
      {BOOKS.map((b) => (
        <rect key={b.id} x={b.x} y={BASE1 - b.h} width={b.w} height={b.h} rx="4" transform={b.lean ? `rotate(${b.lean} ${b.x + b.w} ${BASE1})` : undefined} />
      ))}
      <ellipse cx="640" cy="248" rx="96" ry="34" />
      <circle cx="556" cy="250" r="26" />
      <path d="M726 258 C768 268 782 240 754 232" />
      <rect x={FRAME.x} y={BASE2 - FRAME.h} width={FRAME.w} height={FRAME.h} rx="6" transform={`rotate(${FRAME.rot} ${FRAME.x} ${BASE2})`} />
      <rect x="460" y="386" width="140" height="114" rx="4" />
      <path d="M668 460 H732 L724 500 H676 Z" />
      <circle cx="700" cy="414" r="34" />
    </g>
  )
}

function Cat() {
  return (
    <g className="sh-cat">
      {/* contact shadow on the plank */}
      <ellipse className="sh-contact" cx="638" cy="270" rx="96" ry="9" />
      {/* tail, curling up and over the back */}
      <path d="M726 258 C772 266 786 234 752 226 C734 221 726 236 740 242" fill="none" strokeLinecap="round" stroke="#d9791e" strokeWidth="14" />
      <g className="sh-breathe">
        {/* body */}
        <path d="M552 252 C552 214 594 196 642 198 C698 200 734 222 736 250 C738 274 700 284 640 284 C584 284 552 280 552 252 Z" fill="#ec9638" {...OL} strokeWidth="2.6" />
        {/* tabby stripes on the back */}
        <path d="M600 212 q10 16 2 34 M632 206 q10 18 0 38 M666 210 q10 16 2 34 M696 218 q9 14 2 30" fill="none" stroke="var(--cat-stripe)" strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
        {/* white chest / belly patch */}
        <ellipse cx="598" cy="270" rx="34" ry="15" fill="#fff6e8" opacity="0.92" />
        {/* two tucked front paws */}
        <ellipse cx="560" cy="276" rx="17" ry="9" fill="#fff6e8" {...OL} strokeWidth="2.2" />
        <ellipse cx="594" cy="279" rx="16" ry="8.5" fill="#fff6e8" {...OL} strokeWidth="2.2" />
      </g>
      {/* head */}
      <circle cx="556" cy="250" r="27" fill="#ec9638" {...OL} strokeWidth="2.6" />
      <path d="M534 232 L537 206 L556 226 Z" fill="#ec9638" {...OL} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M580 232 L577 206 L558 226 Z" fill="#ec9638" {...OL} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M538 227 L540 215 L549 225 Z" fill="#f6b6a8" />
      <path d="M576 227 L574 215 L565 225 Z" fill="#f6b6a8" />
      {/* closed, lashed eyes */}
      <path d="M543 250 q6 7 13 0 M560 250 q6 7 13 0" fill="none" stroke="var(--ol)" strokeOpacity="var(--ol-op)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M556 250 l3 -3" stroke="var(--ol)" strokeOpacity="var(--ol-op)" strokeWidth="2" strokeLinecap="round" />
      {/* nose + mouth */}
      <path d="M551 259 L561 259 L556 264 Z" fill="#e0707a" />
      <path d="M556 264 q-5 5 -11 2 M556 264 q5 5 11 2" fill="none" stroke="var(--ol)" strokeOpacity="var(--ol-op)" strokeWidth="1.8" strokeLinecap="round" />
      {/* whiskers */}
      <path d="M528 256 h-14 M528 260 l-13 5 M584 256 h14 M584 260 l13 5" stroke="var(--ol)" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
      <g className="sh-z" fill="var(--zz)" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic">
        <text x="594" y="202" fontSize="16">z</text>
        <text x="610" y="182" fontSize="21">z</text>
        <text x="630" y="158" fontSize="27">Z</text>
      </g>
    </g>
  )
}

function Plant() {
  return (
    <g>
      <ellipse className="sh-contact" cx="700" cy="500" rx="40" ry="7" />
      <g className="sh-sway">
        <path d="M700 452 C698 428 688 408 672 392 M700 452 C702 426 714 406 732 390 M700 452 C700 430 700 412 700 390" fill="none" stroke="#4f7a3f" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M690 430 q-22 -6 -29 -26 q22 0 29 26 Z M710 428 q22 -6 29 -26 q-22 0 -29 26 Z" fill="#6b9a52" {...OL} strokeWidth="2" />
        <circle cx="672" cy="390" r="12" fill="#e04b5a" {...OL} strokeWidth="2" /><circle cx="672" cy="390" r="4.5" fill="#f4e9dc" />
        <circle cx="732" cy="388" r="12" fill="#e3b45a" {...OL} strokeWidth="2" /><circle cx="732" cy="388" r="4.5" fill="#8c1b21" />
        <circle cx="700" cy="386" r="13" fill="#ff8a1f" {...OL} strokeWidth="2" /><circle cx="700" cy="386" r="5" fill="#f4e9dc" />
      </g>
      <rect x="665" y="448" width="70" height="14" rx="3" fill="#c96a4a" {...OL} strokeWidth="2.2" />
      <path d="M670 461 H730 L722 500 H678 Z" fill="#c96a4a" {...OL} strokeWidth="2.2" />
      <path d="M678 474 H722" stroke="#fff" strokeWidth="3" opacity="0.3" strokeLinecap="round" />
    </g>
  )
}

export default function Shelf() {
  const navigate = useNavigate()
  const [tip, setTip] = useState(null) // { x, y, title, sub }
  const busy = useRef(false)
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 640px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const on = () => setCompact(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const refs = useRef({})

  useEffect(() => {
    const clear = () => document.querySelectorAll('.shelf-fly, .shelf-curtain').forEach((n) => n.remove())
    clear()
    return clear
  }, [])

  const move = (e, info) => setTip({ x: e.clientX, y: e.clientY, ...info })
  const leave = () => setTip(null)

  // pull the book off the shelf, grow it to its cover, then open the case study
  const open = (e, item) => {
    e.preventDefault()
    if (busy.current) return
    busy.current = true
    setTip(null)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const go = () => navigate(`/work/${item.go}`, { state: { fromShelf: true } })
    if (reduce) return go()
    const r = refs.current[item.id].getBoundingClientRect()
    const curtain = document.createElement('div')
    curtain.className = 'shelf-curtain'
    const fly = document.createElement('div')
    fly.className = 'shelf-fly'
    fly.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;background:${item.spine}`
    fly.innerHTML = `<img src="${item.cover}" alt="" />`
    document.body.append(curtain, fly)
    const w = Math.min(window.innerWidth * 0.62, 340)
    const h = w * item.ratio
    const kf = [
      { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, transform: 'rotate(0deg)' },
      { left: `${r.left}px`, top: `${r.top - 26}px`, width: `${r.width}px`, height: `${r.height}px`, transform: 'rotate(-3deg)', offset: 0.28 },
      { left: `${(window.innerWidth - w) / 2}px`, top: `${(window.innerHeight - h) / 2}px`, width: `${w}px`, height: `${h}px`, transform: 'rotate(0deg)' },
    ]
    curtain.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 650, fill: 'forwards', easing: 'ease-out' })
    fly.querySelector('img').animate([{ opacity: 0 }, { opacity: 0, offset: 0.4 }, { opacity: 1 }], { duration: 750, fill: 'forwards' })
    const a = fly.animate(kf, { duration: 750, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' })
    a.onfinish = () => {
      go()
      setTimeout(() => {
        curtain.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' }).onfinish = () => { curtain.remove(); fly.remove() }
        fly.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' })
        busy.current = false
      }, 500)
    }
  }

  const frame = {
    id: 'iara', go: 'my-coworker-isn-t-real', title: 'Iara', sub: 'An AI coworker', spine: '#8a5a34', cover: '/img/iara.jpg', ratio: 1442 / 1178,
  }

  const camera = {
    id: 'camera', go: 'ai-catalogue-studio', title: 'AI Catalogue Studio', sub: 'POP Shop · 2025', spine: '#1e1e1e', cover: '/catalogue/pop-logo-card.webp', ratio: 1,
  }

  const hit = (item) => ({
    onPointerMove: (e) => move(e, { title: item.title, sub: item.sub }),
    onPointerLeave: leave,
    onClick: (e) => open(e, item),
    onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') open(e, item) },
    role: 'link',
    tabIndex: 0,
    'aria-label': `${item.title}: click to view project`,
  })

  return (
    <section className="shelf-home">
      <i className="shelf-ambient" aria-hidden="true" />

<header className="shelf-head">
        <h1>Bhavika Kumar</h1>
        <p>AI generalist and design curator</p>
      </header>

      <div className="shelf-wrap">
        <svg viewBox={compact ? '120 60 760 480' : '0 0 1000 560'} className="shelf-svg" role="group" aria-label="A bookshelf of projects">
          <defs>
            <filter id="sh-warm" x="-10%" y="-10%" width="130%" height="140%">
              <feColorMatrix type="matrix" values="0 0 0 0 0.24  0 0 0 0 0.13  0 0 0 0 0.06  0 0 0 1 0" />
              <feGaussianBlur stdDeviation="4.5" />
            </filter>
            <filter id="sh-cool" x="-10%" y="-10%" width="130%" height="140%">
              <feColorMatrix type="matrix" values="0 0 0 0 0.01  0 0 0 0 0.02  0 0 0 0 0.06  0 0 0 1 0" />
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <clipPath id="frame-clip"><rect x={FRAME.x + 17} y={BASE2 - FRAME.h + 17} width={FRAME.w - 34} height={FRAME.h - 34} rx="2" /></clipPath>
          </defs>

          <g className="sh-shadow sh-shadow-far"><Silhouette /></g>
          <g className="sh-shadow sh-shadow-near"><Silhouette /></g>

          <g className="sh-art" style={{ '--cat-stripe': shade('#ec9638', -46) }}>
            {/* planks */}
            {[ BASE1, BASE2 ].map((y) => (
              <g key={y}>
                <rect x="130" y={y} width="740" height="24" rx="3" fill="var(--plank)" {...OL} strokeWidth="3" />
                <rect x="130" y={y} width="740" height="6" rx="3" fill="var(--plank-top)" />
                <rect x="130" y={y + 18} width="740" height="6" rx="3" fill="var(--plank-front)" />
              </g>
            ))}

            {/* contact shadow under the row of books */}
            <ellipse className="sh-contact" cx="320" cy={BASE1 + 2} rx="250" ry="7" />

            {/* books */}
            {BOOKS.map((b) => {
              const item = b.go ? { ...b, spine: b.c } : null
              if (!item) return <Spine key={b.id} b={b} />
              const delay = b.id === 'afreen' ? '0s' : '1.6s'
              return (
                <g
                  key={b.id}
                  ref={(n) => { refs.current[b.id] = n }}
                  className="sh-book"
                  style={{ '--dl': delay }}
                  {...hit(item)}
                >
                  <rect x={b.x - 6} y={BASE1 - b.h - 10} width={b.w + 12} height={b.h + 10} fill="transparent" />
                  <Spine b={b} />
                </g>
              )
            })}

            <Cat />

            {/* lower shelf: framed Iara photo + plant */}
            <ellipse className="sh-contact" cx={FRAME.x + FRAME.w / 2} cy={BASE2 + 2} rx="90" ry="7" />
            <g transform={`rotate(${FRAME.rot} ${FRAME.x} ${BASE2})`}>
            <g
              ref={(n) => { refs.current[frame.id] = n }}
              className="sh-book sh-frame"
              style={{ '--dl': '0.8s' }}
              {...hit(frame)}
            >
              <rect x={FRAME.x} y={BASE2 - FRAME.h} width={FRAME.w} height={FRAME.h} rx="6" fill="#8a5a34" {...OL} strokeWidth="2.6" />
              <rect x={FRAME.x + 8} y={BASE2 - FRAME.h + 8} width={FRAME.w - 16} height={FRAME.h - 16} rx="2" fill="#f4e9dc" {...OL} strokeWidth="1.8" />
              <image href="/img/iara.jpg" x={FRAME.x + 17} y={BASE2 - FRAME.h + 17} width={FRAME.w - 34} height={FRAME.h - 34} preserveAspectRatio="xMidYMid slice" clipPath="url(#frame-clip)" />
              <circle cx={FRAME.x + 11} cy={BASE2 - FRAME.h + 11} r="3" fill="#e9d9b8" {...OL} strokeWidth="1.2" />
              <circle cx={FRAME.x + FRAME.w - 11} cy={BASE2 - FRAME.h + 11} r="3" fill="#e9d9b8" {...OL} strokeWidth="1.2" />
              <circle cx={FRAME.x + 11} cy={BASE2 - 11} r="3" fill="#e9d9b8" {...OL} strokeWidth="1.2" />
              <circle cx={FRAME.x + FRAME.w - 11} cy={BASE2 - 11} r="3" fill="#e9d9b8" {...OL} strokeWidth="1.2" />
            </g>
            </g>
            {/* camera between frame and plant */}
            <ellipse className="sh-contact" cx="530" cy="502" rx="72" ry="7" />
            <g
              ref={(n) => { refs.current[camera.id] = n }}
              className="sh-book"
              style={{ '--dl': '1.2s' }}
              {...hit(camera)}
            >
              <rect x="450" y="380" width="160" height="120" fill="transparent" />
              <image href="/img/camera.png" x="460" y="386" width="140" height="114" />
            </g>

            <Plant />
          </g>
        </svg>
      </div>

      <p className="shelf-touch">Tap a book, the photo or the camera to open a project</p>

      {tip && (
        <div className="shelf-tip" style={{ left: tip.x, top: tip.y }}>
          <b>{tip.title}</b>
          <span>{tip.sub}</span>
          <em>Click to view project</em>
        </div>
      )}
    </section>
  )
}
