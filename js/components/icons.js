// Inline SVG icons. Stroke is currentColor so they inherit from CSS.

const wrap = (path) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;

export const icons = {
  search: wrap(`<circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />`),
  home: wrap(`<path d="M3 11 12 3l9 8" />
    <path d="M5 10v10h14V10" />`),
  list: wrap(`<path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />`),
  heart: wrap(`<path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" />`),
  heartFilled: wrap(`<path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" fill="currentColor" />`),
  chevron: wrap(`<path d="m9 6 6 6-6 6" />`),
  chevronLeft: wrap(`<path d="m15 6-6 6 6 6" />`),
  chevronDown: wrap(`<path d="m6 9 6 6 6-6" />`),
  clock: wrap(`<circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />`),
  bean: wrap(`<path d="M7 18c-2-2-2-6 0-9 3-4 9-5 12-3-1 4-3 9-7 11-2 1-4 1-5 1z" />
    <path d="M9 9c2 1 4 2 5 4" />`),
  arrow: wrap(`<path d="M12 4v16" />
    <path d="m6 14 6 6 6-6" />`),
  close: wrap(`<path d="m6 6 12 12" />
    <path d="M18 6 6 18" />`),
};

export const icon = (name) => icons[name] || "";
