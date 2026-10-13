import { recipes, recipeTypes, intensityFilters } from "../data/recipes.js";
import { capsules, capsuleById, familyLabel } from "../data/capsules.js";
import { icon } from "../components/icons.js";

let currentType = "all";
let currentIntensity = "all";
let currentQuery = "";

export function renderSearch(state) {
  return `
    <div class="view">
      <section class="hero" style="padding-bottom: 0">
        <h1 class="hero__title" style="font-size: clamp(48px, 14vw, 72px)">
          <em>Buscar</em>
        </h1>
        <p class="hero__sub">Por nombre, cápsula o momento del día.</p>
      </section>

      <div class="search">
        <div class="search__field">
          ${icon("search")}
          <input class="search__input" id="search-input" type="search"
            placeholder="espresso, leche, kazaar…"
            value="${escapeAttr(currentQuery)}"
            autocomplete="off" enterkeyhint="search" />
          <button class="search__clear" id="search-clear" type="button">Limpiar</button>
        </div>
      </div>

      <div class="filters" data-filters="type">
        ${recipeTypes
          .map(
            (f) => `
          <button class="pill pill--ghost" data-filter="type" data-value="${f.id}"
            aria-pressed="${f.id === currentType}">${f.label}</button>
        `
          )
          .join("")}
      </div>
      <div class="filters" data-filters="intensity">
        ${intensityFilters
          .map(
            (f) => `
          <button class="pill pill--ghost" data-filter="intensity" data-value="${f.id}"
            aria-pressed="${f.id === currentIntensity}">${f.label}</button>
        `
          )
          .join("")}
      </div>

      <section id="search-results" class="section">
        ${renderResults()}
      </section>
    </div>
  `;
}

function renderResults() {
  const q = currentQuery.trim().toLowerCase();
  const filteredRecipes = recipes.filter((r) => {
    if (currentType !== "all" && r.type !== currentType) return false;
    if (currentIntensity !== "all" && r.intensity !== currentIntensity) return false;
    if (q) {
      const capsule = capsuleById(r.capsuleId);
      const hay = [
        r.name,
        r.blurb,
        ...r.ingredients.map((i) => i.name),
        capsule?.name || "",
        ...(r.notes || []),
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const filteredCapsules = capsules.filter((c) => {
    if (currentIntensity !== "all") {
      const fam = c.family === currentIntensity;
      if (!fam) return false;
    }
    if (q) {
      const hay = [c.name, c.origin, ...(c.notes || [])].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (filteredRecipes.length === 0 && filteredCapsules.length === 0) {
    return `
      <div class="empty">
        <p class="empty__title">Sin resultados</p>
        <p class="section__lead" style="margin: 0 auto;">Prueba con otra palabra o relaja los filtros.</p>
      </div>
    `;
  }

  return `
    ${filteredRecipes.length
      ? `
      <div class="section__eyebrow"><span class="label">Recetas</span></div>
      <div class="recipe-list">
        ${filteredRecipes
          .map(
            (r) => `
          <a class="recipe-list__item" href="#/receta/${r.id}">
            <span>
              <span class="recipe-list__name">${r.name}</span>
              <span class="recipe-list__sub">${labelForType(r.type)}</span>
            </span>
            ${icon("chevron")}
          </a>
        `
          )
          .join("")}
      </div>`
      : ""
    }
    ${
      filteredCapsules.length
        ? `
        <div class="section__eyebrow mt-6"><span class="label">Cápsulas</span></div>
        <div class="capsule-row" role="list">
          ${filteredCapsules
            .map(
              (c) => `
            <a class="capsule-row__item" href="#/capsula/${c.id}" style="--swatch:${c.pod}">
              <span class="capsule-row__swatch"></span>
              <span class="capsule-row__name">
                <strong>${c.name}</strong>
                <span>${c.size} · ${familyLabel(c.family)}</span>
              </span>
              <span class="capsule-row__meta">
                <span class="capsule-row__intensity">
                  ${Array.from({ length: 12 })
                    .map((_, i) => `<i class="${i < c.intensity ? "on" : ""}"></i>`)
                    .join("")}
                </span>
                <span>Int. ${c.intensity}</span>
              </span>
            </a>
          `
            )
            .join("")}
        </div>`
        : ""
    }
  `;
}

export function bindSearch(root) {
  const input = root.querySelector("#search-input");
  const clear = root.querySelector("#search-clear");
  const results = root.querySelector("#search-results");

  input.addEventListener("input", (e) => {
    currentQuery = e.target.value;
    results.innerHTML = renderResults();
  });

  clear.addEventListener("click", () => {
    currentQuery = "";
    input.value = "";
    input.focus();
    results.innerHTML = renderResults();
  });

  root.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const kind = btn.getAttribute("data-filter");
      const value = btn.getAttribute("data-value");
      if (kind === "type") currentType = value;
      if (kind === "intensity") currentIntensity = value;
      // refresh pill state
      root
        .querySelectorAll(`[data-filter="${kind}"]`)
        .forEach((b) => b.setAttribute("aria-pressed", String(b.getAttribute("data-value") === value)));
      results.innerHTML = renderResults();
    });
  });
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

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
