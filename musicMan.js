const canvas = document.getElementById('music');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
ctx.fillStyle = "#fff"
ctx.fillRect(50,50,50,50)