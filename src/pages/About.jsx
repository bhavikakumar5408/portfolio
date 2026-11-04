import { useEffect } from 'react'
import { noteForKey, pluck, riff } from '../lib/sound.js'

export default function About() {
  // Guitar easter egg: press A–L anywhere on this page.
  useEffect(() => {
    const down = (e) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      if (/input|textarea/i.test(e.target.tagName)) return
      const f = noteForKey(e.key)
      if (f) pluck(f)
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [])

  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="t-h1 t-h1-sub">About me</h1>
        <div className="hero-copy t-lg">
          <p>Hi, I'm Bhavika an <span className="accent">AI Generalist</span> based in Bengaluru.</p>
          <p>
            I studied <span className="accent">Fashion Communication at NIFT</span> and specialized in{' '}
            <span className="accent">UI/UX design</span> there, which is where this all actually started. I'm currently at{' '}
            <span className="accent">POP (by Razorpay) as an AI Design Curator,</span> building AI avatars, the strange, fun part of
            the job is watching people not realize they're talking to one. I've seen the DMs. People genuinely don't believe it.
          </p>
          <p>
            I go deep into things. Not a little curious, all the way in, until I understand how something actually works, not just
            what it looks like. I don't really do "good enough." If I'm in something, I want to be good at it, properly.
          </p>
          <p>
            Outside work, that shows up in odd places. I play{' '}
            <button type="button" className="guitar" onClick={riff} title="Psst — try pressing A to L on your keyboard">
              electric guitar.
            </button>{' '}
            I roller skate.(Im a national level skater, represented Uttar Pradesh). I also read a lot, more than most people I know.
            None of it is related to design, and I like that it isn't.
          </p>
        </div>
        <div className="about-photo"><img src="/media/YxwYgg33Zzb4A3qnJE1tZ4KHGU.jpeg" alt="" /></div>
      </div>
    </section>
  )
}
