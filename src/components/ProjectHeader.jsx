import { Link } from 'react-router-dom'

export default function ProjectHeader({ title, slug, year }) {
  return (
    <div className="ph">
      <div className="ph-row">
        <div className="ph-crumb t-md">
          <Link to="/work" className="nav-link">All Projects</Link>
          <span className="sep t-md">|</span>
          <Link to={`/work/${slug}`} className="accent">{title}</Link>
        </div>
        <div className="ph-date t-md"><span className="ph-emoji">🗓️</span><span>{year}</span></div>
      </div>
      <h1 className="t-h1 t-h1-sub">{title}</h1>
    </div>
  )
}
