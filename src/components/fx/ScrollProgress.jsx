import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`
    }
    f()
    window.addEventListener('scroll', f, { passive: true })
    window.addEventListener('resize', f)
    return () => {
      window.removeEventListener('scroll', f)
      window.removeEventListener('resize', f)
    }
  }, [])
  return <div className="progress"><i ref={bar} /></div>
}
