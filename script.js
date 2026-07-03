function createPetals() {
  const container = document.getElementById('petals');
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = 8 + Math.random() * 10 + 's';
    petal.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(petal);
  }
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

  const colors = ['#ffd54f', '#ffab00', '#f5c842', '#558b2f', '#ff8a65', '#fff9c4'];

  function burst() {
    particles = [];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 120; i++) {
      const angle = (Math.PI * 2 * i) / 120 + Math.random() * 0.5;
      const speed = 4 + Math.random() * 8;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.15 + Math.random() * 0.1,
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
      p.life -= 0.008;
      p.vx *= 0.99;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
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
  const label = document.querySelector('#celebrateBtn span');
  label.textContent = '¡Felicidades! 🎉';
  setTimeout(() => { label.textContent = '¡Celebrar!'; }, 2500);
});
createPetals();
window.addEventListener('load', () => setTimeout(celebrate, 800));
