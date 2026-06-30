import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Layout() {
  const { user, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">Blogger<span>.</span></Link>
        <nav aria-label="Hauptnavigation">
          <NavLink to="/">Beiträge</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              {isAdmin && <NavLink to="/admin">Admin</NavLink>}
              <button className="link-button" type="button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink className="nav-cta" to="/register">Registrieren</NavLink>
            </>
          )}
        </nav>
      </header>
      <main><Outlet /></main>
      <footer>Ein Schulprojekt mit React und Supabase · {new Date().getFullYear()}</footer>
    </div>
  )
}
