# Projekt-Pitch

## Ausgangslage

Persönliche Inhalte werden häufig in einzelnen Dokumenten oder unübersichtlichen Notizen gesammelt. Sobald mehrere Personen dieselbe Anwendung verwenden, müssen ihre Daten zuverlässig voneinander getrennt und trotzdem ausgewählte Inhalte öffentlich teilbar sein.

## Lösung

Die Blogger App ist eine multiuser-fähige Webanwendung zur Verwaltung persönlicher Blogbeiträge. Besucher lesen veröffentlichte Beiträge ohne Konto. Registrierte Benutzer erstellen, bearbeiten und löschen ihre eigenen Entwürfe und Veröffentlichungen. Supabase Auth identifiziert die Benutzer, PostgreSQL speichert Profile und Beiträge und Row Level Security erzwingt die Zugriffsregeln direkt in der Datenbank.

## Nutzen

- persönliche Beiträge übersichtlich an einem Ort verwalten
- ausgewählte Inhalte öffentlich teilen
- fremde Entwürfe und Bearbeitungsfunktionen serverseitig schützen
- Titelbilder hochladen und Beiträge visuell gestalten
- problematische Inhalte durch eine Administratorrolle moderieren

Damit erfüllt das Projekt den geforderten Anwendungsfall einer persönlichen, multiuser-fähigen Verwaltungs-Webapp mit zwei verbundenen Kerntabellen (`profiles` und `posts`).
