


const canvas = document.getElementById('music');
const ctx = canvas.getContext('2d');
var width = 0
var height = 0
var gradX = 1
var gradY = 1
var targGradX = 1
var targGradY = 1
var latch = true
var state = "playing"

var targetColor = [31,31,31]
var Color = [31,31,31]

var playingText = "place of holding"
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = window.innerWidth
  height = window.innerHeight

}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function draw(){
  ctx.clearRect(0, 0, width, height); 
  const gradient = ctx.createLinearGradient(0, 0, gradX, gradY);
  gradient.addColorStop(0, `rgb(${(Color[0]-16)+","+(Color[1]-16)+","+(Color[2]-16)})`);
  gradient.addColorStop(.96999, `rgb(${Color[0]+","+Color[1]+","+Color[2]})`);
  gradient.addColorStop(.97, `rgb(${Color[0]+","+Color[1]+","+Color[2]})`);
  gradient.addColorStop(.99999, `rgb(${(Color[0]-16)+","+(Color[1]-16)+","+(Color[2]-16)})`);
  gradient.addColorStop(1, "#0000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = "48px serif";
  ctx.fillText(`Now Playing ${playingText}`, -990+gradY*3, 50);
}

function tick(){
  draw()
  gradX = ((gradX*30)+targGradX)/31
  gradY = ((gradY*30)+targGradY)/31
  console.log(gradX, targGradX)
  trueTicker()
  requestAnimationFrame(tick)
}
async function trueTicker(){
  if(window.songList){
    if(latch){
      targGradX = 150
      targGradY = 300
      console.log(gradX, targGradX)
      latch=false
      var rand=Math.floor(Math.random()*window.songList.length)
      var audio = new Audio(`./music/${window.songList[rand]}`);
      playingText = window.songList[rand]
      audio.play()
      await sleep(3000)
      targGradX = 18
      targGradY = 18
      await sleep(audio.duration*1000-3000)
      latch=true


    }
  }
}
async function timedplay(params) {
  
}

requestAnimationFrame(tick)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//requiring path and fs modules