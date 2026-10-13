import { renderHeader } from "./components/header.js";
import { renderTabbar } from "./components/tabbar.js";
import { renderHome } from "./views/home.js";
import { renderCapsule, bindCapsuleFavorites } from "./views/capsule.js";
import { renderRecipe, bindRecipeFavorites, bindSteps } from "./views/recipe.js";
import { renderSearch, bindSearch } from "./views/search.js";
import { renderFavorites, bindFavorites } from "./views/favorites.js";
import { renderRecipeList } from "./views/recipeList.js";
import { subscribe, state } from "./state.js";

const app = document.getElementById("app");

function parseHash() {
  const raw = (location.hash || "#/").replace(/^#/, "");
  const [path, ...rest] = raw.split("/").filter(Boolean);
  const params = {};
  if (path === "capsula" && rest[0]) params.id = decodeURIComponent(rest[0]);
  else if (path === "receta" && rest[0]) params.id = decodeURIComponent(rest[0]);
  return { path: path || "", params, route: "#" + (raw.startsWith("/") ? raw : "/" + raw) };
}

function render() {
  const { path, params, route } = parseHash();
  const viewState = { favorites: state.favorites };

  let viewHtml = "";
  let afterMount = null;

  if (!path) {
    viewHtml = renderHome(viewState);
  } else if (path === "capsula") {
    viewHtml = renderCapsule(params, viewState);
    afterMount = (root) => bindCapsuleFavorites(root);
  } else if (path === "receta") {
    viewHtml = renderRecipe(params, viewState);
    afterMount = (root) => {
      bindRecipeFavorites(root);
      bindSteps(root);
    };
  } else if (path === "recetas") {
    viewHtml = renderRecipeList();
  } else if (path === "buscar") {
    viewHtml = renderSearch(viewState);
    afterMount = (root) => bindSearch(root);
  } else if (path === "favoritos") {
    viewHtml = renderFavorites(viewState);
    afterMount = (root) => bindFavorites(root);
  } else {
    viewHtml = renderHome(viewState);
  }

  app.innerHTML = `
    ${renderHeader()}
    <main class="main" id="main">${viewHtml}</main>
    ${renderTabbar(route)}
  `;
  app.setAttribute("aria-busy", "false");

  if (afterMount) afterMount(app);

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

window.addEventListener("hashchange", render);

// Re-render when favorites change so the list view stays in sync
subscribe(() => {
  if (parseHash().path === "favoritos") render();
});

document.addEventListener("DOMContentLoaded", render);

// Fallback: if module loads after DOMContentLoaded
if (document.readyState !== "loading") render();
