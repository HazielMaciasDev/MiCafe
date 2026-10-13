import { capsules, familyLabel } from "../data/capsules.js";
import { recipes } from "../data/recipes.js";
import { icon } from "../components/icons.js";

export function renderHome(state) {
  const featured = ["kazaar", "arpeggio", "volluto", "ristretto", "fortissio-lungo", "master-origin-ethiopia"]
    .map((id) => capsules.find((c) => c.id === id))
    .filter(Boolean);

  const featuredRecipes = ["espresso-clasico", "cortado", "capuchino", "cafe-helado"]
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  return `
    <div class="view">
      <section class="hero">
        <div class="hero__row">
          <span class="pill pill--coral">Essenza Mini</span>
          <span class="pill pill--apricot">Original Line</span>
          <span class="pill pill--meadow">${capsules.length} cápsulas</span>
        </div>
        <h1 class="hero__title">
          <em>Recetas para tu</em><br>
          <em>Essenza,</em><br>
          <em>sin dudar.</em>
        </h1>
        <p class="hero__sub">
          Una guía quieta para tu cafetera. Notas de cata, tiempos exactos y combinaciones con leche, todo en un solo lugar.
        </p>
        <div class="hero__meta">
          <span class="hero__dot"></span>
          <span class="label label--bone">${recipes.length} recetas curadas</span>
        </div>
      </section>

      <hr class="hairline" />

      <section class="section section--first">
        <div class="section__eyebrow"><span class="label">Curado</span></div>
        <h2 class="section__title">Cápsulas para<br/>empezar</h2>
        <p class="section__lead">Las seis que mejor se entienden con tu Essenza. Escoge una para ver sus recetas.</p>
        <div class="cards">
          ${featured
            .map(
              (c) => `
            <a class="card" href="#/capsula/${c.id}" style="--pod:${c.pod}">
              <span class="card__pod" aria-hidden="true"></span>
              <span class="card__title">${c.name}</span>
              <span class="card__arrow">${icon("chevron")}</span>
              <span class="card__meta">${familyLabel(c.family)} · Int. ${c.intensity}</span>
            </a>`
            )
            .join("")}
        </div>
      </section>

      <hr class="hairline" />

      <section class="section">
        <div class="section__eyebrow"><span class="label">Catálogo</span></div>
        <h2 class="section__title">Todas las<br/>cápsulas</h2>
        <p class="section__lead">Ordenadas por intensidad. Toca una para ver notas y recetas.</p>
        <div class="capsule-row" role="list">
          ${capsules
            .map(
              (c) => `
            <a class="capsule-row__item" role="listitem" href="#/capsula/${c.id}" style="--swatch:${c.pod}">
              <span class="capsule-row__swatch" aria-hidden="true"></span>
              <span class="capsule-row__name">
                <strong>${c.name}</strong>
                <span>${c.size} · ${c.origin.split(",")[0]}</span>
              </span>
              <span class="capsule-row__meta">
                <span class="capsule-row__intensity" aria-label="Intensidad ${c.intensity} de 12">
                  ${Array.from({ length: 12 })
                    .map(
                      (_, i) =>
                        `<i class="${i < c.intensity ? "on" : ""}"></i>`
                    )
                    .join("")}
                </span>
                <span>Int. ${c.intensity}</span>
              </span>
            </a>
          `
            )
            .join("")}
        </div>
      </section>

      <hr class="hairline" />

      <section class="section">
        <div class="section__eyebrow"><span class="label">Para empezar</span></div>
        <h2 class="section__title">Recetas<br/>imprescindibles</h2>
        <p class="section__lead">Cuatro clásicos que cubren todas las horas del día.</p>
        <div class="recipe-list">
          ${featuredRecipes
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
        </div>
      </section>

      <div class="empty" style="padding-top: var(--space-10);">
        <p class="label">mi café · 2026</p>
      </div>
    </div>
  `;
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
