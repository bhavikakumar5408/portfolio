import { useState } from 'react'

const EMAIL = 'bhavikakumar5408@gmail.com'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Message from ${f.get('name')}`)
    const body = encodeURIComponent(`${f.get('message')}\n\n${f.get('name')} (${f.get('email')})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="contact-head">
          <h1 className="t-h1 t-h1-sub">Get in touch</h1>
          <div className="hero-copy t-lg">
            <p>Contact : +91 8826225631</p>
            <p>Prefer email? Reach me directly at <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
          </div>
        </div>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-row">
            <label className="field">
              <span className="t-lg">Name</span>
              <div className="input-wrap"><input name="name" type="text" placeholder="Your name" required /></div>
            </label>
            <label className="field">
              <span className="t-lg">Email</span>
              <div className="input-wrap"><input name="email" type="email" placeholder="name@email.com" required /></div>
            </label>
          </div>
          <label className="field">
            <span className="t-lg">Message</span>
            <div className="input-wrap area"><textarea name="message" placeholder="Tell me about your project or idea…" required /></div>
          </label>
          <button type="submit" className="send t-lg">{sent ? 'Message Ready' : 'Send Message'}</button>
        </form>
      </div>
    </section>
  )
}
