import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('posts')
      .select('id, title, content, category, image_url, created_at, updated_at')
      .eq('id', id).eq('status', 'published').maybeSingle()
      .then(({ data }) => { setPost(data); setLoading(false) })
  }, [id])

  if (loading) return <div className="page-message">Beitrag wird geladen …</div>
  if (!post) return <div className="page-container narrow"><div className="empty-state"><h1>Beitrag nicht gefunden</h1><Link to="/">Zurück zur Startseite</Link></div></div>

  return (
    <article className="article-page">
      <Link className="back-link" to="/">← Alle Beiträge</Link>
      <span className="category">{post.category}</span>
      <h1>{post.title}</h1>
      <p className="article-date">Veröffentlicht am {new Intl.DateTimeFormat('de-CH', { dateStyle: 'long' }).format(new Date(post.created_at))}</p>
      {post.image_url && <img className="article-image" src={post.image_url} alt={`Titelbild zu ${post.title}`} />}
      <div className="article-content">{post.content}</div>
    </article>
  )
}
