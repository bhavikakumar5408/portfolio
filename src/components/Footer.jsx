import { NavLink } from 'react-router-dom'

const RESUME = 'https://drive.google.com/file/d/1t82_QnKbutwLJJ1-BvjBNbfax36JYqnX/view?usp=sharing'
const cls = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="footer-row">
        <p className="t-md">© Bhavika Kumar | 2026</p>
        <div className="footer-links t-md">
          <NavLink to="/" end className={cls}>Home</NavLink>
          <NavLink to="/about" className={cls}>About</NavLink>
          <NavLink to="/work" end className={cls}>Work</NavLink>
          <NavLink to="/contact" className={cls}>Contact</NavLink>
          <a href={RESUME} target="_blank" rel="noreferrer" className="nav-link">Resume</a>
        </div>
      </div>
    </footer>
  )
}
