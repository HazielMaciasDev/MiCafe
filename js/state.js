import { STORAGE_KEY } from "./config.js";

const listeners = new Set();
let mem = null;

const empty = () => ({
  favorites: [],
});

function load() {
  if (mem) return mem;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    mem = raw ? { ...empty(), ...JSON.parse(raw) } : empty();
  } catch {
    mem = empty();
  }
  return mem;
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mem));
  } catch {
    /* ignore */
  }
  for (const fn of listeners) fn(mem);
}

export const state = new Proxy(
  {},
  {
    get(_t, prop) {
      return load()[prop];
    },
  }
);

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function keyOf({ kind, id }) {
  return `${kind}:${id}`;
}

export function isFavorite({ kind, id }) {
  return load().favorites.includes(keyOf({ kind, id }));
}

export function toggleFavorite({ kind, id }) {
  const data = load();
  const k = keyOf({ kind, id });
  const idx = data.favorites.indexOf(k);
  if (idx >= 0) {
    data.favorites.splice(idx, 1);
    save();
    return false;
  }
  data.favorites.push(k);
  save();
  return true;
}

export function removeFavorite({ kind, id }) {
  const data = load();
  const k = keyOf({ kind, id });
  const idx = data.favorites.indexOf(k);
  if (idx >= 0) {
    data.favorites.splice(idx, 1);
    save();
  }
}
