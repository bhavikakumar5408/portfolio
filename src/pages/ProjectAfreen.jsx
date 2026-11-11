import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import ProjectHeader from '../components/ProjectHeader.jsx'
import ScrollProgress from '../components/fx/ScrollProgress.jsx'
import MagazineFlipbook from '../components/MagazineFlipbook.jsx'
import './ProjectAfreen.css'

const SLUG = 'afreen-fashion-magazine'
const TOTAL = 64
const src = (n) => `/afreen/p${String(n).padStart(2, '0')}.webp`

const roles = [
  ['Concept & moodboards', 'Set the visual direction for an issue built around Indian crafts and handloom, from references to the look of each story.'],
  ['Styling', 'Pulled together looks that let the weave, print and embroidery lead.'],
  ['Art direction on set', 'Directed framing, poses and locations so every shoot read as part of one issue.'],
  ['Hands-on on shoot days', 'Pitched in across photography, makeup and modelling wherever the shoot needed it.'],
  ['Layout & page design', 'Designed spreads: type, grids, image crops and the pacing of the issue.'],
  ['Writing', 'Wrote the Kantha and Bandhani features.'],
  ['Cover & contents', 'Shaped how the issue opens, from masthead and cover to the contents page.'],
]

const process = [
  ['01', 'Concept', 'Indian crafts and handloom as the thread. Moodboards and a story list that covers folk art, brands, interviews, accessories and lifestyle.'],
  ['02', 'Shoots', 'Fashion shoots built around each craft: Maheshwari, Bandhani, block print, Kundan and more.'],
  ['03', 'Writing', 'Features on craft history and the people keeping it alive, including Kantha and Bandhani.'],
  ['04', 'Layout', 'Typesetting and page design in Adobe tools: an image-led rhythm broken by text-heavy reading pages.'],
  ['05', 'The issue', 'A finished 64-page magazine, Volume 01, Issue 1, December 2023.'],
]

const shoots = [
  { n: 1, cap: 'Cover story', note: 'Bindi’s essence' },
  { n: 3, cap: 'Jewellery campaign opener', note: 'Tanishq × Tarun Tahiliani' },
  { n: 9, cap: 'Maheshwari saree', note: 'Tapestry of tradition' },
  { n: 12, cap: 'Maheshwari saree', note: 'Handloom on location' },
  { n: 14, cap: 'Bandhani', note: 'Threads woven into elegance' },
  { n: 15, cap: 'Bandhani', note: 'Portrait' },
  { n: 24, cap: 'Farak streetwear', note: 'Craft meets street' },
  { n: 25, cap: 'Farak streetwear', note: 'Heritage walls' },
  { n: 30, cap: 'Fabindia', note: 'Rajwada, celebrating traditions' },
  { n: 52, cap: 'Bindi', note: 'Beauty portrait' },
  { n: 55, cap: 'Kundan', note: 'Jewellery portrait' },
  { n: 56, cap: 'Ink & attire', note: 'The culture of tattoos' },
]

const spreads = [
  { l: 6, r: 7, cap: 'Contents', note: 'A giant display masthead sets the tone, with section columns below.' },
  { l: 14, r: 15, cap: 'Bandhani opener', note: 'Full-bleed pattern against a portrait, the title sitting on the cloth.' },
  { l: 18, r: 19, cap: 'Rabari teaser', note: 'One image continues across the gutter and into the next spread.' },
  { l: 28, r: 29, cap: 'Fabindia feature', note: 'Serif headline, tight deck and a photo that anchors the column.' },
  { l: 50, r: 51, cap: 'Kundan feature', note: 'A cropped jewellery detail facing a portrait that fills the page.' },
]

