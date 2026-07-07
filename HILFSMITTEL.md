# Hilfsmittel und Eigenleistung

Diese Datei kennzeichnet verwendete Hilfsmittel transparent. Sie soll eine klare Abgrenzung ermöglichen und verschweigt keine KI-Unterstützung.

## Verwendete Hilfsmittel

| Hilfsmittel | Einsatz |
| --- | --- |
| OpenAI Codex | Unterstützung bei Planung, Code-Erstellung, Fehlersuche, Dokumentation sowie Git- und GitHub-Organisation |
| Supabase-Dokumentation | Referenz für Authentifizierung, PostgreSQL Row Level Security und Storage-Policies |
| React- und Vite-Dokumentation | Referenz für Komponenten, Routing, Build und Entwicklungsumgebung |
| GitHub-Dokumentation | Referenz für Actions, Issues, Branches und Pull Requests |
| ESLint | Automatische statische Prüfung des JavaScript- und React-Codes |

## Verantwortung des Verfassers

KI-generierte oder vorgeschlagene Inhalte sind nicht automatisch ein Nachweis des eigenen Verständnisses. Der Verfasser ist dafür verantwortlich,

- jede Datei und jede technische Entscheidung nachvollziehen und erklären zu können,
- Vorschläge vor der Übernahme fachlich zu prüfen,
- Supabase-Konfiguration, Rollen und RLS-Regeln praktisch zu testen,
- effektive Arbeitszeiten persönlich und wahrheitsgemäß einzutragen,
- die finale Anwendung selbst vorzuführen und offene Einschränkungen zu benennen.

## Entstehung und Git-Historie

Ein wesentlicher Teil des initialen Projektstands wurde mit Unterstützung von OpenAI Codex vorbereitet und am 30.06.2026 in kurzer Folge in fachlich getrennte Commits überführt. Die dichten Commit-Zeitstempel bilden daher nicht die Dauer der einzelnen Arbeitspakete ab. Spätere Sicherheitsprüfungen wurden über eigene Issues, Feature-Branches und die gemergten Pull Requests #6 und #7 nachvollziehbar ergänzt. Diese Einordnung ist bewusst dokumentiert, damit die Historie nicht fälschlich als zeitgenaues Arbeitsprotokoll verstanden wird.

## Fremdkomponenten

Die verwendeten Laufzeit- und Entwicklungsabhängigkeiten sind in `package.json` und `package-lock.json` mit ihren Versionen aufgeführt. Supabase stellt die verwalteten Systeme für Authentifizierung, Datenbank und Storage bereit. Diese Komponenten sind nicht selbst entwickelt; die anwendungsspezifische Konfiguration, das Datenmodell und die Zugriffsregeln liegen im Repository.
