import { useEffect, useRef, useState } from 'react'

const ChevL = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
)
const ChevR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
)
const SoundOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M23 9l-6 6M17 9l6 6" /></svg>
)
const SoundOn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14" /></svg>
)

export default function VideoCarousel({ videos }) {
  const n = videos.length
  const [active, setActive] = useState(0)
  const [muted, setMuted] = useState(true)
  const refs = useRef([])

  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.muted = muted
        v.play().catch(() => {})
      } else {
        v.muted = true
        v.pause()
      }
    })
  }, [active, muted])

  const go = (d) => setActive((a) => (a + d + n) % n)

  return (
    <div className="vc">
      <div className="vc-stage">
        {videos.map((src, i) => {
          let d = i - active
          if (d > n / 2) d -= n
          if (d < -n / 2) d += n
          const a = Math.abs(d)
          const style = {
            transform: `translate3d(${74 * d}px, 0, ${-91 * a}px) rotateY(${-18 * d}deg) scale(0.92)`,
            opacity: d === 0 ? 1 : Math.max(0, 1 - 0.18 * a),
            filter: `blur(${d === 0 ? 0 : 10}px)`,
            zIndex: 10 - a,
            pointerEvents: d === 0 ? 'auto' : 'none',
          }
          if (d === 0) style.transform = 'translate3d(0,0,0) rotateY(0deg) scale(1)'
          return (
            <div key={src} className="vc-item" style={style}>
              <video
                ref={(el) => (refs.current[i] = el)}
                src={src}
                loop
                muted
                playsInline
                preload={a <= 1 ? 'auto' : 'metadata'}
              />
              {d === 0 && (
                <button className="vc-sound" aria-label={muted ? 'Unmute video' : 'Mute video'} onClick={() => setMuted((m) => !m)}>
                  {muted ? <SoundOff /> : <SoundOn />}
                </button>
              )}
            </div>
          )
        })}
      </div>
      <button className="vc-arrow vc-prev" aria-label="Previous" onClick={() => go(-1)}><ChevL /></button>
      <button className="vc-arrow vc-next" aria-label="Next" onClick={() => go(1)}><ChevR /></button>
      <div className="vc-dots">
        <div>
          {videos.map((_, i) => (
            <button key={i} aria-label={`Go to video ${i + 1}`} className={i === active ? 'on' : ''} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </div>
  )
}
