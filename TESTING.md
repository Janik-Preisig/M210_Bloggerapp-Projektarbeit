# Tests

## Statische Prüfungen

```bash
npm run lint
npm run build
```

Beide Befehle laufen auch in der GitHub-Actions-Pipeline.

Zuletzt lokal ausgeführt am 07.07.2026 mit Node.js 24.16.0:

- `npm run lint`: bestanden
- `npm run build`: bestanden

## Lokaler RLS-Integrationstest

Der Integrationstest erstellt drei kurzlebige Benutzer und prüft öffentliche Beiträge, Besitztrennung, unerlaubte Rollenerhöhung und Admin-Moderation gegen eine echte Supabase-Instanz.

```bash
npx supabase start

SUPABASE_TEST_URL=http://127.0.0.1:54321 \
SUPABASE_TEST_ANON_KEY="<lokaler anon key>" \
SUPABASE_TEST_SERVICE_ROLE_KEY="<lokaler service_role key>" \
npm run test:rls

npx supabase stop
```

Die lokalen Schlüssel zeigt `npx supabase status` an. Der `service_role`-Key wird ausschließlich für Test-Setup und Aufräumen verwendet und niemals in eine Datei oder das Frontend geschrieben.

Zuletzt lokal ausgeführt am 07.07.2026: **bestanden**. Geprüft wurden Registrierung und Session, öffentliche Sichtbarkeit, Besitztrennung zwischen zwei Benutzern, eigenes CRUD, verhinderte Rollenerhöhung, geschützter Bild-Upload sowie Lesen, Deaktivieren und Löschen durch einen Administrator. Testbenutzer und Testdateien wurden anschließend gelöscht.

## Gehostetes Projekt

Vor der Abgabe muss derselbe fachliche Ablauf zusätzlich mit dem konfigurierten Supabase-Projekt im Browser geprüft werden. Dabei sind mindestens Gast, zwei normale Benutzer und ein Administrator zu verwenden. Dieser manuelle Test darf erst als bestanden dokumentiert werden, wenn die tatsächlichen Ergebnisse vorliegen.
