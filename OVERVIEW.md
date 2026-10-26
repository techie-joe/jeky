# Project Overview

Jeky is a small, installable progressive web app built with plain HTML, CSS, and JavaScript. It features a simple interface with theme settings and a shell for offline use.

## About

This document is the structural source of truth for the project. It describes the system design, files and directories, core modules, and their relationships and data flow.

## Directory Structure

- `.gitattributes` — configures automatic text-file line-ending normalization.
- `.github/` — GitHub-specific project configuration.
- `.github/instructions/` — Copilot instruction files for assessment updates, project documentation, and version updates.
- `.github/instructions/assessment.instructions.md` — guidance for adding new assessments at the top of the `New Assessments` list.
- `.github/instructions/overview.instructions.md` — guidance for keeping this structural overview accurate and implementation-verified.
- `.github/instructions/update-version.instructions.md` — guidance for synchronizing the displayed build version and service-worker version.
- `ASSESSMENT.md` — records project assessments and past security review notes.
- `assets/` — static application assets.
- `assets/images/` — app image assets.
- `assets/images/icon.svg` — SVG app and browser icon.
- `assets/scripts/` — application JavaScript.
- `assets/scripts/main.js` — hash-based page display, main-menu controls, settings dialog, theme selection and persistence, system preference handling, install prompt, build-version display, randomized delays for the animated background lines, and service-worker registration.
- `assets/themes/` — application stylesheets.
- `assets/themes/dark-style.css` — dark-theme overrides enabled by the theme controller.
- `assets/themes/main-style.css` — layout and light-theme styles for navigation, pages, settings, and animated background lines.
- `assets/themes/normalization.css` — consistent baseline across browser defaults.
- `assets/themes/style.css` — stylesheet entry point importing normalization and main styles.
- `index.html` — app document, metadata, stylesheet and script entry points, navigation, four page sections, and settings dialog.
- `manifest.webmanifest` — PWA name, launch scope, standalone display mode, colors, and icon.
- `OVERVIEW.md` — this structural source of truth.
- `README.md` — project introduction and current and previous build-version notes.
- `service-worker.js` — precaches app assets and build metadata, removes older Jeky caches on activation, and serves cached content with an offline navigation fallback.

## Core Modules

- **App shell and pages — `index.html`:** Defines document metadata, app navigation, page sections for Home, About, Services, and Contact, and the settings dialog. It loads the manifest, stylesheets, and deferred application script.
- **Page navigation — `index.html` and `assets/scripts/main.js`:** Menu links target page IDs in the URL hash. `showPage()` displays the section matching the hash, defaults to Home for an unknown or empty hash, and runs on initial load and `hashchange`.
- **Main menu — `index.html`, `assets/scripts/main.js`, and `assets/themes/`:** The menu toggle opens a panel that slides in from the left. The close button, Escape key, and menu links close it; focus returns to the toggle, background scrolling is locked while open, and hidden menu content is made inert. Styles support dark theme and reduced-motion preferences.
- **Settings and themes — `index.html` and `assets/scripts/main.js`:** The settings button opens a modal dialog. `loadTheme()` validates the saved choice, resolves the system preference when needed, and applies the theme by toggling the dark stylesheet and document theme. Theme changes persist to `localStorage`; a system-preference listener updates the effective theme when system mode is selected.
- **PWA installation — `index.html` and `assets/scripts/main.js`:** The install button is shown after `beforeinstallprompt`, invokes the saved install prompt when clicked, and is hidden after the prompt or app installation.
- **Offline app shell — `service-worker.js`:** The `install` handler precaches app files and build metadata. The `activate` handler deletes older caches with the `jeky-` prefix and claims clients. The `fetch` handler handles same-origin GET requests from cache when possible, otherwise uses the network; failed navigation requests fall back to cached `index.html`, and other failed requests return an error response.
- **Styles and theme — `assets/themes/` and `assets/scripts/main.js`:** `style.css` imports normalization and main styles. `dark-style.css` supplies dark-theme overrides and is enabled by the theme controller. The main stylesheet defines the animated background lines and their drop animation; `main.js` randomizes their animation delays on page load. Styles also respect reduced motion for the sliding menu.
- **PWA metadata and icon — `manifest.webmanifest` and `assets/images/icon.svg`:** The manifest configures app identity, launch behavior, display mode, colors, and the SVG icon used for installation.
- **Build version:** `index.html` provides the version shown in settings. Keep it in sync with the `BUILD_VERSION` constant in `service-worker.js`, which names the cache and stores it as build metadata.

## Notes

- (none)