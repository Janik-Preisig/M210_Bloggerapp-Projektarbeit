import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

const initialForm = { title: '', content: '', category: '', status: 'draft', image_url: '', image_path: '' }

export default function PostFormPage() {
  const { id } = useParams()
  const editing = Boolean(id)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(editing)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editing) return
    supabase.from('posts').select('*').eq('id', id).eq('user_id', user.id).maybeSingle().then(({ data, error: queryError }) => {
      if (queryError || !data) setError(queryError?.message ?? 'Beitrag nicht gefunden.')
      else setForm({ ...data, status: data.status === 'disabled' ? 'draft' : data.status })
      setLoading(false)
    })
  }, [editing, id, user.id])

  async function uploadImage() {
    if (!file) return null
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) throw new Error('Bitte ein Bild mit maximal 5 MB auswählen.')
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${user.id}/${crypto.randomUUID()}.${extension.replace(/[^a-z0-9]/g, '')}`
    const { error: uploadError } = await supabase.storage.from('post-images').upload(path, file, { contentType: file.type })
    if (uploadError) throw uploadError
    const { data } = supabase.storage.from('post-images').getPublicUrl(path)
    return { image_path: path, image_url: data.publicUrl }
  }

  async function handleSubmit(event) {
    event.preventDefault(); setSubmitting(true); setError('')
    let uploaded = null
    try {
      uploaded = await uploadImage()
      const payload = {
        title: form.title.trim(), content: form.content.trim(), category: form.category.trim(), status: form.status,
        image_path: uploaded?.image_path ?? form.image_path ?? null,
        image_url: uploaded?.image_url ?? form.image_url ?? null,
      }
      const query = editing
        ? supabase.from('posts').update(payload).eq('id', id).eq('user_id', user.id)
        : supabase.from('posts').insert({ ...payload, user_id: user.id })
      const { error: saveError } = await query
      if (saveError) throw saveError
      if (uploaded && form.image_path) await supabase.storage.from('post-images').remove([form.image_path])
      navigate('/dashboard')
    } catch (submitError) {
      if (uploaded) await supabase.storage.from('post-images').remove([uploaded.image_path])
      setError(submitError.message)
      setSubmitting(false)
    }
  }

  if (loading) return <p className="page-message">Beitrag wird geladen …</p>
  return (
    <div className="page-container narrow">
      <Link className="back-link" to="/dashboard">← Dashboard</Link>
      <form className="panel post-form" onSubmit={handleSubmit}>
        <span className="eyebrow">{editing ? 'Beitrag überarbeiten' : 'Etwas Neues erzählen'}</span><h1>{editing ? 'Beitrag bearbeiten' : 'Neuer Beitrag'}</h1>
        {error && <p className="alert error">{error}</p>}
        <label>Titel<input required maxLength="160" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label>Kategorie<input required maxLength="80" placeholder="z. B. Technik" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
        <label>Inhalt<textarea required rows="14" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></label>
        <label>Status<select value={form.status === 'disabled' ? 'draft' : form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="draft">Entwurf</option><option value="published">Veröffentlicht</option></select></label>
        <label>Titelbild (optional, max. 5 MB)<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] ?? null)} /></label>
        {form.image_url && !file && <img className="image-preview" src={form.image_url} alt="Aktuelles Titelbild" />}
        <div className="form-actions"><Link className="button secondary" to="/dashboard">Abbrechen</Link><button className="button primary" disabled={submitting}>{submitting ? 'Speichern …' : 'Beitrag speichern'}</button></div>
      </form>
    </div>
  )
}
