import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollProgress from '../components/fx/ScrollProgress.jsx'
import './ProjectCatalogue.css'

const BEFORE_AFTERS = [
  { id: 'apparel', label: 'Apparel', focus: 'Focus: product fidelity + category-specific staging', before: '/catalogue/apparel-before.webp', after: '/catalogue/apparel-after.webp' },
]

const QC = [
  ['Product fidelity', 'Does the output still represent the actual product?'],
  ['Category fit', 'Does the visual treatment make sense for the product category?'],
  ['Composition', 'Is the product clearly visible and appropriately framed?'],
  ['Catalogue consistency', 'Does the image feel usable within a commerce environment?'],
]

const LEARNINGS = [
  ['AI image generation is the easy part.', 'The hard part is consistent, commercially usable output.'],
  ['Every category has its own visual logic.', 'Apparel, food and beauty need fundamentally different staging decisions.'],
  ['Product fidelity matters more than visual novelty.', "A beautiful image that changes the product isn't useful for commerce."],
  ['Scaling requires systems, not individual prompts.', 'Visual logic has to be repeatable before it can be automated.'],
  ['Catalogue design is ultimately about consistency.', 'Thousands of individual products still need to feel like one shopping experience.'],
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.aic [data-r]')
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Ph({ label, ratio = '4 / 5', align }) {
  return (
    <div className={`aic-ph${align ? ` aic-ph-${align}` : ''}`} style={{ aspectRatio: ratio }}>
      <span>{label}</span>
    </div>
  )
}

function Counter({ to = 100, suffix = 'K+' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (reduce) return setN(to)
      const start = performance.now()
      const dur = 1200
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur)
        const eased = 1 - (1 - p) ** 3
        setN(Math.round(eased * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    if (el) io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <b ref={ref} className="aic-count">{n}{suffix}</b>
}

function CompareSlider({ item }) {
  const [pos, setPos] = useState(50)
  const frameRef = useRef(null)
  const dragging = useRef(false)

  const setFromClientX = (clientX) => {
    const el = frameRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  const start = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setFromClientX(e.clientX)
  }
  const move = (e) => { if (dragging.current) setFromClientX(e.clientX) }
  const end = () => { dragging.current = false }

  return (
    <figure className="aic-ba" data-r>
      <div className="aic-phone">
        <i className="aic-phone-notch" />
        <div
          className="aic-ba-frame"
          ref={frameRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        >
          <div className="aic-ba-layer">
            {item.before ? <img src={item.before} alt={`${item.label} catalogue — before`} draggable="false" /> : <Ph label={`${item.label} — BEFORE`} align="start" />}
          </div>
          <div className="aic-ba-layer" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            {item.after ? <img src={item.after} alt={`${item.label} catalogue — after`} draggable="false" /> : <Ph label={`${item.label} — AFTER`} align="end" />}
          </div>
          <div className="aic-ba-handle" style={{ left: `${pos}%` }}><i /></div>
        </div>
      </div>
      <figcaption>{item.focus}</figcaption>
    </figure>
  )
}

export default function ProjectCatalogue() {
  useReveal()

  return (
    <div className="aic">
      <ScrollProgress />

      {/* 01 — HERO */}
      <header className="aic-hero">
        <Link to="/work" className="aic-back">← All projects</Link>
        <p className="aic-eyebrow">POP Shop · AI Design Curator · 2026</p>
        <h1 className="aic-title">AI Catalogue Studio</h1>
        <p className="aic-sub">Scaling product imagery for a live commerce catalogue</p>
        <div className="aic-metric" data-r><b>100K+</b><span>product images processed with AI</span></div>
        <p className="aic-lede">Developing category-specific visual staging and prompting frameworks for POP Shop's AI-assisted catalogue production workflow.</p>
        <ul className="aic-chips">
          <li>AI Image Editing</li><li>Prompt Engineering</li><li>Visual Staging</li><li>n8n (automation layer)</li><li>100K+ Images</li>
        </ul>
      </header>

      {/* 02 — CONTEXT / PROBLEM */}
      <section className="aic-ctx">
        <p className="aic-k" data-r>The problem</p>
        <h2 data-r>How do you make 100K+ products catalogue-ready?</h2>
        <p data-r>POP Shop's catalogue spans dozens of product categories — apparel, skincare, food, accessories, and more. Each one carries its own visual logic: what makes a skincare bottle look premium is almost the opposite of what makes a plate of food look appetising.</p>
        <p data-r>The real challenge wasn't "can AI generate a good image." It was: can AI-assisted production create catalogue imagery that's consistent and usable across thousands of products, while still preserving the identity of the actual product being sold?</p>
      </section>

      {/* 03 — MY ROLE */}
      <section className="aic-role">
        <p className="aic-k" data-r>My role</p>
        <h2 data-r>Designing the visual logic</h2>
        <ol className="aic-role-list">
          {[
            ['Category mapping', 'Identifying what actually matters visually for each product type.'],
            ['Visual staging', 'Defining how a product should appear in its final catalogue context.'],
            ['Prompt frameworks', 'Building category-specific logic for AI image processing.'],
            ['Output refinement', 'Reviewing generated results against product fidelity and composition issues.'],
            ['Systemising the rules', 'Turning one-off creative calls into repeatable, category-specific standards that could run at scale.'],
          ].map(([t, d], i) => (
            <li key={t} data-r style={{ '--d': `${i * 70}ms` }}>
              <span className="aic-ix">{String(i + 1).padStart(2, '0')}</span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </li>
          ))}
        </ol>
        <p className="aic-note" data-r>The underlying automation was built collaboratively by my team in n8n. My work was the visual staging, prompting logic, and catalogue treatment that fed into it.</p>
      </section>

      {/* 06 — BEFORE / AFTER */}
      <section className="aic-ba-sec">
        <p className="aic-k" data-r>The transformation</p>
        <h2 data-r>From raw product image to catalogue-ready asset</h2>
        <div className="aic-ba-list">
          {BEFORE_AFTERS.map((item) => <CompareSlider key={item.id} item={item} />)}
        </div>
      </section>

      {/* 08 — SCALE */}
      <section className="aic-scale">
        <p className="aic-k" data-r>The scale</p>
        <h2 data-r>From a few images to 100K+</h2>
        <div className="aic-scale-num" data-r><Counter to={100} /><span>Catalogue images processed with AI</span></div>
        <ul className="aic-scale-tags" data-r>
          <li>Live commerce platform</li><li>Multiple product categories</li><li>AI-assisted production</li><li>Category-specific visual logic</li>
        </ul>
        <blockquote data-r>"This wasn't a concept exercise. The workflow was used to support imagery for a live commerce catalogue."</blockquote>
        <blockquote data-r>"Working at catalogue scale changed the problem from 'Can AI generate a good image?' to 'Can AI consistently produce usable product imagery across thousands of products?'"</blockquote>
      </section>

      {/* 09 — QUALITY CONTROL */}
      <section className="aic-qc">
        <p className="aic-k" data-r>Quality control</p>
        <h2 data-r>When scale increases, quality becomes the problem</h2>
        <div className="aic-qc-grid">
          {QC.map(([t, d], i) => (
            <div key={t} className="aic-qc-item" data-r style={{ '--d': `${i * 80}ms` }}>
              <svg viewBox="0 0 24 24" className="aic-check" aria-hidden="true"><path d="M4 12.5 L9.5 18 L20 6" /></svg>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10 — LIVE PRODUCTION */}
      <section className="aic-live">
        <p className="aic-k" data-r>In the wild</p>
        <h2 data-r>This wasn't a concept project.</h2>
        <p data-r>This work shipped — it supported product imagery for POP Shop's live catalogue, not a personal AI experiment. Real product diversity, real catalogue requirements, production-scale AI usage.</p>
      </section>

      {/* 11 — LEARNINGS */}
      <section className="aic-learn">
        <p className="aic-k" data-r>Learnings</p>
        <h2 data-r>What working at catalogue scale taught me</h2>
        <ol className="aic-learn-list">
          {LEARNINGS.map(([t, d], i) => (
            <li key={t} data-r style={{ '--d': `${i * 80}ms` }}>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
