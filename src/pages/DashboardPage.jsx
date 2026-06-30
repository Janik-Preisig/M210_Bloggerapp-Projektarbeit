import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      const { data, error: queryError } = await supabase.from('posts').select('*').eq('user_id', user.id).order('updated_at', { ascending: false })
      if (queryError) setError(queryError.message)
      else setPosts(data)
      setLoading(false)
    }
    loadPosts()
  }, [user.id])

  async function deletePost(post) {
    if (!window.confirm(`„${post.title}“ wirklich löschen?`)) return
    const { error: deleteError } = await supabase.from('posts').delete().eq('id', post.id).eq('user_id', user.id)
    if (deleteError) { setError(deleteError.message); return }
    setPosts((current) => current.filter((item) => item.id !== post.id))
  }

  return (
    <div className="page-container">
      <div className="dashboard-heading"><div><span className="eyebrow">Dein Arbeitsbereich</span><h1>Hallo, {profile?.display_name || user.email}</h1></div><Link className="button primary" to="/dashboard/new">+ Neuer Beitrag</Link></div>
      {error && <p className="alert error">{error}</p>}
      {loading ? <p className="page-message">Beiträge werden geladen …</p> : posts.length === 0 ? <div className="empty-state"><h2>Noch ziemlich leer hier.</h2><p>Erstelle deinen ersten Beitrag und fülle dein Blog mit Leben.</p><Link to="/dashboard/new">Beitrag erstellen</Link></div> : (
        <div className="table-wrap"><table><thead><tr><th>Titel</th><th>Kategorie</th><th>Status</th><th>Aktualisiert</th><th>Aktionen</th></tr></thead><tbody>{posts.map((post) => <tr key={post.id}><td>{post.title}</td><td>{post.category}</td><td><span className={`status ${post.status}`}>{post.status === 'published' ? 'Veröffentlicht' : post.status === 'disabled' ? 'Deaktiviert' : 'Entwurf'}</span></td><td>{new Intl.DateTimeFormat('de-CH').format(new Date(post.updated_at))}</td><td className="actions"><Link to={`/dashboard/edit/${post.id}`}>Bearbeiten</Link><button type="button" onClick={() => deletePost(post)}>Löschen</button></td></tr>)}</tbody></table></div>
      )}
    </div>
  )
}
