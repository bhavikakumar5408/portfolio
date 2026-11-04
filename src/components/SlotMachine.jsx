import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { sfx } from './slot/sound.js'
import './SlotMachine.css'

const SPARK = '✦'

// What each reel lands on. Phase 0 = name, 1 = role, 2 = current role.
const PHASES = [
  [ 'Bhavika', 'Kumar', SPARK ],
  [ 'AI', 'Generalist', SPARK ],
  [ 'AI', 'Design', 'Curator' ],
]
const LABELS = [ 'Hi, I’m', 'I’m an', 'At POP, I’m an' ]
const JACKPOT = [ SPARK, SPARK, SPARK ]
const FILLER = [ 'AI', 'Design', 'Taste', 'Craft', 'Prompt', 'Agents', 'Pixels', 'Story', 'Systems', 'Curator', 'Bhavika', SPARK, SPARK ]

// Usable text width of each reel, in machine-width units (cqw), used to size words so they fit.
const REEL_W = [ 21.7, 27.7, 21.7 ]
const MOBILE_REEL_W = 76
const JACKPOT_EVERY = 3

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function wordSize(word, reelW, cap) {
  return Math.min(cap, (reelW * 0.82) / (word.length * 0.56))
}

function Sparkle() {
  return (
    <svg className="sm-spark" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="smSparkG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff9a3c" />
          <stop offset="1" stopColor="#d9480f" />
        </linearGradient>
      </defs>
      <path d="M50 4 C54 32 68 46 96 50 C68 54 54 68 50 96 C46 68 32 54 4 50 C32 46 46 32 50 4Z" fill="url(#smSparkG)" />
    </svg>
  )
}

function Cell({ word, index }) {
  if (word === SPARK) return <div className="sm-cell"><Sparkle /></div>
  const style = {
    '--fs': `${wordSize(word, REEL_W[index], 5.6)}cqw`,
    '--fsm': `${wordSize(word, MOBILE_REEL_W, 8.4)}cqw`,
  }
  return (
    <div className="sm-cell">
      <span className="sm-word" style={style}>{word}</span>
    </div>
  )
}

const Reel = forwardRef(function Reel({ index, initial, reduce, onStop }, ref) {
  const [strip, setStrip] = useState([ initial ])
  const [run, setRun] = useState(0)
  const stripEl = useRef(null)
  const job = useRef(null)
  const current = useRef(initial)

  useImperativeHandle(ref, () => ({
    spinTo(target) {
      return new Promise((resolve) => {
        const count = 9 + index * 5
        const fillers = Array.from({ length: count }, () => pick(FILLER))
        job.current = { resolve, target, count, duration: 1500 + index * 520 }
        setStrip([ current.current, ...fillers, target, target ])
        setRun((r) => r + 1)
      })
    },
    get duration() {
      return 1500 + index * 520
    },
  }))

  useLayoutEffect(() => {
    if (!run || !job.current) return
    const el = stripEl.current
    const { resolve, target, count, duration } = job.current
    const finish = () => {
      el.classList.remove('is-spinning')
      el.style.transition = 'none'
      el.style.transform = 'translateY(0)'
      current.current = target
      setStrip([ target ])
      onStop?.(index)
      resolve()
    }
    el.style.transition = 'none'
    el.style.transform = 'translateY(0)'
    void el.offsetHeight
    if (reduce) {
      finish()
      return
    }
    el.classList.add('is-spinning')
    el.style.transition = `transform ${duration}ms cubic-bezier(.16,.84,.28,1.04)`
    el.style.transform = `translateY(calc(var(--cell) * -${count + 1}))`
    const id = setTimeout(finish, duration + 40)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run])

  return (
    <div className="sm-reel-wrap">
      <i className="sm-cap" />
      <div className="sm-reel">
        <div className="sm-strip" ref={stripEl}>
          {strip.map((w, i) => <Cell key={i} word={w} index={index} />)}
        </div>
        <span className="sm-shade" />
      </div>
      <i className="sm-cap" />
    </div>
  )
})

