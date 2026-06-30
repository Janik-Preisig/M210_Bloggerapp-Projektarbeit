import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword(form)
    if (authError) {
      setError(authError.message)
      setSubmitting(false)
      return
    }
    navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true })
  }

  return (
    <div className="auth-page">
      <form className="panel auth-form" onSubmit={handleSubmit}>
        <span className="eyebrow">Willkommen zurück</span><h1>Einloggen</h1>
        {error && <p className="alert error">{error}</p>}
        <label>E-Mail<input type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Passwort<input type="password" autoComplete="current-password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="button primary" disabled={submitting}>{submitting ? 'Einloggen …' : 'Einloggen'}</button>
        <p>Noch kein Konto? <Link to="/register">Jetzt registrieren</Link></p>
      </form>
    </div>
  )
}
