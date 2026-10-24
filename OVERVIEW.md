# Project Overview

Jeky is a small, installable progressive web app built with plain HTML, CSS, and JavaScript. It features a simple interface with theme settings and a shell for offline use.

## About

This document serves as the structural source of truth for the project. It outlines the overall system design, details every file and directory in the codebase along with its specific purpose and design rationale, maps out core functions and modules, and defines the relationships and data flow between them.

## Directory Structure

- `.gitattributes` — enables automatic text-file line-ending normalization for consistent repository handling.
- `OVERVIEW.md` — the structural source of truth for the project.
- `README.md` — brief project introduction and current build-version notes.
- `index.html` — app document, metadata, stylesheet and script entry points, sliding main navigation, home screen, and settings dialog.
- `manifest.webmanifest` — PWA name, launch scope, standalone display mode, colors, and icon.
- `service-worker.js` — precaches app assets, removes stale caches on activation, and serves cached content with an offline navigation fallback.
- `assets/images/icon.svg` — SVG app and browser icon.
- `assets/scripts/main.js` — main-menu controls, settings dialog controls, theme selection and persistence, system preference handling, install prompt handling, build-version display, and service-worker registration.
- `assets/themes/style.css` — stylesheet entry point importing normalization and main app styles.
- `assets/themes/normalization.css` — consistent baseline across browser defaults.
- `assets/themes/main-style.css` — layout and light-theme styles for the sliding main menu, home screen, and settings dialog.
- `assets/themes/dark-style.css` — dark-theme overrides for the main menu and settings dialog, enabled by the theme controller.

## Core Modules

- **App shell — `index.html`:** Defines the page, main and settings navigation, metadata, and links to the stylesheets and deferred script. The main navigation contains the menu toggle and a full-viewport menu panel with placeholder links.
- **Main navigation — `index.html`, `assets/scripts/main.js`, and `assets/themes/`:** The menu toggle opens a full-height, full-width panel that slides in from the left. The close button, Escape key, and menu links close it; focus returns to the toggle, background scrolling is locked while open, and hidden menu content is made inert. Styles support dark theme and reduced-motion preferences.
- **Settings and themes — `assets/scripts/main.js`:** Opens and closes the settings dialog. `loadTheme()` validates the saved choice, resolves the system preference when needed, and applies the theme. A change listener saves the selection to `localStorage`; a system-preference listener updates the theme when system mode is active.
- **PWA installation — `assets/scripts/main.js`:** Handles `beforeinstallprompt` to show the install button, prompts when the button is clicked, and hides it after installation.
- **Offline app shell — `service-worker.js`:** The `install` handler precaches app files and build metadata. The `activate` handler removes caches other than its own and claims clients. The `fetch` handler serves same-origin GET requests from cache when possible, otherwise fetches from the network; failed navigation requests fall back to the cached `index.html`.
- **Styles — `assets/themes/`:** `style.css` imports normalization and main styles. `dark-style.css` provides dark-theme overrides and is enabled by the theme controller.
- **Build version:** `index.html` provides the version shown in settings. Keep it in sync with the `BUILD_VERSION` constant in `service-worker.js`, which names the cache and stores build metadata.

## Notes

- (none)