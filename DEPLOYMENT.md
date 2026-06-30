# Deployment

## Variante 1: Vercel oder Netlify

1. GitHub-Repository mit dem Anbieter verbinden.
2. Build-Befehl `npm run build` und Ausgabeordner `dist` setzen.
3. `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` als Umgebungsvariablen hinterlegen.
4. Für SPA-Routing alle unbekannten Pfade auf `/index.html` umleiten.
5. Die produktive URL in Supabase unter **Authentication → URL Configuration** als Site URL und erlaubte Redirect URL ergänzen.

Beispiel für Netlify in `public/_redirects`: `/* /index.html 200`. Bei Vercel kann derselbe Rewrite über `vercel.json` gesetzt werden.

## Variante 2: Statischer Webserver

`npm run build` erzeugt den Ordner `dist/`. Dieser kann mit Nginx, Apache oder einem S3-kompatiblen Static Host ausgeliefert werden. Der Webserver muss bei Client-Routen wie `/post/…` als Fallback `index.html` liefern.

## Datenbank

Vor dem ersten Release `supabase/schema.sql` im Zielprojekt ausführen. Änderungen am Schema sollten später als nummerierte Migrationen versioniert und zuerst in einer Staging-Instanz getestet werden.

## Release-Checkliste

- GitHub Action ist grün
- Produktionsvariablen enthalten nur URL und öffentlichen Anon/Publishable Key
- `service_role` ist weder im Repository noch im Browser-Bundle
- Auth Site URL und Redirect URLs stimmen
- Registrierung, Login und E-Mail-Bestätigung wurden produktiv getestet
- RLS wurde mit Gast, zwei normalen Konten und einem Admin geprüft
- Direkter Aufruf einer Detailroute funktioniert nach einem Reload
