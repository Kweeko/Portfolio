import { mouse } from './mouse.js';


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.className = 'canvasHeader'

// Configuration du canvas
canvas.width = window.innerWidth;
canvas.height = 300;
canvas.style.position = 'absolute';
canvas.style.backgroundColor = 'black';
document.body.appendChild(canvas);

const particles = [];
const lines = [];

function createParticles(nb, x, y) {
  for (let i = 0; i < nb; i++) {
    particles.push({
      x : x ?? Math.random() * canvas.width,
      y : y ?? Math.random() * canvas.height,
      size : Math.random() * 6,
      scale : 1,
      opacity: Math.random(),
      direction: Math.random() * (Math.PI * 2),
      speedX: Math.random() * 10,
      speedY: Math.random() * 10
    });
  }
}

function init() {
  createParticles(100);
}

window.lines = lines;

function update() {

  for (const p of particles) {

     if (mouse.isDown) {
      p.direction -= Math.PI;
    } 

    const distance = Math.abs(getDistance(mouse.x, mouse.y, p.x, p.y));

    if (distance < 100) {
      
        lines.push({ from: p, to: mouse });
      
    } else {
      const pos = lines.findIndex(l => l.from === p);
      if (pos > -1)
        lines.splice(pos, 1);
     
    }


    p.x += Math.cos(p.direction) * p.speedX;
    p.y += Math.sin(p.direction) * p.speedY;

    // Si en dehors de l'écran
    if (p.x > canvas.width || p.x < 0 || p.y > canvas.height || p.y < 0) {
      p.direction = Math.random() * (Math.PI * 2);
    }
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  for (const l of lines) {
    ctx.beginPath();
    ctx.moveTo(l.from.x, l.from.y);
    ctx.lineTo(l.to.x, l.to.y);
    ctx.stroke();
    ctx.closePath();
  }

  for (const p of particles) {
    
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.fillRect(p.x, p.y, p.size * p.scale, p.size * p.scale);
  }

}

function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

init();
loop();

window.addEventListener('resize', () => {
  ctx.save();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.restore();
});

function getDistance(x1, y1, x2, y2) {
  const x = x1 - x2;
  const y = y1 - y2;
  return Math.sqrt( x*x + y*y );
}