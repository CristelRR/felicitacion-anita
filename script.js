const BUTTERFLY_PALETTES = [
  { main: '#E91E63', light: '#F48FB1', dark: '#AD1457' },
  { main: '#2196F3', light: '#90CAF9', dark: '#1565C0' },
  { main: '#FF9800', light: '#FFE082', dark: '#E65100' },
  { main: '#9C27B0', light: '#CE93D8', dark: '#6A1B9A' },
  { main: '#FFEB3B', light: '#FFF59D', dark: '#F9A825' },
];

function sunflowerSVG(size = 100, withStem = true) {
  const petals = Array.from({ length: 20 }, (_, i) => {
    const angle = i * 18;
    return `<ellipse cx="0" cy="-28" rx="7.5" ry="21" fill="#FDD835" stroke="#F9A825" stroke-width="0.4"
      transform="translate(50 50) rotate(${angle})"/>`;
  }).join('');

  const seeds = Array.from({ length: 30 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const r = 3 + (i % 5) * 2.2;
    const x = 50 + Math.cos(a) * r;
    const y = 50 + Math.sin(a) * r;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.1" fill="#3E2723" opacity="0.7"/>`;
  }).join('');

  const stemPart = withStem ? `
    <path d="M50 68 Q48 95 50 120" stroke="#388E3C" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M50 90 Q35 88 30 78" stroke="#43A047" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="30" cy="77" rx="10" ry="5" fill="#4CAF50" transform="rotate(-25 30 77)"/>
    <path d="M50 100 Q62 98 66 90" stroke="#43A047" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="66" cy="89" rx="10" ry="5" fill="#4CAF50" transform="rotate(25 66 89)"/>
  ` : '';

  return `<svg class="sunflower-svg" width="${size}" height="${withStem ? size * 1.4 : size}" viewBox="0 0 100 ${withStem ? 130 : 100}" aria-hidden="true">
    ${stemPart}
    <g class="sunflower-head">
      ${petals}
      <circle cx="50" cy="50" r="17" fill="#5D4037"/>
      <circle cx="50" cy="50" r="15" fill="#6D4C41"/>
      ${seeds}
      <circle cx="50" cy="50" r="17" fill="none" stroke="#4E342E" stroke-width="0.5"/>
    </g>
  </svg>`;
}

function butterflySVG(palette) {
  const { main, light, dark } = palette;
  return `<svg class="butterfly-svg" width="52" height="44" viewBox="0 0 52 44" aria-hidden="true">
    <defs>
      <radialGradient id="wg-${main.replace('#','')}" cx="30%" cy="30%">
        <stop offset="0%" stop-color="${light}"/>
        <stop offset="100%" stop-color="${main}"/>
      </radialGradient>
    </defs>
    <g class="butterfly-wings">
      <g class="wing wing--lt" style="transform-origin:26px 22px">
        <ellipse cx="14" cy="14" rx="13" ry="15" fill="url(#wg-${main.replace('#','')})" stroke="${dark}" stroke-width="0.6" opacity="0.95"/>
        <ellipse cx="12" cy="12" rx="5" ry="6" fill="${light}" opacity="0.5"/>
      </g>
      <g class="wing wing--lb" style="transform-origin:26px 22px">
        <ellipse cx="14" cy="30" rx="10" ry="11" fill="url(#wg-${main.replace('#','')})" stroke="${dark}" stroke-width="0.6" opacity="0.9"/>
      </g>
      <g class="wing wing--rt" style="transform-origin:26px 22px">
        <ellipse cx="38" cy="14" rx="13" ry="15" fill="url(#wg-${main.replace('#','')})" stroke="${dark}" stroke-width="0.6" opacity="0.95"/>
        <ellipse cx="40" cy="12" rx="5" ry="6" fill="${light}" opacity="0.5"/>
      </g>
      <g class="wing wing--rb" style="transform-origin:26px 22px">
        <ellipse cx="38" cy="30" rx="10" ry="11" fill="url(#wg-${main.replace('#','')})" stroke="${dark}" stroke-width="0.6" opacity="0.9"/>
      </g>
    </g>
    <ellipse cx="26" cy="22" rx="2.2" ry="11" fill="#37474F"/>
    <circle cx="26" cy="12" r="2.5" fill="#37474F"/>
    <path d="M25 11 Q22 5 20 3" stroke="#37474F" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M27 11 Q30 5 32 3" stroke="#37474F" stroke-width="1" fill="none" stroke-linecap="round"/>
    <circle cx="20" cy="3" r="1.2" fill="#37474F"/>
    <circle cx="32" cy="3" r="1.2" fill="#37474F"/>
  </svg>`;
}

