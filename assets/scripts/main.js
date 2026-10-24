const THEME_STORAGE_KEY = "theme";
const themeSelect = document.querySelector("#theme-select");
const darkThemeLink = document.querySelector("#dark-theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const settingsDialog = document.querySelector("#settings-dialog");
const menuButton = document.querySelector("#menu-button");
const mainMenu = document.querySelector("#main-menu");
const menuCloseButton = document.querySelector("#menu-close");
const pages = [...document.querySelectorAll(".page")];
const homePage = document.querySelector("#home");
document.querySelector("#build-version").textContent =
  "Build: " + document.querySelector('meta[name="build-version"]').content;

function showPage() {
  const pageId = window.location.hash.slice(1);
  const activePage = pages.find((page) => page.id === pageId) || homePage;
  pages.forEach((page) => {
    page.hidden = page !== activePage;
  });
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  mainMenu.classList.remove("is-open");
  mainMenu.setAttribute("aria-hidden", "true");
  mainMenu.inert = true;
  document.body.classList.remove("menu-open");
  menuButton.focus();
}

function openMenu() {
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation menu");
  mainMenu.classList.add("is-open");
  mainMenu.setAttribute("aria-hidden", "false");
  mainMenu.inert = false;
  document.body.classList.add("menu-open");
  menuCloseButton.focus();
}

menuButton.addEventListener("click", () => {
  if (menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
  } else {
    openMenu();
  }
});

menuCloseButton.addEventListener("click", closeMenu);
mainMenu.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) closeMenu();
});
window.addEventListener("hashchange", showPage);
showPage();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
  }
});

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