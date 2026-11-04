import ProjectHeader from '../components/ProjectHeader.jsx'
import ScrollProgress from '../components/fx/ScrollProgress.jsx'
import html from '../content/bar.html?raw'

export default function ProjectBar() {
  return (
    <section className="cs">
      <ScrollProgress />
      <div className="cs-inner">
        <div className="cs-top">
          <ProjectHeader title="A Bar That Argues Back." slug="a-bar-that-argues-back" year="2026" />
          <div className="cs-hero"><img src="/media/2tIJjtt9GO2mToVS5UOSv7DA.png" alt="" /></div>
        </div>
        <div className="rt" style={{ paddingBottom: 87 }} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  )
}
