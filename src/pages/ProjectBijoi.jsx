import { useMemo } from 'react'
import ProjectHeader from '../components/ProjectHeader.jsx'
import ScrollProgress from '../components/fx/ScrollProgress.jsx'
import MagazineFlipbook from '../components/MagazineFlipbook.jsx'
import './ProjectAfreen.css'
import './ProjectBijoi.css'

const SLUG = 'rangat-e-ajrakh-bijoi-catalogue'
const TOTAL = 38
const src = (n) => `/bijoi/p${String(n).padStart(2, '0')}.webp`

const roles = [
  ['Photography', 'Shot the Kavya collection: dupattas and stoles worn, draped and held, so the block print reads at a glance.'],
  ['Photo editing', 'Colour and retouching across the set, keeping the warm, peach-toned look consistent from frame to frame.'],
  ['Shoot direction & styling', 'Directed the poses, props and palette on set, from rose petals to a red clutch that echoes the print.'],
  ['Content', 'Wrote the collection and product copy, covering fabric, dimensions and the feel of each piece.'],
  ['Cover design', 'Designed the Rangat-e-Ajrakh cover from the catalogue\'s own brown, gold and star-lattice motif.'],
]

const process = [
  ['01', 'The collection', 'Kavya: handblocked Ajrakh stoles and dupattas in Modal silk and Mashru silk, in reds, blues and earthy browns.'],
  ['02', 'The shoot', 'A warm, peach studio backdrop with red as the through-line, so each print stands out against skin and cloth.'],
  ['03', 'Edit & write', 'Colour-matched edits and short, tactile product copy for every piece.'],
  ['04', 'The catalogue', 'A 38-page book: about, craft, collection, product pages, and a cover I designed to open it.'],
]

const gallery = [
  { n: 10, cap: 'Kavya collection' },
  { n: 12, cap: 'Modal silk dupatta' },
  { n: 14, cap: 'Kavya collection' },
  { n: 16, cap: 'Modal silk stole' },
  { n: 18, cap: 'Modal silk stole' },
  { n: 26, cap: 'Kavya collection' },
  { n: 28, cap: 'Kavya collection' },
  { n: 30, cap: 'Mashru silk stole' },
  { n: 34, cap: 'Mashru silk stole' },
]

const spreads = [
  { l: 6, r: 7, cap: 'About Bijoi', note: 'A photo mosaic holds the brand story in a small block of text.' },
  { l: 8, r: 9, cap: 'The craft of Ajrakh', note: 'Fabric close-ups run edge to edge with the text set on the print.' },
  { l: 12, r: 13, cap: 'Product page', note: 'A full-bleed portrait facing a quiet page of specs and a small motif.' },
  { l: 24, r: 25, cap: 'Collection', note: 'One hero image beside two details, with price and fabric aligned right.' },
]

