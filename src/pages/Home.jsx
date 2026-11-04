import Projects from '../components/Projects.jsx'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-head">
            <h1 className="t-h1">Bhavika Kumar</h1>
            <div className="hero-meta t-lg">
              <strong>AI Generalist</strong>
              <strong>📍 Bengluru</strong>
            </div>
          </div>
          <div className="hero-copy t-lg">
            <p>Hi, I'm Bhavika an <span className="accent">AI Generalist based in Bengaluru.</span></p>
            <p>
              I'm currently at <span className="accent">POP (by Razorpay) as an AI Design Curator</span>, building AI avatars.
              The strange, fun part of the job is watching people not realize they're talking to one. I've seen the DMs.
              People genuinely don't believe it.
            </p>
            <p>I specialized in <span className="accent">Product design from NIFT,</span> which is where this all actually started.</p>
          </div>
        </div>
      </section>
      <Projects />
    </>
  )
}
