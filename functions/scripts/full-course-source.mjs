{
  "name": "cws-academy-site",
  "private": true,
  "type": "module",
  "scripts": {
    "migrate:protected:dry-run": "node functions/scripts/migrate-protected-content.mjs",
    "migrate:protected": "node functions/scripts/migrate-protected-content.mjs --apply"
  }
}