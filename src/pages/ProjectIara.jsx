import { Link } from 'react-router-dom'
import ProjectHeader from '../components/ProjectHeader.jsx'
import ScrollProgress from '../components/fx/ScrollProgress.jsx'
import VideoCarousel from '../components/iara/VideoCarousel.jsx'
import Marquee from '../components/iara/Marquee.jsx'
import Flipbook from '../components/iara/Flipbook.jsx'
import PhoneStack from '../components/iara/PhoneStack.jsx'
import DMToasts from '../components/iara/DMToasts.jsx'
// import IsThisReal from '../components/iara/IsThisReal.jsx' // TODO: re-enable once real/AI assets are finalised

const m = (f) => `/media/${f}`

const videos = [
  'NCjHe78pr0AmJk2L6sDLjDdvGpc.mp4',
  'WcLRJ6bZZvvaaPxn8Kl35HI9aOI.mp4',
  'mrF4mGbQooqmPsXGFLi2CCLbchg.mp4',
  'nN9uvFnY8pViNrZQAEu7tYQdguU.mp4',
  'cufIgQyXW0sp7AuKAgkiiReEng0.mp4',
  'bZCo8Yp3nST4hjrAh4WlnGNQv9g.mp4',
  'Bnok2JNft7JIvMmjSnTRGJg2nuw.mp4',
].map(m)

const rows = [
  ['rAndtlmrDGVzE5j4u7A9A3jOVo.png', 'd8uA9UjX4PafcuG6Ym9TXMkVSVw.png', 'XCPrIM41RTj0B1KdBi16FtaM.png', 'TQCKlJJPcePdFCYFjks6qXzi35U.png', '4K0GUNso9TZIUyj8FsGjjxtPqg.png', 'nvdbZFyOyt64gIb2FVr8G70QbK8.png', 'bztkrpbSJDLzc8WJLAnHUi5K9R0.png'].map(m),
  ['riS7LXYLbQ0auhTvXv3zcMjKdc0.png', 'TIltDPtmnu227bcIHb7RPNHM.png', 'YWrPIfzWT26ZwJtbHc1ESd26vlk.png', 'WRaEw85AwdZPhh2IMzOc30f59iw.png', 'QxSJyXYIltHUCuBUOslb7GWUdk.webp', 'xq522YayEHQEKxCXCzyhcNGtU.png', 'IMmHgWWA6DXpmRrSWqirqXs4eg.png'].map(m),
]

const spreads = [
  ['IpCGrjoIPE3lDCbmNjvYfgzqdEQ.jpg'],
  ['g2AHvSFaoe7eT3gktRSU4oRF5jI.jpg'],
  ['eBpN6sRCrR3LC6z7pAeTcgy9qlI.jpg', 'BXUSt8ahe2STUbkFtwhoZD9vNG8.jpg'],
  ['mYN2uZpaiwZrQaoekyWE1AlXk.jpg', '9lUC5nmekbAN08K9EJk5daYY.jpg'],
  ['NRwsV57QefLjEWUAW0ttxcLzNqM.jpg'],
  ['WtzySyTZHXsaSKpQM8qb0X3Tg.jpg'],
].map((s) => s.map(m))

const chats = [
  'Op0k82M6IIEUd8rPxMtVSOusaXc.png', 'cfRVVTpYdfmurqPszLwFcuuzlQ.png', 'hKKNnKA9M9bORLTEONcY35Y.png', 'N1szTsrgYaI3jvXnOqM8TXnN6M.png',
  'uJD7mIF7WpMOufT56CMO4sDp8.png', 'PaT47F62PYB4Epk6rGAjQSUiD4.png', 'ktIJyJlcXJOahpZK51PmbYI1vOw.png', 'nApZYeNWs36QfXOd3GxROMRI0Ag.png',
].map(m)

