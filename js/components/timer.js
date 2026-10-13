// Componente timer (anillo SVG + label). Maneja su propio interval.

export function createTimer({ seconds, onDone }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  let remaining = seconds;
  let intervalId = null;
  let finished = false;

  const el = document.createElement("div");
  el.className = "timer-ring";
  el.setAttribute("role", "timer");
  el.setAttribute("aria-live", "off");
  el.innerHTML = `
    <svg viewBox="0 0 100 100">
      <circle class="timer-ring__track" cx="50" cy="50" r="${radius}" />
      <circle class="timer-ring__progress" cx="50" cy="50" r="${radius}"
        stroke-dasharray="${circumference}" stroke-dashoffset="0" />
    </svg>
    <span class="timer-ring__label">${formatTime(remaining)}</span>
  `;

  const progress = el.querySelector(".timer-ring__progress");
  const label = el.querySelector(".timer-ring__label");

  function setOffset(percent) {
    const offset = circumference * (1 - percent);
    progress.style.strokeDashoffset = offset;
  }

  function tick() {
    if (remaining <= 0) {
      stop();
      if (!finished) {
        finished = true;
        if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
        if (typeof onDone === "function") onDone();
      }
      return;
    }
    remaining -= 1;
    label.textContent = formatTime(remaining);
    setOffset(1 - remaining / seconds);
  }

  function start() {
    if (intervalId) return;
    finished = false;
    setOffset(0);
    intervalId = setInterval(tick, 1000);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function reset(newSeconds) {
    stop();
    if (typeof newSeconds === "number") {
      remaining = newSeconds;
      seconds = newSeconds;
    } else {
      remaining = seconds;
    }
    finished = false;
    label.textContent = formatTime(remaining);
    setOffset(0);
  }

  return { el, start, stop, reset };
}

function formatTime(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m <= 0) return `${total}s`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