export default function ProjectAfreen() {
  const { state } = useLocation()
  const pages = useMemo(() => Array.from({ length: TOTAL }, (_, i) => src(i + 1)), [])
  return (
    <div className="afr">
      <ScrollProgress />
      <div className="afr-inner">
        <ProjectHeader title="AFREEN Fashion Magazine" slug={SLUG} year="2023" />
      </div>

      <section className="afr-wide afr-issue afr-first" id="issue">
        <div className="afr-inner">
          <p className="afr-kicker">The issue</p>
          <h2 className="afr-h">Flip through AFREEN</h2>
          <p className="afr-copy afr-narrow">The whole magazine, all 64 pages. Drag or swipe the corner of a page, or tap the arrows. Turn the page-turn sound on if you like.</p>
        </div>
        <div className="afr-book">
          <MagazineFlipbook pages={pages} label="AFREEN magazine" autoOpen={!!state?.fromShelf} />
        </div>
      </section>

      <div className="afr-inner">
        <header className="afr-hero afr-hero-flat">
          <div className="afr-hero-text">
            <p className="afr-dek">A 64-page fashion magazine on Indian crafts and handloom: concept, shoots, writing and layout.</p>
            <dl className="afr-meta">
              <div><dt>Issue</dt><dd>Volume 01, Issue 1 · December 2023</dd></div>
              <div><dt>Studied at</dt><dd>NIFT · Product Design</dd></div>
              <div><dt>Role</dt><dd>Concept, styling, art direction, layout, writing</dd></div>
              <div><dt>Tools</dt><dd>InDesign, Photoshop, Illustrator</dd></div>
            </dl>
            
          </div>
        </header>

        <section className="afr-sec">
          <p className="afr-kicker">01 · Overview</p>
          <div className="afr-two">
            <h2 className="afr-h">Making a magazine, start to finish.</h2>
            <div className="afr-copy">
              <p>AFREEN is a fashion magazine I made in college. It treats Indian crafts and handloom the way a fashion title treats a season: styled, shot, written and laid out.</p>
              <p>It is where I first worked on catalogues, magazines and fashion shoots, and I have been doing this kind of work since.</p>
            </div>
          </div>
          <ul className="afr-stats">
            <li><b>64</b><span>pages</span></li>
            <li><b>Dec ’23</b><span>Volume 01, Issue 1</span></li>
            <li><b>6</b><span>sections, from Folk Art to Monthly Remedy</span></li>
          </ul>
        </section>

        <section className="afr-sec">
          <p className="afr-kicker">02 · Concept</p>
          <blockquote className="afr-quote">Indian crafts, shot like fashion.</blockquote>
          <div className="afr-copy afr-narrow">
            <p>Handloom and craft are usually shown as heritage. AFREEN shows them as fashion: a Maheshwari saree on location, Bandhani as a portrait, Kundan as a men’s accessory, Farak’s block prints on the street.</p>
            <p>The issue is organised like a real magazine: Folk Art, Reviews, Interview, Accessory, Lifestyle and a Monthly Remedy, so each craft gets the format that suits it.</p>
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
          <h2 className="afr-h">From idea to issue</h2>
          <ol className="afr-steps">
            {process.map(([n, t, d]) => (
              <li key={n}><span className="afr-n">{n}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </section>
      </div>

      <section className="afr-sec afr-wide">
        <div className="afr-inner">
          <p className="afr-kicker">05 · Shoots</p>
          <h2 className="afr-h">The fashion shoots</h2>
          <p className="afr-copy afr-narrow">Each story has its own shoot. Handloom sarees outdoors, block print streetwear against old walls, jewellery in close-up, portraits for Bindi and Kundan.</p>
        </div>
        <div className="afr-shoots">
          {shoots.map((s) => (
            <figure key={s.n} className={`afr-shoot s${s.n}`}>
              <img src={src(s.n)} alt={`${s.cap}: ${s.note}`} loading="lazy" />
              <figcaption><b>{s.cap}</b><span>{s.note} · p.{String(s.n).padStart(2, '0')}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>


      <div className="afr-inner">
        <section className="afr-sec">
          <p className="afr-kicker">06 · Layout & typography</p>
          <h2 className="afr-h">Pacing the pages</h2>
          <div className="afr-copy afr-narrow">
            <p>High-contrast serif display type for headlines and bylines, quieter serif text in narrow columns for reading, and full-bleed photography to open each story. Text-heavy pages sit next to image pages so the issue keeps its rhythm.</p>
          </div>
          <div className="afr-spreads">
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

        <section className="afr-sec afr-last">
          <p className="afr-kicker">07 · Outcome</p>
          <div className="afr-two">
            <h2 className="afr-h">A finished issue, and where it started.</h2>
            <div className="afr-copy">
              <p>AFREEN came together as a complete 64-page magazine: cover, contents, features, shoots, advertorials and closing illustration pages.</p>
              <p>It is the earliest proof of the work I still do: catalogues, magazines and fashion shoots, from concept to the final page.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
