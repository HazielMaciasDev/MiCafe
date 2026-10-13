import { recipeById, recipes, capsuleCount } from "../data/recipes.js";
import { capsuleById } from "../data/capsules.js";
import { icon } from "../components/icons.js";
import { isFavorite, toggleFavorite } from "../state.js";
import { showToast } from "../components/toast.js";
import { photo } from "../components/photo.js";

export function renderRecipe(params, state) {
  const r = recipeById(params.id);
  if (!r) {
    return `
      <div class="view">
        <div class="empty">
          <p class="empty__title">No encuentro esa receta.</p>
          <a class="cta cta--ghost" href="#/recetas">Ver todas</a>
        </div>
      </div>`;
  }

  const primaryCapsule = capsuleById(r.capsuleId);
  const usedCapsules = capsuleList(r);
  const fav = isFavorite({ kind: "recipe", id: r.id });
  const totalSeconds = r.steps
    .filter((s) => s.timerSeconds)
    .reduce((sum, s) => sum + s.timerSeconds, 0);
  const capCount = capsuleCount(r);
  const servings = r.servings || 1;

  return `
    <div class="view">
      <button class="fav-button" data-fav-kind="recipe" data-fav-id="${r.id}"
        aria-pressed="${fav}" aria-label="${fav ? "Quitar de favoritos" : "Marcar como favorita"}">
        ${fav ? icon("heartFilled") : icon("heart")}
      </button>
      <section class="recipe-hero">
        <a class="back-link" href="${primaryCapsule ? `#/capsula/${primaryCapsule.id}` : "#/recetas"}">${icon("chevronLeft")} ${
    primaryCapsule ? primaryCapsule.name : "Volver"
  }</a>
        <div class="recipe-hero__type">
          <span class="pill pill--apricot">${labelForType(r.type)}</span>
          <span class="pill pill--coral">Intensidad ${r.intensity}</span>
          <span class="pill pill--meadow">${servings > 1 ? `${servings} personas` : `${Math.max(1, Math.ceil(totalSeconds / 60))} min`}</span>
          ${capCount > 1 ? `<span class="pill pill--ghost">${capCount} cápsulas</span>` : ""}
        </div>
        <h1 class="recipe-hero__title">${r.name}</h1>
        <p class="recipe-hero__lead">${r.blurb}</p>
        ${photo({ src: r.image, alt: r.name, shape: "oval", aspect: "4/5" }).replace(
          'class="photo photo--oval"',
          'class="photo photo--oval recipe-hero__photo"'
        )}
      </section>

      <hr class="hairline" />

      <section class="section">
        <div class="section__eyebrow"><span class="label">${capCount > 1 ? `Cápsulas (${capCount})` : "Cápsula"}</span></div>
        <div class="capsule-list">
          ${usedCapsules
            .map(
              (c) => `
            <a class="capsule-list__row" href="#/capsula/${c.id}" style="--pod:${c.pod}">
              <span class="capsule-list__swatch" aria-hidden="true"></span>
              <span class="capsule-list__name">${c.qty > 1 ? `${c.qty}× ${c.name}` : c.name}</span>
              <span class="capsule-list__count">Int. ${c.intensity}</span>
            </a>`
            )
            .join("")}
        </div>
      </section>

      <hr class="hairline" />

      <section class="section">
        <div class="section__eyebrow"><span class="label">Necesitas</span></div>
        <div class="ingredients">
          ${r.ingredients
            .map(
              (ing) => `
            <div class="ingredients__row">
              <span class="ingredients__name">${ing.name}</span>
              <span class="ingredients__qty">${ing.qty}</span>
            </div>`
            )
            .join("")}
        </div>
      </section>

      <hr class="hairline" />

      <section class="section">
        <div class="section__eyebrow"><span class="label">Paso a paso</span></div>
        <div class="steps" data-steps>
          <div class="steps__head">
            <span class="steps__title">Guía</span>
            <span class="steps__count" data-step-count></span>
          </div>
          <div class="steps__progress" data-progress></div>
          ${r.steps
            .map(
              (s, i) => `
            <div class="step" data-step="${i}">
              <span class="step__num">${String(i + 1).padStart(2, "0")}</span>
              <div class="step__body">
                <p class="step__text">${s.text}</p>
                ${
                  Array.isArray(s.substeps) && s.substeps.length
                    ? `<ol class="step__substeps">${s.substeps
                        .map((sub) => `<li>${sub}</li>`)
                        .join("")}</ol>`
                    : ""
                }
                ${
                  s.tip
                    ? `<aside class="step__aside step__aside--tip">${asideIcon("info")}<span>${s.tip}</span></aside>`
                    : ""
                }
                ${
                  s.warn
                    ? `<aside class="step__aside step__aside--warn">${asideIcon("warn")}<span>${s.warn}</span></aside>`
                    : ""
                }
                ${
                  s.timerSeconds
                    ? `<span class="step__meta">
                        <span class="step__timer" data-step-timer="${i}" data-seconds="${s.timerSeconds}">
                          ${icon("clock")} ${s.timerSeconds}s
                        </span>
                      </span>`
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}
          <div class="steps__nav">
            <button class="cta cta--ghost cta--small" data-prev>Volver</button>
            <button class="cta cta--small" data-next>Siguiente</button>
          </div>
        </div>
      </section>

      ${
        r.tip
          ? `<section class="section">
              <div class="section__eyebrow"><span class="label">Consejo general</span></div>
              <p class="section__lead">${r.tip}</p>
            </section>`
          : ""
      }

      <hr class="hairline" />

      <section class="section">
        <div class="section__eyebrow"><span class="label">Más como esta</span></div>
        <div class="recipe-list">
          ${recipes
            .filter((x) => x.id !== r.id && x.type === r.type)
            .slice(0, 4)
            .map(
              (n) => `
            <a class="recipe-list__item" href="#/receta/${n.id}">
              <span>
                <span class="recipe-list__name">${n.name}</span>
                <span class="recipe-list__sub">${labelForType(n.type)}</span>
              </span>
              ${icon("chevron")}
            </a>
          `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function asideIcon(kind) {
  if (kind === "warn") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 2 20h20z"/><path d="M12 11v4"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><circle cx="12" cy="16" r="0.8" fill="currentColor"/></svg>`;
}

function capsuleList(r) {
  // Agrupa por id y devuelve cada cápsula con su cantidad.
  // Ej: ["arpeggio","arpeggio","ristretto"] →
  //   [{ id:"arpeggio", qty:2, ...}, { id:"ristretto", qty:1, ...}]
  const counts = new Map();
  if (Array.isArray(r.capsules) && r.capsules.length) {
    for (const id of r.capsules) {
      counts.set(id, (counts.get(id) || 0) + 1);
    }
  } else if (r.capsuleId) {
    counts.set(r.capsuleId, 1);
  }
  const out = [];
  for (const [id, qty] of counts.entries()) {
    const c = capsuleById(id);
    if (c) out.push({ ...c, qty });
  }
  return out;
}

export function bindRecipeFavorites(root) {
  root.querySelectorAll("[data-fav-kind]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const kind = btn.getAttribute("data-fav-kind");
      const id = btn.getAttribute("data-fav-id");
      const nowFav = toggleFavorite({ kind, id });
      btn.setAttribute("aria-pressed", String(nowFav));
      btn.innerHTML = nowFav ? icon("heartFilled") : icon("heart");
      showToast(nowFav ? "Guardado" : "Eliminado");
    });
  });
}