function Confetti({ burst }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        dx: (Math.random() - 0.5) * 120,
        dy: -20 - Math.random() * 60,
        rot: Math.random() * 900 - 450,
        delay: Math.random() * 0.15,
        dur: 1.4 + Math.random() * 1.2,
        color: [ '#ff6b00', '#ffb347', '#fff1d6', '#ff3d00', '#ffd166' ][i % 5],
        w: 0.8 + Math.random() * 0.9,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burst],
  )
  if (!burst) return null
  return (
    <div className="sm-confetti" key={burst} aria-hidden="true">
      {bits.map((b, i) => (
        <i
          key={i}
          style={{
            '--dx': `${b.dx}cqw`,
            '--dy': `${b.dy}cqw`,
            '--rot': `${b.rot}deg`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            background: b.color,
            width: `${b.w}cqw`,
            height: `${b.w * 0.5}cqw`,
          }}
        />
      ))}
    </div>
  )
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduce(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

export default function SlotMachine() {
  const reduce = usePrefersReducedMotion()
  const reels = [ useRef(null), useRef(null), useRef(null) ]
  const tiltEl = useRef(null)
  const stage = useRef(null)
  const leverBox = useRef(null)

  const [phase, setPhase] = useState(-1)
  const [busy, setBusy] = useState(false)
  const [autoDone, setAutoDone] = useState(false)
  const [touched, setTouched] = useState(false)
  const [burst, setBurst] = useState(0)
  const [jackpot, setJackpot] = useState(false)
  const [pull, setPull] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [pressed, setPressed] = useState(false)

  const busyRef = useRef(false)
  const phaseRef = useRef(-1)
  const manualRef = useRef(false)
  const pullsRef = useRef(0)
  const drag = useRef(null)

  const initial = useMemo(() => JACKPOT, [])

  const spin = useCallback(async (words, nextPhase, isJackpot) => {
    if (busyRef.current) return false
    busyRef.current = true
    setBusy(true)
    setJackpot(false)
    sfx.whirr(1500 + 2 * 520)
    await Promise.all(reels.map((r, i) => r.current.spinTo(words[i])))
    busyRef.current = false
    setBusy(false)
    phaseRef.current = nextPhase
    setPhase(isJackpot ? 99 : nextPhase)
    if (isJackpot) {
      setJackpot(true)
      setBurst((b) => b + 1)
      sfx.chime()
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nudgeLever = useCallback(() => {
    setPull(1)
    sfx.lever()
    setTimeout(() => setPull(0), 220)
  }, [])

  const manualSpin = useCallback(() => {
    if (busyRef.current) return
    manualRef.current = true
    setTouched(true)
    pullsRef.current += 1
    if (pullsRef.current % JACKPOT_EVERY === 0) {
      spin(JACKPOT, phaseRef.current, true)
    } else {
      const next = (phaseRef.current + 1) % PHASES.length
      spin(PHASES[next], next, false)
    }
  }, [spin])

  const trigger = useCallback(() => {
    if (busyRef.current) return
    nudgeLever()
    manualSpin()
  }, [nudgeLever, manualSpin])

  // intro: spin to name, then each role, then hand control to the visitor
  useEffect(() => {
    let cancelled = false
    const timers = []
    const sleep = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)))
    ;(async () => {
      await sleep(900)
      if (cancelled || manualRef.current) return
      nudgeLever()
      await spin(PHASES[0], 0, false)
      for (const next of [ 1, 2 ]) {
        await sleep(2600)
        if (cancelled || manualRef.current) return
        nudgeLever()
        await spin(PHASES[next], next, false)
      }
      if (!cancelled) setAutoDone(true)
    })()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [spin, nudgeLever])

  // mouse-follow tilt (mouse only, off for reduced motion)
  useEffect(() => {
    const host = stage.current
    const el = tiltEl.current
    if (!host || !el || reduce) return
    let raf = 0
    const move = (e) => {
      if (e.pointerType !== 'mouse') return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect()
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2
        const ny = ((e.clientY - r.top) / r.height - 0.5) * 2
        el.style.setProperty('--rx', `${(-ny * 4).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${(nx * 6).toFixed(2)}deg`)
      })
    }
    const leave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
    }
  }, [reduce])

  // lever drag
  const onLeverDown = (e) => {
    if (busyRef.current) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { y: e.clientY, moved: false }
    setDragging(true)
  }
  const onLeverMove = (e) => {
    if (!drag.current) return
    const travel = (leverBox.current?.offsetWidth || 90) * 1.35
    const dy = e.clientY - drag.current.y
    if (dy > 6) drag.current.moved = true
    setPull(Math.max(0, Math.min(1, dy / travel)))
  }
  const onLeverUp = () => {
    if (!drag.current) return
    const { moved } = drag.current
    drag.current = null
    setDragging(false)
    if (!moved) {
      trigger()
      return
    }
    const fired = pull > 0.55
    setPull(0)
    if (fired && !busyRef.current) {
      sfx.lever()
      manualSpin()
    }
  }
  const onLeverKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      trigger()
    }
  }

  const onKnob = () => {
    setPressed(true)
    setTimeout(() => setPressed(false), 160)
    trigger()
  }

  const scrollDown = () => document.getElementById('intro')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  const label = jackpot ? 'Jackpot!' : phase >= 0 && phase < LABELS.length ? LABELS[phase] : 'Pull to spin'
  const live = phase >= 0 && phase < PHASES.length ? `${LABELS[phase]} ${PHASES[phase].filter((w) => w !== SPARK).join(' ')}` : ''

  return (
    <section className={`slot-hero${jackpot ? ' is-jackpot' : ''}${busy ? ' is-busy' : ''}`} ref={stage}>
      <h1 className="sr-only">Bhavika Kumar, AI Generalist and AI Design Curator</h1>
      <p className="sr-only" aria-live="polite">{live}</p>

      <div className="sm">
        <div className="sm-tilt" ref={tiltEl}>
          <div
            className={`sm-lever${dragging ? ' is-dragging' : ''}`}
            ref={leverBox}
            style={{ '--pull': pull }}
            role="button"
            tabIndex={0}
            aria-label="Pull the lever to spin"
            onPointerDown={onLeverDown}
            onPointerMove={onLeverMove}
            onPointerUp={onLeverUp}
            onPointerCancel={onLeverUp}
            onKeyDown={onLeverKey}
          >
            <span className="sm-stem"><span className="sm-ball" /></span>
            <span className="sm-plate" />
            {autoDone && !touched && <span className="sm-hint" aria-hidden="true">Pull me ↓</span>}
          </div>

          <div className="sm-body">
            <i className="sm-ear left" />
            <i className="sm-ear right" />

            <div className="sm-top">
              <span className="sm-vents" />
              <div className="sm-marquee">
                <i className="sm-dot" />
                <span key={label} className="sm-marquee-text">{label}</span>
              </div>
              <span className="sm-vents" />
            </div>

            <div className="sm-window" onClick={trigger}>
              {reels.map((r, i) => (
                <Reel key={i} ref={r} index={i} initial={initial[i]} reduce={reduce} onStop={sfx.stop.bind(sfx)} />
              ))}
            </div>

            <div className="sm-deck">
              <div className="sm-label" aria-hidden="true">{jackpot ? 'JACKPOT!' : '1 OF 1'}</div>
              <button className={`sm-knob${pressed ? ' is-pressed' : ''}`} onClick={onKnob} aria-label="Spin the reels">
                <span />
              </button>
            </div>

            <div className="sm-tray">
              <Link to="/contact" className={`sm-cta${jackpot ? ' is-out' : ''}`} tabIndex={jackpot ? 0 : -1}>
                Let’s work together <b>→</b>
              </Link>
            </div>
          </div>

          <i className="sm-floor" />
          <Confetti burst={burst} />
        </div>
      </div>

      <button className="sm-scroll" onClick={scrollDown} aria-label="Scroll to read more">
        <span>Scroll</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </section>
  )
}
