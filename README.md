# Blogger App

Eine multiuser-fähige Blogger-Webapp als Schul-Projektarbeit. Gäste lesen veröffentlichte Beiträge. Registrierte Benutzer verwalten ihre eigenen Beiträge und Titelbilder; Administratoren moderieren alle Inhalte.

## Funktionen

- Registrierung, Login, persistente Session und Logout mit Supabase Auth
- Öffentliche Übersicht und Detailansicht für veröffentlichte Beiträge
- Geschütztes Dashboard mit CRUD für eigene Beiträge
- Entwürfe, veröffentlichte und administrativ deaktivierte Beiträge
- Titelbilder in Supabase Storage (maximal 5 MB)
- Adminbereich zum Deaktivieren und Löschen
- PostgreSQL Row Level Security für Public, Benutzer und Admin
- Responsive Oberfläche und GitHub-Actions-Pipeline

## Lokal starten

Voraussetzungen: Node.js 22 oder neuer, npm und ein Supabase-Projekt.

1. Repository klonen und in den Projektordner wechseln.
2. In Supabase unter **SQL Editor** den gesamten Inhalt von `supabase/schema.sql` ausführen.
3. `.env.example` nach `.env` kopieren.
4. In Supabase unter **Project Settings → API** die Project URL und den öffentlichen Anon/Publishable Key eintragen:

   ```env
   VITE_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
   VITE_SUPABASE_ANON_KEY=DEIN_OEFFENTLICHER_ANON_KEY
   ```

   Niemals den `service_role`-Key im Frontend verwenden.

5. App installieren und starten:

   ```bash
   npm install
   npm run dev
   ```

Vite zeigt anschließend die lokale URL an (normalerweise `http://localhost:5173`).

## Supabase konfigurieren

Unter **Authentication → URL Configuration** die Site URL auf die lokale beziehungsweise produktive Frontend-URL setzen. Ob eine Registrierung sofort einloggt oder zuerst eine E-Mail-Bestätigung verlangt, wird unter **Authentication → Providers → Email** gesteuert.

Der Storage-Bucket wird durch das Schema erzeugt. Die dort dokumentierten Policies für `storage.objects` werden unter **Storage → Policies → OBJECTS** angelegt. Um ein Konto zum Admin zu machen, nach dessen Registrierung einmalig im SQL Editor ausführen:

```sql
update public.profiles
set role = 'admin'
where id = 'UUID-DES-BENUTZERS';
```

Die UUID steht unter **Authentication → Users**. Eine Adminrolle darf nicht über den Browser gesetzt werden.

## Befehle

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver |
| `npm run lint` | statische Codeprüfung |
| `npm run build` | Produktions-Build in `dist/` |
| `npm run preview` | lokalen Produktions-Build ansehen |

## Projektstruktur

```text
src/
├── components/       Layout und Routenschutz
├── context/          zentrale Auth-Session
├── lib/              Supabase-Client
├── pages/            Seiten und Datenoperationen
├── App.jsx            Routing
└── styles.css         responsives Design
supabase/schema.sql    Tabellen, Trigger, RLS und Storage
.github/workflows/     CI-Pipeline
```

Weitere Entscheidungen stehen in [ARCHITECTURE.md](ARCHITECTURE.md), das ER-Diagramm in [DATENMODELL.md](DATENMODELL.md) und Deployment-Hinweise in [DEPLOYMENT.md](DEPLOYMENT.md).
