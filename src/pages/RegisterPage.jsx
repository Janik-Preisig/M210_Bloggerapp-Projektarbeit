import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function RegisterPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ displayName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true); setError(''); setSuccess('')
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { display_name: form.displayName } },
    })
    if (authError) setError(authError.message)
    else if (!data.session) setSuccess('Konto erstellt. Bitte bestätige deine E-Mail-Adresse.')
    else setSuccess('Konto erfolgreich erstellt. Du bist jetzt eingeloggt.')
    setSubmitting(false)
  }

  return (
    <div className="auth-page">
      <form className="panel auth-form" onSubmit={handleSubmit}>
        <span className="eyebrow">Werde Autor:in</span><h1>Konto erstellen</h1>
        {error && <p className="alert error">{error}</p>}{success && <p className="alert success">{success}</p>}
        <label>Anzeigename<input required maxLength="80" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} /></label>
        <label>E-Mail<input type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Passwort<input type="password" autoComplete="new-password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="button primary" disabled={submitting}>{submitting ? 'Konto wird erstellt …' : 'Registrieren'}</button>
        <p>Bereits registriert? <Link to="/login">Zum Login</Link></p>
      </form>
    </div>
  )
}
