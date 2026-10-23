## Assessment

I don’t see an obvious direct vulnerability in the app code—there’s no backend, credential handling, or user-controlled content being inserted as HTML. The theme choice is allowlisted before use, and the build version is displayed with `textContent`, which avoids HTML interpretation.

I did find **service-worker risks**, mainly for availability and isolation if the app shares an origin with other sites or applications:

1. **Activation deletes other applications’ caches.** In [`service-worker.js`](/jeky/service-worker.js:29), the `activate` handler deletes every cache on the origin except Jeky’s current cache. If another app on the same origin uses Cache Storage, its cache will be removed. Limit cleanup to cache names with Jeky’s prefix.

2. **Cache lookup searches every cache on the origin.** In [`service-worker.js`](/jeky/service-worker.js:41), `caches.match(event.request)` can return a response from another app’s cache. Use the named Jeky cache for lookups and offline fallback, rather than searching all origin caches.

3. **The service-worker scope may be broader than intended.** [`main.js`](/jeky/assets/scripts/main.js:49) registers the worker at a relative path. Its scope is based on where the app is deployed: if served at the site root, it can control the root scope. The fetch handler may then intercept same-origin requests beyond Jeky, and failed navigations may receive Jeky’s `index.html`. Deploy it under a dedicated path or explicitly restrict its scope if the origin hosts other apps.

## Deployment checks

The repository doesn’t include server configuration, so I can’t verify what protections the live server already provides. For production, use HTTPS and configure suitable security headers—especially a Content Security Policy, `X-Content-Type-Options`, and `Referrer-Policy`. These are deployment hardening recommendations, not confirmed omissions on the live server.

**Bottom line:** the main concern is the service worker’s origin-wide cache behavior. It is primarily a cross-app availability/isolation issue, rather than evidence of an obvious remote exploit in this standalone app.