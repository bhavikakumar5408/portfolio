import { Link, NavLink, useLocation } from 'react-router-dom'

const RESUME = 'https://drive.google.com/file/d/1t82_QnKbutwLJJ1-BvjBNbfax36JYqnX/view?usp=sharing'
const LINKEDIN = 'https://www.linkedin.com/in/bhavika-kumar-b50ba2273'

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70%" height="70%" strokeWidth="1.5" stroke="var(--text)" fill="none">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70%" height="70%" strokeWidth="1.5" stroke="var(--text)" fill="none">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="0.75" />
    <path d="M8.25 10.5v6M11.25 16.5v-6" />
    <path d="M11.25 13.125c0-1.45 1.175-2.625 2.625-2.625s2.625 1.175 2.625 2.625V16.5" />
    <circle cx="8.25" cy="7.75" r="0.4" fill="currentColor" />
  </svg>
)

const cls = ({ isActive }) => `t-md nav-link${isActive ? ' active' : ''}`

export default function Nav({ theme, onToggleTheme }) {
  const isHome = useLocation().pathname === '/'
  return (
    <div className="nav-wrap">
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-group">
            <div className="nav-links">
              <NavLink to="/about" className={cls}>About</NavLink>
              <NavLink to="/work" end className={cls}>Work</NavLink>
              <NavLink to="/contact" className={cls}>Contact</NavLink>
              <a href={RESUME} target="_blank" rel="noreferrer" className="t-md nav-link">Resume</a>
            </div>
          </div>
          <div className="nav-group">
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="icon-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <span className="sep">|</span>
            <button
              className="theme-btn"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={onToggleTheme}
            >
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
