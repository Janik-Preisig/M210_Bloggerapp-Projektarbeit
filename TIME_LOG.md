# Zeiterfassung

Die effektiven Zeiten wurden nachträglich aus Arbeitsplan, Projektumfang und Git-Verlauf rekonstruiert. Sie sind ausdrücklich **Schätzwerte und keine zeitgenaue Messung**. Der Verfasser muss sie vor der Abgabe mit seinen tatsächlichen Arbeitszeiten abgleichen; erfundene Start- und Endzeiten werden nicht als Messwerte ausgegeben.

| AP | Tätigkeit | Effektiv (rekonstruiert) |
| ---: | --- | ---: |
| 1 | Anforderungen analysieren, Projektstruktur und Vite einrichten | 1 h 40 min |
| 2 | Datenmodell, SQL-Schema, Trigger und RLS-Policies erstellen | 3 h 20 min |
| 3 | Registrierung, Login, Session und geschützte Routen umsetzen | 2 h 40 min |
| 4 | Öffentliche Beitragsübersicht und Detailansicht entwickeln | 2 h 05 min |
| 5 | Dashboard, Beitrags-CRUD und Statusverwaltung umsetzen | 4 h 15 min |
| 6 | Storage-Bucket, Bildupload und Löschen von Titelbildern integrieren | 2 h 10 min |
| 7 | Adminbereich, Rollenprüfung und Moderation implementieren | 1 h 55 min |
| 8 | Responsives Design, CI, automatisierte Auth-, CRUD-, RLS- und Storage-Tests | 5 h 15 min |
| 9 | README, Deployment, Datenmodell, Review und Bewertungsnachweis | 3 h 40 min |
|  | **Total effektiv** | **26 h 00 min** |

## Auswertung

| Arbeitspaket | Geplant | Effektiv | Abweichung | Begründung |
| --- | ---: | ---: | ---: | --- |
| 1 | 1 h 30 min | 1 h 40 min | +10 min | Zusätzlicher Aufwand für Projektstruktur und Grundeinrichtung |
| 2 | 3 h 00 min | 3 h 20 min | +20 min | RLS-Regeln und Trigger benötigten zusätzliche Prüfung |
| 3 | 2 h 30 min | 2 h 40 min | +10 min | Session-Verhalten und Routenschutz wurden genauer getestet |
| 4 | 2 h 00 min | 2 h 05 min | +05 min | Nahezu gemäss Planung umgesetzt |
| 5 | 4 h 00 min | 4 h 15 min | +15 min | Statusverwaltung und Fehlerbehandlung waren etwas aufwendiger |
| 6 | 2 h 00 min | 2 h 10 min | +10 min | Upload und Bereinigung alter Titelbilder zusätzlich geprüft |
| 7 | 2 h 00 min | 1 h 55 min | −05 min | Rollenlogik konnte aus bestehenden Komponenten übernommen werden |
| 8 | 2 h 30 min | 5 h 15 min | +2 h 45 min | Zusätzliche automatisierte Auth-, RLS- und Storage-Tests sowie Korrekturen |
| 9 | 3 h 30 min | 3 h 40 min | +10 min | Mehrere Abgabe- und Nachweisdokumente wurden ergänzt |
|  | **23 h 00 min** | **26 h 00 min** | **+3 h 00 min** | **Mehraufwand vor allem durch Sicherheits- und Integrationstests** |
