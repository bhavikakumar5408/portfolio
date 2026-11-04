import { useEffect, useState } from 'react'
import { isSoundOn, onSoundChange, setSound } from '../../lib/sound.js'

export default function SoundToggle() {
  const [on, setOn] = useState(isSoundOn())
  useEffect(() => onSoundChange(setOn), [])
  return (
    <button className="sound-toggle" aria-pressed={on} aria-label={on ? 'Turn sound off' : 'Turn sound on'} onClick={() => setSound(!on)}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {on ? <path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14" /> : <path d="M22 9l-6 6M16 9l6 6" />}
      </svg>
    </button>
  )
}
