import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      {post.image_url && <img src={post.image_url} alt="" loading="lazy" />}
      <div className="post-card-content">
        <span className="category">{post.category}</span>
        <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
        <p>{post.content.length > 150 ? `${post.content.slice(0, 150)}…` : post.content}</p>
        <small>{new Intl.DateTimeFormat('de-CH', { dateStyle: 'long' }).format(new Date(post.created_at))}</small>
      </div>
    </article>
  )
}
