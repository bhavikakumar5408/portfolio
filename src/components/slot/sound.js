import { isSoundOn } from '../../lib/sound.js'

// Tiny WebAudio synth for the slot machine. No audio files; muted until the visitor opts in.
let ctx = null

function audio() {
  if (!ctx) {
    const Ctor = window.AudioContext || window.webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function blip({ type = 'square', from, to, dur = 0.08, gain = 0.05, delay = 0 }) {
  const c = audio()
  if (!c) return
  const t = c.currentTime + delay
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(from, t)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(g).connect(c.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

export const sfx = {
  // follows the site-wide sound toggle (off until the visitor opts in)
  get enabled() {
    return isSoundOn()
  },

  lever() {
    if (!this.enabled) return
    blip({ type: 'triangle', from: 180, to: 60, dur: 0.18, gain: 0.12 })
  },

  // rolling reels: a ratchet of quick ticks that slows down
  whirr(totalMs) {
    if (!this.enabled) return
    let t = 0
    let gap = 45
    while (t < totalMs) {
      blip({ type: 'square', from: 520, to: 380, dur: 0.03, gain: 0.018, delay: t / 1000 })
      t += gap
      gap *= 1.045
    }
  },

  stop(i = 0) {
    if (!this.enabled) return
    blip({ type: 'square', from: 300 + i * 70, to: 120, dur: 0.1, gain: 0.07 })
  },

  chime() {
    if (!this.enabled) return
    ;[784, 988, 1175, 1568, 1976].forEach((f, i) =>
      blip({ type: 'sine', from: f, dur: 0.5, gain: 0.07, delay: i * 0.09 }),
    )
  },
}
