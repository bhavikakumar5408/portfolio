import { useEffect, useRef, useState } from 'react'

const MSGS = [
  'Hey girl, where’s that top from?',
  'omg that matcha 😭 where??',
  'wait… are you actually real? 👀',
  'need that tote. link pls',
  'okay who is your stylist',
  'you looked so happy in the last pic',
]

// "DMs" slide in as the visitor scrolls the Iara case study.
export default function DMToasts() {
  const [toast, setToast] = useState(null)
  const shown = useRef(0)
  const timer = useRef(null)

  useEffect(() => {
    const check = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      const p = h > 0 ? scrollY / h : 0
      const next = shown.current
      if (next < MSGS.length && p > 0.1 + next * 0.15) {
        shown.current = next + 1
        setToast({ id: next, text: MSGS[next] })
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setToast(null), 4200)
      }
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => {
      window.removeEventListener('scroll', check)
      clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className="dm-wrap" aria-live="polite">
      {toast && (
        <div className="dm" key={toast.id}>
          <img src="/media/31TfImjJID5mJMhWMT68RDHpGmo.jpg" alt="" />
          <div>
            <b>iara.pop <i>AI</i></b>
            <p>{toast.text}</p>
          </div>
          <span className="dm-dot" />
        </div>
      )}
    </div>
  )
}
