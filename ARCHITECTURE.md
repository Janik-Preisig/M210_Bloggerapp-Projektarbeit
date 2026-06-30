# Architektur

## Überblick

Die Anwendung ist eine Single Page Application. React rendert die Oberfläche, React Router ordnet URLs den Seiten zu und der Supabase-JavaScript-Client spricht Auth, PostgreSQL und Storage direkt an. Es gibt keinen eigenen Applikationsserver. Deshalb ist Row Level Security die verbindliche serverseitige Autorisierung.

```text
Browser (React/Vite)
  ├── Supabase Auth       Session und Benutzer-ID
  ├── PostgreSQL API      profiles und posts, geschützt durch RLS
  └── Supabase Storage    öffentliche Auslieferung, geschütztes Schreiben
```

## Frontend

`AuthContext` lädt die bestehende Session, beobachtet Auth-Änderungen und liest das eigene Profil. `ProtectedRoute` verbessert die Benutzerführung, ist jedoch keine Sicherheitsgrenze. Die Seiten führen kleine, direkt nachvollziehbare Supabase-Abfragen aus. Das hält die Projektstruktur für den Umfang verständlich.

Die öffentliche Detailseite fragt zusätzlich `status = published` ab. Selbst wenn diese Bedingung im Frontend vergessen würde, verhindert RLS den Zugriff auf fremde Entwürfe.

## Datenmodell

`profiles.id` entspricht exakt `auth.users.id`. Ein Datenbank-Trigger erzeugt das Profil nach der Registrierung. `posts.user_id` referenziert den Autor mit `on delete cascade`. Zeitstempel werden serverseitig gesetzt; ein Trigger aktualisiert `updated_at`.

Der Status besitzt drei Werte:

- `draft`: nur Besitzer und Admin sehen den Beitrag
- `published`: öffentlich lesbar
- `disabled`: durch Moderation öffentlich gesperrt

## Sicherheitsmodell

- Gast: `SELECT` nur bei `status = published`
- Benutzer: alle eigenen Beiträge lesen; eigene zulässige Beiträge erstellen, ändern und löschen
- Admin: alle Beiträge lesen, ändern und löschen
- Profilrollen können über die Benutzer-Update-Policy nicht erhöht werden
- Upload-Pfade beginnen mit `auth.uid()`; Storage-Policies prüfen dieses erste Verzeichnis

Die Hilfsfunktionen `is_admin()` und `current_user_role()` sind `SECURITY DEFINER`, besitzen einen leeren `search_path` und werden nur für die Policy-Prüfung freigegeben. Dadurch entsteht keine rekursive Policy-Abfrage auf `profiles`.

## Bewusste Grenzen

Es gibt keinen Rich-Text-Editor; Inhalt wird als Plaintext gespeichert und React escaped ihn automatisch. Bilder liegen in einem öffentlichen Bucket, weil öffentliche Blogbilder ohne signierte URL funktionieren sollen. Damit kann jemand mit der exakten Bild-URL auch das Bild eines Entwurfs abrufen; der Beitrag und die URL werden jedoch nicht öffentlich ausgeliefert. Für streng private Medien wäre ein privater Bucket mit kurzlebigen signierten URLs sinnvoll.