function isMobile() {
  return window.innerWidth <= 480;
}

function initSunflowers() {
  const scale = window.innerWidth <= 360 ? 0.65
    : window.innerWidth <= 480 ? 0.78
    : window.innerWidth <= 768 ? 0.9
    : 1;

  document.querySelectorAll('[data-sunflower]').forEach((el) => {
    const base = Number(el.dataset.sunflower) || 100;
    const size = Math.round(base * scale);
    const stem = el.dataset.stem !== 'false';
    el.innerHTML = sunflowerSVG(size, stem);
  });
}

function createPetals() {
  const container = document.getElementById('petals');
  const count = isMobile() ? 18 : 30;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 8 + Math.random() * 10;
    petal.style.width = size + 'px';
    petal.style.height = size * 1.4 + 'px';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = 6 + Math.random() * 10 + 's';
    petal.style.animationDelay = Math.random() * 12 + 's';
    container.appendChild(petal);
  }
}

function createSparkles() {
  const container = document.getElementById('sparkles');
  const icons = ['✨', '⭐', '💛'];
  const count = isMobile() ? 8 : 15;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.animationDuration = 2 + Math.random() * 3 + 's';
    el.style.animationDelay = Math.random() * 4 + 's';
    el.style.fontSize = 10 + Math.random() * 12 + 'px';
    container.appendChild(el);
  }
}

function createButterfly() {
  const palette = BUTTERFLY_PALETTES[Math.floor(Math.random() * BUTTERFLY_PALETTES.length)];
  const b = document.createElement('div');
  b.className = 'butterfly';
  b.style.top = 8 + Math.random() * 75 + '%';
  b.style.animationDuration = 14 + Math.random() * 16 + 's';
  b.style.animationDelay = Math.random() * 6 + 's';
  const scale = 0.8 + Math.random() * 0.9;
  b.style.setProperty('--bf-scale', scale);
  b.innerHTML = butterflySVG(palette);
  return b;
}

function initButterflies() {
  const container = document.getElementById('butterflies');
  const count = isMobile() ? 4 : 6;
  const max = isMobile() ? 5 : 8;
  for (let i = 0; i < count; i++) container.appendChild(createButterfly());
  setInterval(() => {
    if (container.children.length < max) container.appendChild(createButterfly());
  }, isMobile() ? 9000 : 7000);
}

function initConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animating = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['#FDD835', '#FF9800', '#E91E63', '#42A5F5', '#AB47BC', '#66BB6A'];

  function burst() {
    particles = [];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const total = window.innerWidth <= 480 ? 100 : 160;
    for (let i = 0; i < total; i++) {
      const angle = (Math.PI * 2 * i) / total + Math.random() * 0.5;
      const speed = 5 + Math.random() * 10;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 7,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        gravity: 0.12 + Math.random() * 0.1,
        life: 1,
      });
    }
    if (!animating) { animating = true; animate(); }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.life -= 0.007;
      p.vx *= 0.99;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size / 2, p.size / 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    if (alive) requestAnimationFrame(animate);
    else { animating = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
  return burst;
}

const celebrate = initConfetti();

document.getElementById('celebrateBtn').addEventListener('click', () => {
  celebrate();
  celebrate();
  const label = document.querySelector('#celebrateBtn span');
  label.textContent = '¡Felicidades Anita! 🎂';
  setTimeout(() => { label.textContent = '¡Celebrar con confeti!'; }, 3000);
});

initSunflowers();
createPetals();
createSparkles();
initButterflies();
window.addEventListener('load', () => setTimeout(celebrate, 1000));

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initSunflowers, 200);
});
