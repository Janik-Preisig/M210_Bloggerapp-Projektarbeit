# Commit-Plan

Die Schritte sind klein genug für ein verständliches Review und bauen logisch aufeinander auf. Keine Secrets oder echte `.env` committen.

1. `chore: Vite-React-Projekt und Codequalität einrichten`
   - Package-Skripte, Vite, ESLint, Grundstruktur, `.gitignore`
2. `feat: Supabase-Client und Auth-Kontext ergänzen`
   - Client-Konfiguration, Session-Persistenz, Profil/Rolle
3. `feat: Registrierung, Login und geschützte Routen umsetzen`
   - Formulare, Logout, Route Guards
4. `feat: Datenbankschema und RLS-Policies hinzufügen`
   - Profile, Posts, Trigger, Benutzer- und Public-Policies
5. `feat: öffentlichen Blogbereich erstellen`
   - Startseite, Karten und Detailseite
6. `feat: Beitragsverwaltung im Dashboard umsetzen`
   - Erstellen, Lesen, Bearbeiten, Löschen und Status
7. `feat: Titelbilder mit Supabase Storage integrieren`
   - Bucket-Policies, Upload, Austausch und Löschen
8. `feat: Adminbereich und Moderation ergänzen`
   - Rollenprüfung, alle Beiträge, Deaktivieren und Löschen
9. `style: responsives Oberflächendesign fertigstellen`
   - Layout, Formulare, Tabellen, mobile Ansicht
10. `ci: GitHub Actions für Lint und Build konfigurieren`
11. `docs: Projektdokumentation und Deployment-Anleitung ergänzen`

Vor jedem Commit: `npm run lint` und bei funktionalen Änderungen zusätzlich `npm run build` ausführen. Anschließend über einen Feature-Branch einen Merge Request mit Beschreibung, Testnachweisen und Screenshots erstellen.
