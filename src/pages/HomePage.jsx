import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { supabase } from '../lib/supabase'

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      const { data, error: queryError } = await supabase
        .from('posts')
        .select('id, title, content, category, image_url, created_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
      if (queryError) setError(queryError.message)
      else setPosts(data)
      setLoading(false)
    }
    loadPosts()
  }, [])

  return (
    <div className="page-container">
      <section className="hero">
        <span className="eyebrow">Gedanken. Ideen. Geschichten.</span>
        <h1>Lesenswertes von unserer Community.</h1>
        <p>Entdecke neue Beiträge oder melde dich an und teile deine eigene Geschichte.</p>
      </section>
      <section aria-labelledby="latest-posts">
        <div className="section-heading">
          <h2 id="latest-posts">Neueste Beiträge</h2>
          <span>{posts.length} veröffentlicht</span>
        </div>
        {loading && <p className="page-message">Beiträge werden geladen …</p>}
        {error && <p className="alert error">Beiträge konnten nicht geladen werden: {error}</p>}
        {!loading && !error && posts.length === 0 && <div className="empty-state">Noch keine Beiträge veröffentlicht.</div>}
        <div className="post-grid">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div>
      </section>
    </div>
  )
}
