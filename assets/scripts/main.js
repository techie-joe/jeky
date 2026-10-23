const THEME_STORAGE_KEY = "theme";
const themeSelect = document.querySelector("#theme-select");
const darkThemeLink = document.querySelector("#dark-theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const settingsDialog = document.querySelector("#settings-dialog");
document.querySelector("#build-version").textContent =
  document.querySelector('meta[name="build-version"]').content;

document.querySelector("#settings-button").addEventListener("click", () => {
  settingsDialog.showModal();
});

document.querySelector("#settings-close").addEventListener("click", () => {
  settingsDialog.close();
});

function loadTheme(theme = localStorage.getItem(THEME_STORAGE_KEY)) {
  const selectedTheme = ["system", "light", "dark"].includes(theme) ? theme : "system";
  const effectiveTheme = selectedTheme === "system"
    ? (systemTheme.matches ? "dark" : "light")
    : selectedTheme;

  darkThemeLink.disabled = effectiveTheme !== "dark";
  document.documentElement.dataset.theme = effectiveTheme;
  themeSelect.value = selectedTheme;

  return selectedTheme;
}

themeSelect.addEventListener("change", () => {
  localStorage.setItem(THEME_STORAGE_KEY, themeSelect.value);
  loadTheme(themeSelect.value);
});

systemTheme.addEventListener("change", () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (!["light", "dark"].includes(savedTheme)) loadTheme();
});

loadTheme();

const installButton = document.querySelector("#install-button");
let installPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) return;

  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
  installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}