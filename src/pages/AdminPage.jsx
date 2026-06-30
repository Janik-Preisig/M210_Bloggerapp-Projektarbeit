import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminPage() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  async function loadPosts() {
    const { data, error: queryError } = await supabase.from('posts').select('id, title, category, status, created_at, user_id, image_path').order('created_at', { ascending: false })
    if (queryError) setError(queryError.message); else setPosts(data)
  }
  useEffect(() => { loadPosts() }, [])

  async function disablePost(id) {
    const { error: updateError } = await supabase.from('posts').update({ status: 'disabled' }).eq('id', id)
    if (updateError) setError(updateError.message); else setPosts((all) => all.map((post) => post.id === id ? { ...post, status: 'disabled' } : post))
  }

  async function deletePost(post) {
    if (!window.confirm(`„${post.title}“ endgültig löschen?`)) return
    const { error: deleteError } = await supabase.from('posts').delete().eq('id', post.id)
    if (deleteError) { setError(deleteError.message); return }
    if (post.image_path) await supabase.storage.from('post-images').remove([post.image_path])
    setPosts((all) => all.filter((item) => item.id !== post.id))
  }

  return (
    <div className="page-container"><div className="dashboard-heading"><div><span className="eyebrow">Moderation</span><h1>Adminbereich</h1><p>Alle Beiträge prüfen und moderieren.</p></div></div>
      {error && <p className="alert error">{error}</p>}
      <div className="table-wrap"><table><thead><tr><th>Titel</th><th>User-ID</th><th>Status</th><th>Aktionen</th></tr></thead><tbody>{posts.map((post) => <tr key={post.id}><td>{post.title}<small>{post.category}</small></td><td><code>{post.user_id.slice(0, 8)}…</code></td><td><span className={`status ${post.status}`}>{post.status}</span></td><td className="actions">{post.status !== 'disabled' && <button type="button" onClick={() => disablePost(post.id)}>Deaktivieren</button>}<button type="button" onClick={() => deletePost(post)}>Löschen</button></td></tr>)}</tbody></table></div>
    </div>
  )
}
