


const canvas = document.getElementById('music');
const ctx = canvas.getContext('2d');
var width = 0
var height = 0
var gradX = 1
var gradY = 1
var targGradX = 30
var targGradY = 15
var latch = true
var state = "paused"
var expanded = false

var targetColor = [0,0,0]
var Color = [155,155,155]

var playingText = "place of holding"
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = window.innerWidth
  height = window.innerHeight

}

function expand(){
  targGradX = 150
  targGradY = 300
  expanded = true

}
function unexpand(){
  targGradX = 30
  targGradY = 15
  expanded = false

}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function draw(){
  ctx.clearRect(0, 0, width, height); 
  const gradient = ctx.createLinearGradient(0, 0, gradX, gradY);
  gradient.addColorStop(0, `rgb(${(Color[0]-26)+","+(Color[1]-26)+","+(Color[2]-26)})`);
  gradient.addColorStop(.96999, `rgb(${(Color[0]+16)+","+(Color[1]+16)+","+(Color[2]+16)})`);
  gradient.addColorStop(.8, `rgb(${Color[0]+","+Color[1]+","+Color[2]})`);
  gradient.addColorStop(.97, `rgb(${Color[0]+","+Color[1]+","+Color[2]})`);
  gradient.addColorStop(.99999, `rgb(${(Color[0]-26)+","+(Color[1]-26)+","+(Color[2]-26)})`);
  gradient.addColorStop(1, "#0000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = "48px serif";
  ctx.fillText(`> ${playingText}`, -990+gradY*3.4, -100+gradX);
}

function tick(){
  if(window.Expand){
    window.Expand = false
    if(expanded){
      unexpand()
    }else{
      expand()
    }
  }
  if(state=="playing"){
    targetColor = [41,91,21]
  }
  if(state=="paused"){
    targetColor = [31,31,31]
  }
  if(state=="error"){
    targetColor = [91,41,21]
  }
  draw()
  gradX = ((gradX*30)+targGradX)/31
  gradY = ((gradY*30)+targGradY)/31
  for(let i = 0; i<3;i++){
    Color[i]=((Color[i]*50)+targetColor[i])/51
  }
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
      state = "playing"
      var rand=Math.floor(Math.random()*window.songList.length)
      var audio = new Audio(`./music/${window.songList[rand]}`);
      playingText = window.songList[rand]
      audio.play()
      await sleep(3000)
      targGradX = 30
      targGradY = 15
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