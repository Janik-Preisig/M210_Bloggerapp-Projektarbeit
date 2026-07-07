# Bewertungsnachweis

Diese Übersicht ordnet das Bewertungsraster konkreten, prüfbaren Artefakten zu. Ein vorhandenes Dokument ersetzt keine praktische Funktionsprüfung.

| Kriterium | Nachweis | Stand |
| --- | --- | --- |
| Projekt-Pitch | [`PITCH.md`](PITCH.md) | dokumentiert |
| User Stories mit Akzeptanzkriterien | [`USER_STORIES.md`](USER_STORIES.md) | dokumentiert |
| Arbeitsplan mit Schätzungen | [`WORK_PLAN.md`](WORK_PLAN.md) | dokumentiert |
| Effektive Arbeitszeit pro Arbeitspaket | [`TIME_LOG.md`](TIME_LOG.md) | rekonstruiert und als Schätzung gekennzeichnet; vom Verfasser zu bestätigen |
| Vollendeter Merge/Pull Request | [PR #2](https://github.com/Janik-Preisig/M210_Bloggerapp-Projektarbeit/pull/2), [PR #6](https://github.com/Janik-Preisig/M210_Bloggerapp-Projektarbeit/pull/6) und [PR #7](https://github.com/Janik-Preisig/M210_Bloggerapp-Projektarbeit/pull/7) | gemergt |
| Funktionale GitHub Actions | [Workflow `.github/workflows/ci.yml`](.github/workflows/ci.yml) | Lint und Build konfiguriert; letzte Läufe erfolgreich (07.07.2026) |
| Auth korrekt eingesetzt | `AuthContext`, `ProtectedRoute`, Supabase Auth und RLS in [`supabase/schema.sql`](supabase/schema.sql) | implementiert; Integrationstest bestanden |
| CRUD-Operationen | `DashboardPage`, `PostFormPage` und Posts-Policies | implementiert; Integrationstest bestanden |
| Architektur | [`ARCHITECTURE.md`](ARCHITECTURE.md) und [`DATENMODELL.md`](DATENMODELL.md) | dokumentiert |
| Deployment-Optionen | [`DEPLOYMENT.md`](DEPLOYMENT.md) | dokumentiert |
| Kritischer Review | [`REVIEW.md`](REVIEW.md) | dokumentiert |
| Admin-Funktionalität | `AdminPage`, Rollenprüfung und Admin-Policies | Zusatz umgesetzt; Integrationstest bestanden |
| File Upload | `PostFormPage`, Bucket-Konfiguration und Storage-Policies | Zusatz umgesetzt; Storage-Policies getestet |
| Kennzeichnung von Hilfestellungen | [`HILFSMITTEL.md`](HILFSMITTEL.md) | dokumentiert |

## Vor der Abgabe zwingend erledigen

1. Rekonstruierte Zeiten in `TIME_LOG.md` persönlich bestätigen oder durch tatsächliche Aufzeichnungen ersetzen.
2. Den fachlichen Ablauf im Browser mit dem für die Vorführung verwendeten Supabase-Projekt kontrollieren.
3. Erreichbaren GitHub-Link prüfen und die lokale `.env` nur über den vereinbarten privaten Kanal übergeben.

Ein verlangtes Arztzeugnis bei Nicht-Hauptprüfung ist ein administrativer Nachweis und gehört nicht in dieses öffentliche Repository.
