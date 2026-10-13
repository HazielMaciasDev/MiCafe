import { state, isFavorite, removeFavorite } from "../state.js";
import { capsuleById, familyLabel } from "../data/capsules.js";
import { recipeById } from "../data/recipes.js";
import { icon } from "../components/icons.js";
import { showToast } from "../components/toast.js";

export function renderFavorites(state) {
  const favs = state.favorites
    .map((key) => parseKey(key))
    .filter(Boolean);

  const favCapsules = favs
    .filter((f) => f.kind === "capsule")
    .map((f) => capsuleById(f.id))
    .filter(Boolean);

  const favRecipes = favs
    .filter((f) => f.kind === "recipe")
    .map((f) => recipeById(f.id))
    .filter(Boolean);

  if (favs.length === 0) {
    return `
      <div class="view">
        <section class="hero">
          <h1 class="hero__title" style="font-size: clamp(48px, 14vw, 72px)">
            <em>Tus favoritos</em>
          </h1>
          <p class="hero__sub">Pulsa el corazón en cualquier cápsula o receta para guardarla aquí.</p>
        </section>
        <div class="empty">
          <p class="empty__title">Aún no has guardado nada.</p>
          <p class="section__lead" style="margin: 0 auto var(--space-6);">Empieza por las cápsulas del catálogo o las recetas imprescindibles.</p>
          <a class="cta" href="#/">Ver cápsulas</a>
        </div>
      </div>
    `;
  }

  return `
    <div class="view">
      <section class="hero" style="padding-bottom: 0">
        <h1 class="hero__title" style="font-size: clamp(48px, 14vw, 72px)">
          <em>Tus favoritos</em>
        </h1>
        <p class="hero__sub">${favs.length} ${favs.length === 1 ? "elemento guardado" : "elementos guardados"}.</p>
      </section>

      ${
        favRecipes.length
          ? `
        <section class="section section--first">
          <div class="section__eyebrow"><span class="label">Recetas</span></div>
          <div class="recipe-list">
            ${favRecipes
              .map(
                (r) => `
              <div class="recipe-list__item" style="grid-template-columns: 1fr auto auto;">
                <a href="#/receta/${r.id}">
                  <span class="recipe-list__name">${r.name}</span>
                  <span class="recipe-list__sub">${labelForType(r.type)}</span>
                </a>
                <a href="#/receta/${r.id}" aria-label="Ver receta" style="display:grid;place-items:center;padding:0 8px;">
                  ${icon("chevron")}
                </a>
                <button class="search__clear" data-remove="recipe" data-id="${r.id}" aria-label="Quitar">${icon("close")}</button>
              </div>
            `
              )
              .join("")}
          </div>
        </section>`
          : ""
      }

      ${
        favCapsules.length
          ? `
        <section class="section">
          <div class="section__eyebrow"><span class="label">Cápsulas</span></div>
          <div class="capsule-row" role="list">
            ${favCapsules
              .map(
                (c) => `
              <div class="capsule-row__item" style="grid-template-columns: 56px 1fr auto auto; cursor: default;">
                <a href="#/capsula/${c.id}" class="capsule-row__swatch" style="--swatch:${c.pod}"></a>
                <a href="#/capsula/${c.id}" class="capsule-row__name">
                  <strong>${c.name}</strong>
                  <span>${c.size} · ${familyLabel(c.family)}</span>
                </a>
                <a href="#/capsula/${c.id}" class="capsule-row__meta" style="text-decoration:none;">
                  <span class="capsule-row__intensity">
                    ${Array.from({ length: 12 })
                      .map((_, i) => `<i class="${i < c.intensity ? "on" : ""}"></i>`)
                      .join("")}
                  </span>
                  <span>Int. ${c.intensity}</span>
                </a>
                <button class="search__clear" data-remove="capsule" data-id="${c.id}" aria-label="Quitar" style="padding: 0 8px;">${icon("close")}</button>
              </div>
            `
              )
              .join("")}
          </div>
        </section>`
          : ""
      }
    </div>
  `;
}

export function bindFavorites(root) {
  root.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const kind = btn.getAttribute("data-remove");
      const id = btn.getAttribute("data-id");
      removeFavorite({ kind, id });
      showToast("Eliminado");
      // Re-render is handled by router listener; trigger a soft re-render:
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
  });
}

function parseKey(key) {
  if (typeof key !== "string") return null;
  const [kind, id] = key.split(":");
  if (!kind || !id) return null;
  return { kind, id };
}

function labelForType(type) {
  return (
    {
      espresso: "Espresso · 40 ml",
      lungo: "Lungo · 110 ml",
      leche: "Con leche",
      iced: "Para servir frío",
    }[type] || "Receta"
  );
}
