import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shelf from './Shelf.jsx'
import './ShelfJourney.css'

const STAGES = [
  {
    id: 'afreen', go: 'afreen-fashion-magazine',
    title: 'AFREEN', blurb: 'Indian crafts and handloom, shot like fashion.',
    sub: 'Fashion magazine · 2023', cover: '/afreen/p01.webp',
    coverRatio: 1036 / 800, color: '#8c1b21', textColor: '#f4e9dc',
  },
  {
    id: 'rangat', go: 'rangat-e-ajrakh-bijoi-catalogue',
    title: 'Rangat-e-Ajrakh', blurb: "A handloom catalogue whose photos now sell on the brand's website.",
    sub: 'Handloom catalogue · 2024', cover: '/bijoi/p01.webp',
    coverRatio: 1839 / 1300, color: '#3a1a12', textColor: '#f8ece1',
  },
  {
    id: 'iara', go: 'my-coworker-isn-t-real',
    title: "My Coworker Isn't Real", blurb: "Her name is Iara. She's doing great.",
    sub: 'AI coworker · 2026', cover: '/img/iara.jpg',
    coverRatio: 1442 / 1178, color: '#8a5a34', textColor: '#f4e9dc',
  },
  {
    id: 'camera', go: 'ai-catalogue-studio',
    title: 'AI Catalogue Studio', blurb: 'Scaling product imagery for a live commerce catalogue, 100K+ images.',
    sub: 'POP Shop · 2026', cover: '/catalogue/pop-logo-card.webp',
    coverRatio: 1, color: '#1e1e1e', textColor: '#f0efec',
  },
]

function clamp01(x) { return Math.max(0, Math.min(1, x)) }
function ss(t) { const c = clamp01(t); return c * c * (3 - 2 * c) }
function lerp(a, b, t) { return a + (b - a) * t }
function phase(lp, s, e) { return ss(clamp01((lp - s) / (e - s))) }

export default function ShelfJourney() {
  const navigate = useNavigate()
  const outerRef = useRef(null)
  const svgRef = useRef(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    let raf = null
    const tick = () => {
      raf = null
      if (!outerRef.current) return
      const rect = outerRef.current.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      setP(clamp01(-rect.top / scrollable))
    }
    const handler = () => { if (!raf) raf = requestAnimationFrame(tick) }
    window.addEventListener('scroll', handler, { passive: true })
    return () => { window.removeEventListener('scroll', handler); if (raf) cancelAnimationFrame(raf) }
  }, [])

  const n = STAGES.length
  const rawSi = p * n
  const si = Math.min(n - 1, Math.floor(rawSi))
  // smoothstep the local progress so motion eases in/out within each stage
  const lp = ss(clamp01(rawSi - si))
  const stage = STAGES[si]

  // Phase timing (0–1 within each stage):
  // 0.00–0.14  lift
  // 0.14–0.32  overlay scales in
  // 0.32–0.46  card flips to cover-side
  // 0.46–0.70  reading (info visible)
  // 0.70–0.84  card flips back + overlay scales out
  // 0.84–1.00  book lowers

  const liftAmt  = lp < 0.14 ? lerp(0, 44, phase(lp, 0, 0.14))
                 : lp < 0.84 ? 44
                 : lerp(44, 0, phase(lp, 0.84, 1.00))

  const overScale = lp < 0.14 ? 0
                  : lp < 0.32 ? lerp(0.08, 1, phase(lp, 0.14, 0.32))
                  : lp < 0.70 ? 1
                  : lp < 0.84 ? lerp(1, 0.08, phase(lp, 0.70, 0.84))
                  : 0

  // flip: 0 = cover facing user, 180 = info facing user
  const flipDeg  = lp < 0.32 ? 0
                 : lp < 0.46 ? lerp(0, 180, phase(lp, 0.32, 0.46))
                 : lp < 0.70 ? 180
                 : lp < 0.84 ? lerp(180, 0, phase(lp, 0.70, 0.84))
                 : 0

  const curtainOp = lp < 0.08 ? 0
                  : lp < 0.20 ? lerp(0, 0.78, phase(lp, 0.08, 0.20))
                  : lp < 0.78 ? 0.78
                  : lp < 0.90 ? lerp(0.78, 0, phase(lp, 0.78, 0.90))
                  : 0

  const isLiftedActive = lp > 0.03 && lp < 0.97
  const overlayVisible = lp > 0.10 && lp < 0.90 && overScale > 0.04
  const showHint = p < 0.05

  return (
    <div ref={outerRef} className="jny-outer">
      <div className="jny-sticky">
        <Shelf
          svgRef={svgRef}
          liftedId={isLiftedActive ? stage.id : null}
          liftY={liftAmt}
        />

        {curtainOp > 0.01 && (
          <div className="jny-curtain" style={{ opacity: curtainOp }} />
        )}

        {overlayVisible && (
          <JourneyCard
            stage={stage}
            scale={overScale}
            flipDeg={flipDeg}
            onOpen={() => navigate(`/work/${stage.go}`, { state: { fromShelf: true } })}
          />
        )}

        <div className="jny-progress">
          {STAGES.map((s, i) => (
            <span
              key={s.id}
              className="jny-pip"
              data-active={i === si || undefined}
              style={{
                opacity: i < si ? 1 : i === si ? lerp(0.35, 1, lp) : 0.28,
                transform: `scaleX(${i === si ? lerp(0.1, 1, lp) : i < si ? 1 : 0.1})`,
              }}
            />
          ))}
        </div>

        {showHint && (
          <div className="jny-hint" style={{ opacity: lerp(1, 0, p / 0.05) }}>
            <span>scroll to explore</span>
            <i className="jny-arrow" aria-hidden="true" />
          </div>
        )}

        <a href="/work" className="jny-skip">skip →</a>
      </div>
    </div>
  )
}

function JourneyCard({ stage, scale, flipDeg, onOpen }) {
  const vw = window.innerWidth
  const cardW = Math.min(vw * 0.74, 310)
  const cardH = cardW * stage.coverRatio

  return (
    <div className="jny-card-stage">
      <div
        className="jny-card-scaler"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="jny-card-perspective" style={{ width: cardW, height: cardH }}>
          <div
            className="jny-card-inner"
            style={{ transform: `rotateY(${flipDeg}deg)` }}
          >
            {/* Front: book / photo cover */}
            <div className="jny-face jny-face-front">
              <img src={stage.cover} alt={stage.title} />
            </div>
            {/* Back: project info */}
            <div className="jny-face jny-face-back" style={{ background: stage.color, color: stage.textColor }}>
              <p className="jny-info-eyebrow">{stage.sub}</p>
              <h2 className="jny-info-title">{stage.title}</h2>
              <p className="jny-info-blurb">{stage.blurb}</p>
              <button
                className="jny-info-cta"
                onClick={onOpen}
                style={{ '--cta-fg': stage.textColor }}
              >
                Open project →
              </button>
              <p className="jny-info-or">or keep scrolling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
