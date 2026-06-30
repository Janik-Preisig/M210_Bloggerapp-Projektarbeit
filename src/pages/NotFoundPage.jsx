import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <div className="page-container narrow"><div className="empty-state"><span className="eyebrow">404</span><h1>Diese Seite gibt es nicht.</h1><Link to="/">Zur Startseite</Link></div></div>
}
