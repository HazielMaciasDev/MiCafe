import { recipes } from "../data/recipes.js";
import { icon } from "../components/icons.js";

export function renderRecipeList() {
  // Group by type for an editorial cadence
  const groups = [
    { id: "espresso", title: "Espresso", label: "40 ml · cortos" },
    { id: "lungo", title: "Lungo", label: "110 ml · largos" },
    { id: "leche", title: "Con leche", label: "necesitas espumador" },
    { id: "iced", title: "Para servir frío", label: "verano · vermut" },
  ];

  return `
    <div class="view">
      <section class="hero">
        <div class="hero__row">
          <span class="pill pill--coral">${recipes.length} recetas</span>
          <span class="pill pill--apricot">Original Line</span>
        </div>
        <h1 class="hero__title" style="font-size: clamp(56px, 16vw, 88px)">
          <em>Recetas</em><br>
          <em>curadas</em>
        </h1>
        <p class="hero__sub">Ordenadas por tipo de preparación. Toca cualquiera para abrir la guía paso a paso.</p>
      </section>

      ${groups
        .map((g) => {
          const items = recipes.filter((r) => r.type === g.id);
          if (items.length === 0) return "";
          return `
            <section class="section section--first">
              <div class="section__eyebrow">
                <span class="label">${g.title}</span>
                <span class="label" style="color: var(--color-ash-soft)">${g.label}</span>
              </div>
              <div class="recipe-list">
                ${items
                  .map(
                    (r) => `
                  <a class="recipe-list__item" href="#/receta/${r.id}">
                    <span>
                      <span class="recipe-list__name">${r.name}</span>
                      <span class="recipe-list__sub">${intensityLabel(r.intensity)} · ${g.label}</span>
                    </span>
                    ${icon("chevron")}
                  </a>
                `
                  )
                  .join("")}
              </div>
            </section>
            <hr class="hairline" />
          `;
        })
        .join("")}
    </div>
  `;
}

function intensityLabel(level) {
  return (
    { suave: "Suave", medio: "Medio", intenso: "Intenso" }[level] || "Café"
  );
}