export function bindSteps(root) {
  const container = root.querySelector("[data-steps]");
  if (!container) return;
  const steps = Array.from(container.querySelectorAll("[data-step]"));
  const total = steps.length;
  const progressBar = container.querySelector("[data-progress]");
  const countEl = container.querySelector("[data-step-count]");
  const prevBtn = container.querySelector("[data-prev]");
  const nextBtn = container.querySelector("[data-next]");
  let current = 0;
  let countdownId = null;

  function setProgress(idx) {
    const pct = Math.min(100, Math.round(((idx + 1) / total) * 100));
    if (progressBar) progressBar.style.setProperty("--progress", `${pct}%`);
    if (countEl) countEl.textContent = `Paso ${idx + 1} / ${total}`;
  }

  function stopCountdown() {
    if (countdownId) {
      clearInterval(countdownId);
      countdownId = null;
    }
  }

  function attachCountdownForCurrent() {
    stopCountdown();
    const stepEl = steps[current];
    const timerEl = stepEl.querySelector("[data-step-timer]");
    if (!timerEl) return;

    const seconds = Number(timerEl.getAttribute("data-seconds"));
    const iconHTML = timerEl.querySelector("svg")?.outerHTML || "";
    timerEl.classList.add("step__timer--active");
    timerEl.setAttribute("role", "button");
    timerEl.setAttribute("tabindex", "0");
    timerEl.setAttribute(
      "aria-label",
      `Temporizador de ${seconds} segundos. Toca para reiniciar.`
    );

    let remaining = seconds;
    function paint(r) {
      timerEl.innerHTML = `${iconHTML} <strong>${r}s</strong>`;
    }
    paint(remaining);

    function tick() {
      remaining -= 1;
      if (remaining <= 0) {
        stopCountdown();
        paint(0);
        if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
        showToast("Tiempo listo");
        return;
      }
      paint(remaining);
    }

    function start() {
      stopCountdown();
      remaining = seconds;
      paint(remaining);
      countdownId = setInterval(tick, 1000);
    }

    timerEl.addEventListener("click", start);
    timerEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        start();
      }
    });

    start();
  }

  function renderStep() {
    stopCountdown();
    steps.forEach((el, i) => {
      el.classList.toggle("step--current", i === current);
      el.classList.toggle("step--done", i < current);
      el.classList.toggle("step--pending", i > current);
    });
    setProgress(current);
    prevBtn.disabled = current === 0;
    nextBtn.textContent = current === total - 1 ? "Listo" : "Siguiente";
    attachCountdownForCurrent();
  }

  prevBtn.addEventListener("click", () => {
    if (current > 0) {
      current -= 1;
      renderStep();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (current < total - 1) {
      current += 1;
      renderStep();
    } else {
      stopCountdown();
      showToast("Receta terminada");
    }
  });

  renderStep();
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
