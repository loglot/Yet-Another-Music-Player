


const canvas = document.getElementById('music');
const ctx = canvas.getContext('2d');
var width = 0
var height = 0
var gradX = 0
var gradY = 0
var targGradX = 150
var targGradY = 300
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = window.innerWidth
  height = window.innerHeight

}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function draw(){
  const gradient = ctx.createLinearGradient(0, 0, gradX, gradY);
  gradient.addColorStop(0, "#1f1f1f");
  gradient.addColorStop(.96999, "#1f1f1f");
  gradient.addColorStop(.97, "#0f0f0f");
  gradient.addColorStop(.99999, "#0f0f0f");
  gradient.addColorStop(1, "#0000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function tick(){
  draw()
  gradX = ((gradX*10)+targGradX)/11
  gradY = ((gradY*10)+targGradY)/11
  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)


//requiring path and fs modules