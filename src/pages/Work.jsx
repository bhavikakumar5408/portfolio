import { projects } from '../data/projects.js'
import { ProjectCard } from '../components/Projects.jsx'

export default function Work() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1 className="t-h1 t-h1-sub">My Work</h1>
          <div className="hero-copy t-lg">
            <p>
              I've designed for a bar that can't tell lime juice from lemon juice, and a girl who isn't real but gets DMs anyway.
              Welcome to my work.
            </p>
          </div>
        </div>
      </section>
      <section className="projects">
        <div className="projects-inner">
          <div className="projects-head">
            <div className="projects-title"><h2 className="t-h2">All Projects</h2></div>
            <div className="rule" />
          </div>
          <div className="grid grid-2">
            {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
    </>
  )
}
