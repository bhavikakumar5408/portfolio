import { Link } from 'react-router-dom'
import { projects } from '../data/projects.js'

export function ProjectCard({ p }) {
  return (
    <Link to={`/work/${p.slug}`} className="card">
      <figure><img src={p.img} alt="" /></figure>
      <div className="card-text">
        <h3 className="t-h3">{p.title}</h3>
        <p className="t-md card-desc">{p.blurb}</p>
      </div>
    </Link>
  )
}

export default function Projects() {
  return (
    <section className="projects">
      <div className="projects-inner">
        <div className="projects-head">
          <div className="projects-title">
            <h2 className="t-h2">Latest Projects</h2>
            <p className="t-md"><Link to="/work" className="nav-link">View all</Link></p>
          </div>
          <div className="rule" />
        </div>
        <div className="grid">
          {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  )
}
