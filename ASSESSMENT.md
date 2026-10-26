# Assessments

## New Assessments
- (none)

## Past Assessments

- On activation, the `activate` handler (of the service worker) deletes every cache on the origin except its own, not only older caches. This is normal intended browser behavior.
- An unrelated app’s cache would be deleted if its name starts with `jeky-`.
- For production, use HTTPS and configure suitable security headers—especially a Content Security Policy, `X-Content-Type-Options`, and `Referrer-Policy`. These are deployment hardening recommendations, not confirmed omissions on the live server.
- Latest assesment as of 24/10/2026 : No confirmed security vulnerabilities were found.
- PERFECT!