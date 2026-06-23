const canvas = document.querySelector("#spec-canvas");
const context = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let width = 0;
let height = 0;
let points = [];

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  points = Array.from({ length: Math.max(32, Math.floor(width / 28)) }, (_, index) => ({
    x: (index * 97) % Math.max(width, 1),
    y: (index * 53) % Math.max(height, 1),
    vx: ((index % 5) - 2) * 0.08,
    vy: ((index % 7) - 3) * 0.07,
  }));
}

function draw() {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#11110f";
  context.fillRect(0, 0, width, height);

  for (const point of points) {
    point.x += point.vx;
    point.y += point.vy;
    if (point.x < 0 || point.x > width) point.vx *= -1;
    if (point.y < 0 || point.y > height) point.vy *= -1;
  }

  context.lineWidth = 1;
  for (let index = 0; index < points.length; index += 1) {
    for (let otherIndex = index + 1; otherIndex < points.length; otherIndex += 1) {
      const a = points[index];
      const b = points[otherIndex];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > 145) continue;
      context.strokeStyle = `rgba(110, 231, 183, ${0.16 - distance / 1100})`;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
  }

  for (const point of points) {
    context.fillStyle = "rgba(242, 193, 109, 0.72)";
    context.beginPath();
    context.arc(point.x, point.y, 2, 0, Math.PI * 2);
    context.fill();
  }

  if (!reduceMotion) requestAnimationFrame(draw);
}

resize();
draw();
window.addEventListener("resize", resize);

const reveals = document.querySelectorAll("section:not(.hero), .proof-grid article, .agent-list li, .commands button");
for (const element of reveals) element.classList.add("reveal");

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.18 });

for (const element of reveals) observer.observe(element);

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      button.classList.add("copied");
      const original = button.textContent;
      button.textContent = "copied";
      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove("copied");
      }, 900);
    } catch {
      button.textContent = value;
    }
  });
}
