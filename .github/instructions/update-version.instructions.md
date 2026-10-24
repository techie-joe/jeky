---
description: "Use when asked to update, bump, or change the project's build version."
---
# Build Version Updates

- Before editing, confirm the exact new version with the user. Do not implement a version change until they confirm it.
- Keep the version shown in `index.html` synchronized with the `BUILD_VERSION` constant in `service-worker.js`. The constant is used for the cache name and build metadata.
- Update both locations to the confirmed version, preserving the project's existing version format.