export default function ProjectBijoi() {
  const pages = useMemo(() => Array.from({ length: TOTAL }, (_, i) => src(i + 1)), [])
  return (
    <div className="afr bjo">
      <ScrollProgress />
      <div className="afr-inner">
        <ProjectHeader title="Rangat-e-Ajrakh" slug={SLUG} year="2024" />

        <header className="afr-hero">
          <img className="afr-cover" src={src(1)} alt="Rangat-e-Ajrakh catalogue cover" />
          <div className="afr-hero-text">
            <p className="afr-dek">A 38-page catalogue for Bijoi's Kavya collection: handblocked Ajrakh, shot, edited and written.</p>
            <dl className="afr-meta">
              <div><dt>Brand</dt><dd>Bijoi · Handloom and Handicraft</dd></div>
              <div><dt>Collection</dt><dd>Kavya · Ajrakh in Modal silk and Mashru silk</dd></div>
              <div><dt>Year</dt><dd>2024 · NIFT</dd></div>
              <div><dt>Role</dt><dd>Photography, editing, shoot direction, content, cover</dd></div>
            </dl>
            <a href="#issue" className="afr-cta">Flip through the catalogue ↓</a>
          </div>
        </header>

        <section className="afr-sec">
          <p className="afr-kicker">01 · Overview</p>
          <div className="afr-two">
            <h2 className="afr-h">A catalogue that sells the craft, and the cloth.</h2>
            <div className="afr-copy">
              <p>Bijoi connects rural artisans with urban customers. For its Kavya collection I shot the photographs, edited them, wrote the copy and directed the styling, then gave the catalogue a cover.</p>
              <p>The photographs did not stay in a PDF: they are now used on Bijoi's own website.</p>
            </div>
          </div>
          <ul className="afr-stats">
            <li><b>38</b><span>pages</span></li>
            <li><b>2</b><span>fabrics: Modal silk and Mashru silk</span></li>
            <li><b>Live</b><span>photos used on bijoi.in</span></li>
          </ul>
        </section>

        <section className="afr-sec">
          <p className="afr-kicker">02 · Concept</p>
          <blockquote className="afr-quote">Red, gold and brown: the colours of Ajrakh.</blockquote>
          <div className="afr-copy afr-narrow">
            <p>Ajrakh is a block-printing craft from Kutch in Gujarat and Sindh, known for geometric patterns and rich, natural dyes. The catalogue lets that print lead.</p>
            <p>The photography, backdrop and props are kept warm and simple, so the weave and the block print are the only things asking for attention.</p>
          </div>
        </section>

        <section className="afr-sec">
          <p className="afr-kicker">03 · Role</p>
          <h2 className="afr-h">What I did</h2>
          <ul className="afr-roles">
            {roles.map(([t, d]) => (
              <li key={t}><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ul>
        </section>

        <section className="afr-sec">
          <p className="afr-kicker">04 · Process</p>
          <h2 className="afr-h">From collection to catalogue</h2>
          <ol className="afr-steps bj-steps">
            {process.map(([n, t, d]) => (
              <li key={n}><span className="afr-n">{n}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </section>
      </div>

      <section className="afr-sec afr-wide">
        <div className="afr-inner">
          <p className="afr-kicker">05 · The shoot</p>
          <h2 className="afr-h">Photography for Kavya</h2>
          <p className="afr-copy afr-narrow">Portraits, close-ups and quiet details. Every frame is built around the drape of a dupatta or stole and one colour, red, running through the set.</p>
        </div>
        <div className="bj-shoots">
          {gallery.map((g, i) => (
            <figure key={g.n} className={`bj-shoot i${i}`}>
              <img src={src(g.n)} alt={`${g.cap}, catalogue page ${g.n}`} loading="lazy" />
              <figcaption><b>{g.cap}</b><span>p.{String(g.n).padStart(2, '0')}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="afr-sec afr-wide afr-issue" id="issue">
        <div className="afr-inner">
          <p className="afr-kicker">06 · Read the catalogue</p>
          <h2 className="afr-h">Flip through Rangat-e-Ajrakh</h2>
          <p className="afr-copy afr-narrow">All 38 pages. Drag or swipe the corner of a page, or tap the arrows. Turn the page-turn sound on if you like.</p>
        </div>
        <div className="afr-book">
          <MagazineFlipbook pages={pages} label="Rangat-e-Ajrakh catalogue" pageW={1000} pageH={1414} />
        </div>
      </section>

      <div className="afr-inner">
        <section className="afr-sec">
          <p className="afr-kicker">07 · Cover & pages</p>
          <h2 className="afr-h">A cover for the catalogue</h2>
          <div className="bj-cover">
            <img src={src(1)} alt="Rangat-e-Ajrakh cover" loading="lazy" />
            <div className="afr-copy">
              <p>The catalogue had no cover, so I designed one. It keeps to the book's own palette: deep brown, a gold-tan star lattice lifted from the opening page, and a high-contrast serif title with generous spacing.</p>
              <p>Title, one motif, a thin double frame. Nothing else, so the name and the print carry it.</p>
            </div>
          </div>
          <div className="afr-spreads bj-spreads">
            {spreads.map((s) => (
              <figure key={s.l} className="afr-spread">
                <div className="afr-pair">
                  <img src={src(s.l)} alt="" loading="lazy" />
                  <img src={src(s.r)} alt="" loading="lazy" />
                </div>
                <figcaption><b>{s.cap}</b><span>{s.note} · pp.{s.l}–{s.r}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="afr-sec">
          <p className="afr-kicker">08 · In the wild</p>
          <h2 className="afr-h">Now on Bijoi's website</h2>
          <div className="afr-copy afr-narrow">
            <p>Our catalogue photographs are used on Bijoi's official website, across its product pages. Below, the Ajrakh dupattas collection on bijoi.in.</p>
          </div>
          <figure className="bj-web">
            <img src="/bijoi/website.webp" alt="Bijoi website, Ajrakh dupattas collection page, showing photographs from the catalogue shoot" loading="lazy" />
            <figcaption><a href="https://bijoi.in/collections/ajrakh-dupattas" target="_blank" rel="noreferrer">bijoi.in/collections/ajrakh-dupattas ↗</a></figcaption>
          </figure>
        </section>

        <section className="afr-sec afr-last">
          <p className="afr-kicker">09 · Outcome</p>
          <div className="afr-two">
            <h2 className="afr-h">Catalogue work that went live.</h2>
            <div className="afr-copy">
              <p>A finished 38-page catalogue, a cover that opens it, and photographs that a real handloom brand uses to sell on its own site.</p>
              <p>Alongside AFREEN, it is proof I have been making catalogues, magazines and fashion shoots since college.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
