import { icon } from "./icons.js";

const tabs = [
  { route: "#/", label: "Inicio", icon: "home" },
  { route: "#/recetas", label: "Recetas", icon: "list" },
  { route: "#/buscar", label: "Buscar", icon: "search" },
  { route: "#/favoritos", label: "Favoritos", icon: "heart" },
];

export function renderTabbar(currentRoute) {
  const isActive = (route) => {
    if (route === "#/") return currentRoute === "#/" || currentRoute === "";
    if (route === "#/recetas") return currentRoute.startsWith("#/recetas") || currentRoute.startsWith("#/receta/") || currentRoute.startsWith("#/capsula/");
    if (route === "#/buscar") return currentRoute === "#/buscar";
    if (route === "#/favoritos") return currentRoute === "#/favoritos";
    return false;
  };

  return `
    <nav class="tabbar" role="navigation" aria-label="Principal">
      ${tabs
        .map(
          (t) => `
        <a class="tabbar__item" href="${t.route}" ${
            isActive(t.route) ? 'aria-current="page"' : ""
          }>
          ${icon(t.icon)}
          <span>${t.label}</span>
        </a>
      `
        )
        .join("")}
    </nav>
  `;
}
