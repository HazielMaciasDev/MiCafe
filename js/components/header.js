import { APP_NAME, APP_TAGLINE } from "../config.js";

export function renderHeader() {
  return `
    <header class="topbar" role="banner">
      <span class="topbar__title">${APP_NAME}</span>
      <span class="topbar__brand">café.</span>
      <a class="topbar__cta" href="#/buscar">Buscar</a>
    </header>
  `;
}
