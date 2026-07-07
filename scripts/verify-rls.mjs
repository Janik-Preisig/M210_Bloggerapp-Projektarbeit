import assert from 'node:assert/strict'
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_TEST_URL
const anonKey = process.env.SUPABASE_TEST_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_TEST_SERVICE_ROLE_KEY

if (!url || !anonKey || !serviceRoleKey) {
  throw new Error('SUPABASE_TEST_URL, SUPABASE_TEST_ANON_KEY und SUPABASE_TEST_SERVICE_ROLE_KEY müssen gesetzt sein.')
}

const clientOptions = { auth: { autoRefreshToken: false, persistSession: false } }
const anonymous = createClient(url, anonKey, clientOptions)
const service = createClient(url, serviceRoleKey, clientOptions)
const createdUsers = []
const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`
const password = `Test-${crypto.randomUUID()}!`

async function createUser(label) {
  const client = createClient(url, anonKey, clientOptions)
  const email = `${label}-${suffix}@example.test`
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: { display_name: label } },
  })
  assert.ifError(error)
  assert.ok(data.user, `${label}: Benutzer wurde nicht erstellt`)
  assert.ok(data.session, `${label}: lokale Tests benötigen deaktivierte E-Mail-Bestätigung`)
  createdUsers.push(data.user.id)
  return { client, user: data.user }
}

try {
  const userA = await createUser('user-a')
  const userB = await createUser('user-b')
  const admin = await createUser('admin')

  const { data: draft, error: insertError } = await userA.client
    .from('posts')
    .insert({ user_id: userA.user.id, title: 'RLS-Entwurf', content: 'Nur Benutzer A', category: 'Test' })
    .select()
    .single()
  assert.ifError(insertError)

  const { data: hiddenDraft, error: hiddenError } = await userB.client.from('posts').select('*').eq('id', draft.id)
  assert.ifError(hiddenError)
  assert.equal(hiddenDraft.length, 0, 'Benutzer B darf den Entwurf von Benutzer A nicht lesen')

  const { data: anonymousDraft, error: anonymousDraftError } = await anonymous.from('posts').select('id').eq('id', draft.id)
  assert.ifError(anonymousDraftError)
  assert.equal(anonymousDraft.length, 0, 'Gäste dürfen Entwürfe nicht lesen')

  const { data: forbiddenUpdate, error: forbiddenUpdateError } = await userB.client
    .from('posts').update({ title: 'Fremdänderung' }).eq('id', draft.id).select()
  assert.ifError(forbiddenUpdateError)
  assert.equal(forbiddenUpdate.length, 0, 'Benutzer B darf den Beitrag von Benutzer A nicht ändern')

  const { data: forbiddenDelete, error: forbiddenDeleteError } = await userB.client
    .from('posts').delete().eq('id', draft.id).select()
  assert.ifError(forbiddenDeleteError)
  assert.equal(forbiddenDelete.length, 0, 'Benutzer B darf den Beitrag von Benutzer A nicht löschen')

  const { data: ownDisposable, error: ownInsertError } = await userA.client
    .from('posts')
    .insert({ user_id: userA.user.id, title: 'Löschtest', content: 'Eigener Beitrag', category: 'Test' })
    .select().single()
  assert.ifError(ownInsertError)
  const { data: ownDeleted, error: ownDeleteError } = await userA.client
    .from('posts').delete().eq('id', ownDisposable.id).select('id')
  assert.ifError(ownDeleteError)
  assert.equal(ownDeleted.length, 1, 'Benutzer A muss den eigenen Beitrag löschen können')

  const { error: publishError } = await userA.client.from('posts').update({ status: 'published' }).eq('id', draft.id)
  assert.ifError(publishError)

  const { data: publicPost, error: publicError } = await anonymous.from('posts').select('id,status').eq('id', draft.id).single()
  assert.ifError(publicError)
  assert.equal(publicPost.status, 'published')

  const { error: roleEscalationError } = await userA.client.from('profiles').update({ role: 'admin' }).eq('id', userA.user.id)
  assert.ok(roleEscalationError, 'Ein Benutzer darf seine Rolle nicht selbst auf admin erhöhen')

  const { error: promoteError } = await service.from('profiles').update({ role: 'admin' }).eq('id', admin.user.id)
  assert.ifError(promoteError)

  const { data: allPosts, error: adminReadError } = await admin.client.from('posts').select('id').eq('id', draft.id)
  assert.ifError(adminReadError)
  assert.equal(allPosts.length, 1, 'Admin muss fremde Beiträge lesen können')

  const { error: disableError } = await admin.client.from('posts').update({ status: 'disabled' }).eq('id', draft.id)
  assert.ifError(disableError)

  const { data: disabledPublic, error: disabledPublicError } = await anonymous.from('posts').select('id').eq('id', draft.id)
  assert.ifError(disabledPublicError)
  assert.equal(disabledPublic.length, 0, 'Deaktivierte Beiträge dürfen nicht öffentlich sichtbar sein')

  const { error: deleteError } = await admin.client.from('posts').delete().eq('id', draft.id)
  assert.ifError(deleteError)

  console.log('RLS-Integrationstest erfolgreich: Auth, Public-Zugriff, Besitztrennung und Admin-Moderation geprüft.')
} finally {
  for (const userId of createdUsers) {
    const { error } = await service.auth.admin.deleteUser(userId)
    if (error) console.error(`Testbenutzer ${userId} konnte nicht aufgeräumt werden: ${error.message}`)
  }
}