export default function ProjectIara() {
  return (
    <section className="cs cs-iara">
      <ScrollProgress />
      <DMToasts />
      <div className="cs-inner">
        <div className="cs-top">
          <ProjectHeader title="My Coworker Isn't Real" slug="my-coworker-isn-t-real" year="2026" />
          <div className="cs-hero"><img src="/media/31TfImjJID5mJMhWMT68RDHpGmo.jpg" alt="" /></div>
        </div>

        <div className="rt iara-who">
          <h2>Who is Iara ?</h2>
          <h5>21. Tennis player. Psychology student.</h5>
          <p>
            Iara is 21 and lives in Delhi. She studies psychology at Miranda House, plays tennis at a national level, and wakes up at
            6 a.m. by choice (yes, really). Her tote has seen more libraries than brunches, her matcha is always iced.
          </p>
        </div>

        <div className="iara-stack">
          <VideoCarousel videos={videos} />

          <div className="iara-sec" style={{ marginTop: 0 }}>
            <h2 className="t-h2">Why does POP need Iara?</h2>
            <p className="t-lg">
              Because a shop needs a face, and ads are easy to scroll past. Iara is the face of <strong>PopShop</strong>, and she
              doesn’t sell like an ad. She recommends like a friend: “okay, I need to tell you about this.” And she never ages, never
              gets cancelled, and never shows up late.
            </p>
          </div>

          <div className="iara-sec" style={{ marginTop: 45 }}>
            <h2 className="t-h2">Take a closer look…</h2>
          </div>
          <Marquee rows={rows} />

          <div className="iara-sec" style={{ marginTop: 35 }}>
            <h2 className="t-h2">Iara's Big Win!!</h2>
            <p className="t-lg">Featured in <em>Shoes &amp; Accessories</em>, October 2026 edition.</p>
            <p className="t-lg">
              Four pages. One headline: <em>India’s Newest It Girl Doesn’t Exist.</em> Not bad for someone who’s never been to a meeting.
            </p>
          </div>
          <Flipbook spreads={spreads} />

          <div className="iara-sec" style={{ marginTop: 34 }}>
            <h2 className="t-h2">People think she’s real</h2>
            <p className="t-lg">
              She’s labelled as AI. People DM her anyway. “Hey girl, where’s that top from?” Scroll to see people treat Iara like their
              new friend.
            </p>
          </div>
          <div className="ps-wrap">
            <p className="t-lg ps-tap">Tap👆🏻</p>
            <PhoneStack images={chats} />
          </div>

          {/* <IsThisReal />  — enable once /src/data/isThisReal.js has the real/AI assets */}

          <div className="iara-sec" style={{ marginTop: 158 }}>
            <h2 className="t-h2">Why it’s worth it</h2>
            <p className="t-lg">
              For POP, Iara is a face that never ages, never gets cancelled, and never shows up late. Every product is shown exactly
              how the brand wants it, and she still doesn’t sound like an ad. People trust her picks because she recommends like a
              friend, and she’s openly labelled as AI, so nobody feels tricked.
            </p>
          </div>

          <div className="iara-sec" style={{ marginTop: 50 }}>
            <h2 className="t-h2">What’s next</h2>
            <p className="t-lg">
              Virtual influencers aren’t new, but most of them are mannequins: polished, forgettable. Iara works because{' '}
              <em>feeling</em> true beats <em>being</em> true. The next wave of AI influencers will win on personality, not pixels, and
              Iara is already a step ahead.
            </p>
          </div>

          <div className="iara-sec" style={{ marginTop: 50 }}>
            <h2 className="t-h2">So, what can I do for you?</h2>
            <p className="t-lg">
              If I can make strangers DM a girl who doesn’t exist, imagine what I can do for your brand. AI creative direction.
              Characters with real personalities. Visual worlds that stay consistent. Content that feels human, not generated.
            </p>
            <p className="t-lg">Got a brand that needs a face (or a vibe)? Let’s make something that doesn’t exist yet.</p>
          </div>

          <div className="iara-next">
            <Link to="/work/afreen-fashion-magazine" className="t-lg nav-link">AFREEN Fashion Magazine ›</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
