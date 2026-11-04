// Tiny Web Audio engine. Everything is OFF until the visitor opts in.
let ctx = null
let enabled = false
const subs = new Set()

const get = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export const isSoundOn = () => enabled
export const onSoundChange = (fn) => (subs.add(fn), () => subs.delete(fn))
export const setSound = (on) => {
  enabled = on
  try { localStorage.setItem('sound', on ? '1' : '0') } catch {}
  subs.forEach((f) => f(on))
  if (on) tick(880, 0.05)
}
try { enabled = localStorage.getItem('sound') === '1' } catch {}

// soft UI tick
export function tick(freq = 660, vol = 0.03, dur = 0.06) {
  if (!enabled) return
  const c = get()
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(freq, c.currentTime)
  o.frequency.exponentialRampToValueAtTime(freq * 0.7, c.currentTime + dur)
  g.gain.setValueAtTime(vol, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur)
  o.connect(g).connect(c.destination)
  o.start()
  o.stop(c.currentTime + dur)
}

export const hoverTick = () => tick(520, 0.015, 0.04)
export const clickTick = () => tick(760, 0.035, 0.08)

// Karplus-Strong plucked string, lightly overdriven → "electric guitar"-ish.
// Works even when UI sound is off, because it's an explicit user action.
export function pluck(freq = 196, { dur = 1.4, vol = 0.35, drive = 3 } = {}) {
  const c = get()
  const sr = c.sampleRate
  const n = Math.floor(sr / freq)
  const len = Math.floor(sr * dur)
  const buf = c.createBuffer(1, len, sr)
  const d = buf.getChannelData(0)
  const ring = new Float32Array(n)
  for (let i = 0; i < n; i++) ring[i] = Math.random() * 2 - 1
  let p = 0
  for (let i = 0; i < len; i++) {
    const next = (p + 1) % n
    d[i] = ring[p]
    ring[p] = (ring[p] + ring[next]) * 0.4985
    p = next
  }
  const src = c.createBufferSource()
  src.buffer = buf
  const shaper = c.createWaveShaper()
  const curve = new Float32Array(1024)
  for (let i = 0; i < 1024; i++) {
    const x = (i / 1023) * 2 - 1
    curve[i] = Math.tanh(x * drive)
  }
  shaper.curve = curve
  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 3200
  const g = c.createGain()
  g.gain.value = vol
  src.connect(shaper).connect(lp).connect(g).connect(c.destination)
  src.start()
}

// Pentatonic-ish scale mapped to keys
const NOTES = { a: 110, s: 123.47, d: 146.83, f: 164.81, g: 196, h: 220, j: 246.94, k: 293.66, l: 329.63 }
export const noteForKey = (k) => NOTES[k.toLowerCase()]
export function riff() {
  const seq = [196, 246.94, 293.66, 392, 293.66, 246.94, 329.63, 196]
  seq.forEach((f, i) => setTimeout(() => pluck(f, { dur: 1.1, vol: 0.28 }), i * 170))
}
