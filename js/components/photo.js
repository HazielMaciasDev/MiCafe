// Componente Photo: imagen editorial con borde hairline y forma oval.
// Usa <img> con loading lazy, decode async y fallback a fondo "void"
// si la red falla. Soporta dos formas: oval (pill completa) o rect (3:4).
//
// La marca de agua en el fallback es un glifo SVG del propio café,
// no una imagen rota, así nunca se ve un placeholder feo.

const FALLBACK_GLYPH = `
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <path d="M22 26h16a6 6 0 0 1 0 12h-10v6h-3v-6h-3zm3 3v6h13a3 3 0 0 0 0-6z"
      fill="rgba(255,255,255,0.25)"/>
  </svg>
`;

export function photo({ src, alt = "", shape = "oval", aspect = "4/5" }) {
  if (!src) {
    return renderFallback(shape, aspect, alt);
  }
  const ratio = aspect === "4/5" ? "4 / 5" : aspect === "1/1" ? "1 / 1" : aspect === "16/9" ? "16 / 9" : "4 / 5";
  return `
    <figure class="photo photo--${shape}" style="--photo-aspect:${ratio}">
      <img
        src="${src}"
        alt="${escapeAttr(alt)}"
        loading="lazy"
        decoding="async"
        referrerpolicy="no-referrer"
        onerror="this.parentNode.replaceChild(this.nextElementSibling, this)"
      />
      <span class="photo__fallback" aria-hidden="true">${FALLBACK_GLYPH}</span>
    </figure>
  `;
}

function renderFallback(shape, aspect, alt) {
  const ratio = aspect === "4/5" ? "4 / 5" : aspect === "1/1" ? "1 / 1" : "16 / 9";
  return `
    <figure class="photo photo--${shape} photo--no-img" style="--photo-aspect:${ratio}" role="img" aria-label="${escapeAttr(alt)}">
      ${FALLBACK_GLYPH}
    </figure>
  `;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
