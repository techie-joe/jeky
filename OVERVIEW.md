# Project Overview

Jeky is a small, installable progressive web app built with plain HTML, CSS, and JavaScript. It features a simple interface with theme settings and a shell for offline use.

## About

This document serves as the structural source of truth for the project. It outlines the overall system design, details every file and directory in the codebase along with its specific purpose and design rationale, maps out core functions and modules, and defines the relationships and data flow between them.

## Target Audience

Developers, maintainers, and AI collaborators working on the project.

## Directory Structure

- `.gitattributes` — enables automatic text-file line-ending normalization for consistent repository handling.
- `OVERVIEW.md` — the structural source of truth for the project.
- `README.md` — brief project introduction and current build-version notes.
- `index.html` — app document, metadata, stylesheet and script entry points, home screen, and settings dialog.
- `manifest.webmanifest` — PWA name, launch scope, standalone display mode, colors, and icon.
- `service-worker.js` — precaches app assets, removes stale caches on activation, and serves cached content with an offline navigation fallback.
- `assets/images/icon.svg` — SVG app and browser icon.
- `assets/scripts/main.js` — settings dialog controls, theme selection and persistence, system preference handling, install prompt handling, build-version display, and service-worker registration.
- `assets/themes/style.css` — stylesheet entry point importing normalization and main app styles.
- `assets/themes/normalization.css` — consistent baseline across browser defaults.
- `assets/themes/main-style.css` — layout and light-theme styles for the home screen and settings dialog.
- `assets/themes/dark-style.css` — dark-theme overrides, enabled by the theme controller.

## Core Modules

- **App shell — `index.html`:** Defines the page, settings dialog, metadata, and links to the stylesheets and deferred script.
- **Settings and themes — `assets/scripts/main.js`:** Opens and closes the settings dialog. `loadTheme()` validates the saved choice, resolves the system preference when needed, and applies the theme. A change listener saves the selection to `localStorage`; a system-preference listener updates the theme when system mode is active.
- **PWA installation — `assets/scripts/main.js`:** Handles `beforeinstallprompt` to show the install button, prompts when the button is clicked, and hides it after installation.
- **Offline app shell — `service-worker.js`:** The `install` handler precaches app files and build metadata. The `activate` handler removes caches other than its own and claims clients. The `fetch` handler serves same-origin GET requests from cache when possible, otherwise fetches from the network; failed navigation requests fall back to the cached `index.html`.
- **Styles — `assets/themes/`:** `style.css` imports normalization and main styles. `dark-style.css` provides dark-theme overrides and is enabled by the theme controller.
- **Build version:** `index.html` provides the version shown in settings. `service-worker.js` uses its version constant to name the cache and store build metadata.

## Notes

- On activation, the `activate` handler (of the service worker) deletes every cache on the origin except its own, not only older caches.