# Abgabe

## Öffentliche Bestandteile

- GitHub-Repository: `https://github.com/Janik-Preisig/M210_Bloggerapp-Projektarbeit`
- Einstieg und lokale Installation: [`README.md`](README.md)
- Bewertungsübersicht: [`BEWERTUNGSNACHWEIS.md`](BEWERTUNGSNACHWEIS.md)
- Verwendete Hilfsmittel: [`HILFSMITTEL.md`](HILFSMITTEL.md)

## Umgebungsvariablen

Die echte `.env` bleibt durch `.gitignore` vom Repository ausgeschlossen. Sie darf insbesondere keinen Supabase-`service_role`-Key enthalten. Das Frontend benötigt ausschließlich:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Falls die Lehrperson die konfigurierte `.env` zum Nachvollziehen verlangt, wird sie separat über den vereinbarten privaten Abgabekanal übermittelt. Secrets oder Zugangsdaten werden niemals in ein öffentliches GitHub-Repository committed.

## GitHub-Arbeitsweise

Neue Arbeit beginnt mit einem Issue. Dazu wird ein thematischer Branch von `main` erstellt, beispielsweise `docs/issue-1-bewertungsnachweis`. Kleine, fachlich zusammengehörige Commits werden über einen Pull Request geprüft und anschließend nach `main` gemergt. Der Pull Request verweist mit `Closes #<Nummer>` auf das zugehörige Issue.
