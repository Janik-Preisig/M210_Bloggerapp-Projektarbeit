# Bewertungsnachweis

Diese Übersicht ordnet das Bewertungsraster konkreten, prüfbaren Artefakten zu. Ein vorhandenes Dokument ersetzt keine praktische Funktionsprüfung.

| Kriterium | Nachweis | Stand |
| --- | --- | --- |
| Projekt-Pitch | [`PITCH.md`](PITCH.md) | dokumentiert |
| User Stories mit Akzeptanzkriterien | [`USER_STORIES.md`](USER_STORIES.md) | dokumentiert |
| Arbeitsplan mit Schätzungen | [`WORK_PLAN.md`](WORK_PLAN.md) | dokumentiert |
| Effektive Arbeitszeit pro Arbeitspaket | [`TIME_LOG.md`](TIME_LOG.md) | **vom Verfasser auszufüllen** |
| Vollendeter Merge/Pull Request | [Issue #1](https://github.com/Janik-Preisig/M210_Bloggerapp-Projektarbeit/issues/1) und zugehöriger Pull Request | über diesen Workflow |
| Funktionale GitHub Actions | [Workflow `.github/workflows/ci.yml`](.github/workflows/ci.yml) | Lint und Build konfiguriert; Lauf in GitHub prüfen |
| Auth korrekt eingesetzt | `AuthContext`, `ProtectedRoute`, Supabase Auth und RLS in [`supabase/schema.sql`](supabase/schema.sql) | implementiert; E2E-Test offen |
| CRUD-Operationen | `DashboardPage`, `PostFormPage` und Posts-Policies | implementiert; E2E-Test offen |
| Architektur | [`ARCHITECTURE.md`](ARCHITECTURE.md) und [`DATENMODELL.md`](DATENMODELL.md) | dokumentiert |
| Deployment-Optionen | [`DEPLOYMENT.md`](DEPLOYMENT.md) | dokumentiert |
| Kritischer Review | [`REVIEW.md`](REVIEW.md) | dokumentiert |
| Admin-Funktionalität | `AdminPage`, Rollenprüfung und Admin-Policies | Zusatz umgesetzt; E2E-Test offen |
| File Upload | `PostFormPage`, Bucket-Konfiguration und Storage-Policies | Zusatz umgesetzt; E2E-Test offen |
| Kennzeichnung von Hilfestellungen | [`HILFSMITTEL.md`](HILFSMITTEL.md) | dokumentiert |

## Vor der Abgabe zwingend erledigen

1. Effektive, selbst gemessene Zeiten in `TIME_LOG.md` eintragen.
2. Registrierung, Login, CRUD, RLS, Admin und Upload mit einem echten Supabase-Projekt testen.
3. Grünen GitHub-Actions-Lauf und gemergten Pull Request kontrollieren.
4. Erreichbaren GitHub-Link und gegebenenfalls Deployment-Link prüfen.
5. Die lokale `.env` nur über den vereinbarten privaten Kanal an die Lehrperson übergeben.

Ein verlangtes Arztzeugnis bei Nicht-Hauptprüfung ist ein administrativer Nachweis und gehört nicht in dieses öffentliche Repository.
