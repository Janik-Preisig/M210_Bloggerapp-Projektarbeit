# Arbeitsplan

| AP | Arbeitspaket | Ergebnis | Schätzung |
| --- | --- | --- | ---: |
| 1 | Analyse und Setup | Anforderungen, Vite-Projekt, Ordnerstruktur | 1.5 h |
| 2 | Datenmodell und Sicherheit | Tabellen, Trigger, Indizes, RLS-Policies | 3.0 h |
| 3 | Authentifizierung | Registrierung, Login, Session, Routenschutz | 2.5 h |
| 4 | Public-Bereich | Übersicht und Detailansicht | 2.0 h |
| 5 | Blogger-Dashboard | eigenes CRUD, Statusverwaltung | 4.0 h |
| 6 | File Upload | Storage-Bucket, Upload und Aufräumen | 2.0 h |
| 7 | Administration | Rollenprüfung und Moderation | 2.0 h |
| 8 | Qualität und CI | Responsive CSS, Lint, Build, GitHub Actions | 2.5 h |
| 9 | Tests und Dokumentation | manuelle Tests, Projektunterlagen, Review | 3.5 h |
|  | **Total geplant** |  | **23.0 h** |

## Reihenfolge

Das Datenmodell wird vor den Oberflächen festgelegt, weil die RLS-Regeln Teil der Fachlogik sind. Danach folgen vertikale Funktionsschnitte: Auth, Public, CRUD, Upload und Admin. Am Schluss werden alle Rollen mit getrennten Testkonten geprüft.

## Definition of Done

- Akzeptanzkriterien der zugehörigen User Story erfüllt
- Fehlerfälle geben eine sichtbare Meldung aus
- Zugriff wurde als Gast, Besitzer, fremder Benutzer und Admin geprüft
- `npm run lint` und `npm run build` laufen ohne Fehler
- Dokumentation entspricht dem implementierten Stand
