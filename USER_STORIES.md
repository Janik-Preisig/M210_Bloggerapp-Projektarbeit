# User Stories

## Besucher

### Veröffentlichte Beiträge lesen

Als Besucher möchte ich veröffentlichte Beiträge ohne Konto sehen, damit ich die Plattform kennenlernen kann.

Akzeptanzkriterien:

- Die Startseite lädt ausschließlich Beiträge mit Status `published`.
- Titel, Kategorie, Datum und optionales Bild werden angezeigt.
- Ein Beitrag besitzt eine direkt aufrufbare Detailseite.
- Entwürfe und deaktivierte Beiträge sind auch über ihre URL nicht öffentlich lesbar.

### Konto erstellen

Als Besucher möchte ich mich mit E-Mail und Passwort registrieren, damit ich eigene Beiträge schreiben kann.

Akzeptanzkriterien:

- Anzeigename, gültige E-Mail und Passwort sind Pflichtfelder.
- Supabase erstellt den Auth-Benutzer und automatisch ein Profil.
- Bei aktivierter E-Mail-Bestätigung erhält der Benutzer einen verständlichen Hinweis.

## Blogger

### Session verwenden

Als Blogger möchte ich eingeloggt bleiben und mich ausloggen können.

Akzeptanzkriterien:

- Supabase speichert und erneuert die Session.
- Dashboard-Routen leiten Gäste zum Login weiter.
- Logout entfernt die Session und führt zur Startseite.

### Eigene Beiträge verwalten

Als Blogger möchte ich Beiträge erstellen, bearbeiten und löschen.

Akzeptanzkriterien:

- Titel, Inhalt und Kategorie werden validiert.
- Ein Beitrag kann als Entwurf oder veröffentlicht gespeichert werden.
- Im Dashboard erscheinen nur eigene Beiträge.
- Fremde Datensätze können wegen RLS weder geändert noch gelöscht werden.
- Beim Löschen wird auch das eigene Titelbild entfernt.

### Titelbild hochladen

Als Blogger möchte ich ein Titelbild hochladen, damit mein Beitrag ansprechender wirkt.

Akzeptanzkriterien:

- Nur Bilddateien bis 5 MB werden akzeptiert.
- Dateien liegen unter einem Pfad mit der eigenen User-ID.
- Nur Eigentümer und Admin dürfen Dateien verändern oder löschen.
- Bei einem fehlgeschlagenen Speichern wird der neue Upload aufgeräumt.

## Administrator

### Inhalte moderieren

Als Admin möchte ich alle Beiträge sehen, deaktivieren und löschen können.

Akzeptanzkriterien:

- `/admin` ist nur mit Profilrolle `admin` erreichbar.
- Normale Benutzer werden zum Dashboard umgeleitet.
- RLS erlaubt Adminaktionen serverseitig und verlässt sich nicht nur auf die Oberfläche.
- Deaktivierte Beiträge verschwinden sofort aus dem öffentlichen Bereich.
