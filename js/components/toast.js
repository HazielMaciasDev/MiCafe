import { icon } from "./icons.js";

let timer = null;

export function showToast(message, duration = 1800) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("toast--show");
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("toast--show"), duration);
}
