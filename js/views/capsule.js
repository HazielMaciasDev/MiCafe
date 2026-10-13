import { capsuleById, familyLabel, capsules } from "../data/capsules.js";
import { recipesForCapsule } from "../data/recipes.js";
import { icon } from "../components/icons.js";
import { isFavorite, toggleFavorite } from "../state.js";
import { showToast } from "../components/toast.js";

export function renderCapsule(params, state) {
  const c = capsuleById(params.id);
  if (!c) {
    return `
      <div class="view">
        <div class="empty">
          <p class="empty__title">No encuentro esa cápsula.</p>
          <a class="cta cta--ghost" href="#/">Volver al inicio</a>
        </div>
      </div>`;
  }

  const related = recipesForCapsule(c.id);
  const fav = isFavorite({ kind: "capsule", id: c.id });

  return `
    <div class="view">
      <button class="fav-button" data-fav-kind="capsule" data-fav-id="${c.id}"
        aria-pressed="${fav}" aria-label="${fav ? "Quitar de favoritos" : "Marcar como favorita"}">
        ${fav ? icon("heartFilled") : icon("heart")}
      </button>
      <section class="capsule-hero" style="--pod:${c.pod}">
        <a class="back-link" href="#/">${icon("chevronLeft")} Volver</a>
        <div class="capsule-hero__head">
          <div>
            <h1 class="capsule-hero__title">${c.name}</h1>
            <p class="capsule-hero__latin">${c.latin}</p>
          </div>
          <span class="capsule-hero__pod" aria-hidden="true"></span>
        </div>
        <p>${c.blurb}</p>
      </section>

      <dl class="spec-grid">
        <div class="spec">
          <dt>Intensidad</dt>
          <dd>${c.intensity} / 12</dd>
        </div>
        <div class="spec">
          <dt>Tamaño</dt>
          <dd>${c.size} · ${c.volumeMl} ml</dd>
        </div>
        <div class="spec">
          <dt>Extracción</dt>
          <dd>${c.seconds} s</dd>
        </div>
        <div class="spec">
          <dt>Familia</dt>
          <dd>${familyLabel(c.family)}</dd>
        </div>
      </dl>

      <section class="section">
        <div class="section__eyebrow"><span class="label">Notas de cata</span></div>
        <div class="notes">
          ${c.notes.map((n) => `<span class="pill pill--coral">${n}</span>`).join("")}
        </div>
        <p class="section__lead mt-4">${c.origin}.</p>
      </section>

      <hr class="hairline" />

      <section class="section">
        <div class="section__eyebrow"><span class="label">Recetas</span></div>
        <h2 class="section__title">Cómo usarla</h2>
        ${
          related.length === 0
            ? `<p class="section__lead">Aún no tengo recetas para esta cápsula. Prueba con Volluto o Arpeggio en su lugar.</p>`
            : `<div class="recipe-list">
            ${related
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
        }
      </section>

      <hr class="hairline" />

      <section class="section">
        <div class="section__eyebrow"><span class="label">Vecinas</span></div>
        <p class="section__lead">Cápsulas con perfil parecido para probar esta semana.</p>
        <div class="cards">
          ${capsules
            .filter((x) => x.family === c.family && x.id !== c.id)
            .slice(0, 4)
            .map(
              (n) => `
            <a class="card" href="#/capsula/${n.id}" style="--pod:${n.pod}">
              <span class="card__pod"></span>
              <span class="card__title">${n.name}</span>
              <span class="card__arrow">${icon("chevron")}</span>
              <span class="card__meta">Int. ${n.intensity}</span>
            </a>`
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

export function bindCapsuleFavorites(root) {
  root.querySelectorAll("[data-fav-kind]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const kind = btn.getAttribute("data-fav-kind");
      const id = btn.getAttribute("data-fav-id");
      const nowFav = toggleFavorite({ kind, id });
      btn.setAttribute("aria-pressed", String(nowFav));
      btn.innerHTML = nowFav ? icon("heartFilled") : icon("heart");
      btn.setAttribute(
        "aria-label",
        nowFav ? "Quitar de favoritos" : "Marcar como favorita"
      );
      showToast(nowFav ? "Guardado" : "Eliminado");
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
