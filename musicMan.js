window.WebEdition = true
window.addEventListener('unhandledrejection', function (e) {
  console.error(e.reason.message)
  // alert(e.reason.message)
  window.error=true

})
addEventListener("keydown", (event) => {
  if(event.key == "a"){
    window.Expand = true
  }
  if(event.key == "p"){
    window.Pause = true
  }
  if(event.key == "s"){
    window.Skip = true
  }
  if(event.key == "k"){
    window.KeyBinds = true
  }
});
window.songList=["song1.WAV","song2.WAV","song3.WAV","song4.WAV","song5.WAV"]
window.imageList=["song1.png","song2.png","song3.png","song4.png","song5.png"]
var randList=[]
const canvas = document.getElementById('music');
const ctx = canvas.getContext('2d');
var width = 0
var height = 0
var gradX = [1,1]
var gradY = [1,1]
var targGradX = [30,80]
var targGradY = [15,180]
var latch = true
var state = "paused"
var expanded = false
var paused = false
var keyBinds = false
var songCount=0
var centerLogoA=[0,0]
var centerLogoVel=.0001

var audio =new Audio()
var image =new Image(100)
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
  targGradX[0] = 150
  targGradY[0] = 300
  expanded = true

}
function unexpand(){
  targGradX[0] = 30
  targGradY[0] = 15
  expanded = false

}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function draw(){
  ctx.clearRect(0, 0, width, height); 
  var gradient = ctx.createLinearGradient(0, 0, gradX[0], gradY[0]);
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
  ctx.fillText(`> ${playingText}`, -990+gradY[0]*3.4, -100+gradX[0]);
  ctx.beginPath()
  ctx.fillStyle = `rgb(${(Color[0]-26)+","+(Color[1]-26)+","+(Color[2]-26)})`;
  ctx.roundRect(gradY[0]-290,-420+gradX[0]*3.4,170,170,5)
  ctx.fill();
  ctx.drawImage(image,gradY[0]-280,-410+gradX[0]*3.4,150,150)
  ctx.closePath()

  gradient = ctx.createLinearGradient(width, height, width-gradX[1], height-gradY[1]);
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
  ctx.fillText(``, width-gradX[1]+60+gradY[1]*4, height/2+50+gradY[1]*2);
  ctx.fillText(``, width-gradX[1]+60+gradY[1]*5, height/2+gradY[1]*2);
  ctx.fillText(`A: Expands Song`, width-gradX[1]+30+gradY[1]*6, height/2-50+gradY[1]*2);
  ctx.fillText(`S: Skips Song`, width-gradX[1]+30+gradY[1]*6, height/2-0+gradY[1]*2);
  ctx.fillText(`P: Pauses Song`, width-gradX[1]+30+gradY[1]*6, height/2+50+gradY[1]*2);

  if(window.WebEdition){
    ctx.fillText(`K: KeyBinds`, width-270, height-(gradY[1]-140));
    ctx.fillStyle = "#0005";
    ctx.fillText(`You Are On The Limited Web Version`, 10, height-106);
    ctx.fillText(`There Is Limited Music Included`, 10, height-58);
    ctx.fillText(`ALT+SHIFT are disabled for keybinds`, 10, height-10);
  
  } else{
    ctx.fillText(`Alt+Shift+`, width-gradX[1]+30+gradY[1]*6, height/2-125+gradY[1]*2);
    ctx.fillText(`Alt+Shift+K`, width-270, height-(gradY[1]-140));

  }


  ctx.fillStyle = `rgba(${(Color[0]-26)+","+(Color[1]-26)+","+(Color[2]-26)+","+(centerLogoA[1])})`;
  ctx.fillRect(width/2-50-25,height/2-100, 50, 200)
  ctx.fillRect(width/2+50-25,height/2-100, 50, 200)
  ctx.fillStyle = `rgba(${(Color[0]-26)+","+(Color[1]-26)+","+(Color[2]-26)+","+(centerLogoA[0])})`;
  ctx.beginPath()
  ctx.moveTo(width/2-50-25, height/2-100);
  ctx.lineTo(width/2+100-25, height/2);
  ctx.lineTo(width/2-50-25, height/2+100);  
  ctx.fill()


}

function tick(){
  requestAnimationFrame(tick)
  dPrint()
  if(window.Expand){
    window.Expand = false
    if(expanded){
      unexpand()
    }else{
      expand()
    }
  }
  if(window.Skip){
    window.Skip = false
    latch=true
  }
  if(window.KeyBinds){
    window.KeyBinds = false
    if(keyBinds == true){
      keyBinds = false
      targGradX[1] = 30
      targGradY[1] = 15

    } else{
      keyBinds = true
      targGradX[1] = 400
      targGradY[1] = 0
    }

  }
  if(window.Pause){
    window.Pause = false
    if(paused){
      audio.play()
      paused = !paused
      state = "playing"
      centerLogoA[0]=1
      centerLogoA[1]=0
    }else{
      audio.pause()
      paused = !paused
      state = "paused"
      centerLogoA[1]=1
      centerLogoA[0]=0
    }
    centerLogoVel=0.0001

  }
  centerLogoA[0]-=centerLogoVel
  centerLogoA[1]-=centerLogoVel
  centerLogoVel*=1.1
  if(centerLogoVel>.3){

  centerLogoA[0]=0
  centerLogoA[1]=0
  }
  if(state==="playing"){
    targetColor = [41,91,21]
  }
  if(state==="paused"){
    targetColor = [31,31,31]
  }
  if(window.error == true){
    targetColor = [91,41,21]
  }
  for(let i = 0; i < gradX.length; i++){
    gradX[i] = ((gradX[i]*30)+targGradX[i])/31
    gradY[i] = ((gradY[i]*30)+targGradY[i])/31
      
  }
  for(let i = 0; i<3;i++){
    Color[i]=((Color[i]*50)+targetColor[i])/51
  }
  trueTicker()
  draw()
}
async function trueTicker(){
  if(window.songList&&window.imageList){
    if(!audio||audio.currentTime>audio.duration-.5|| (latch)){
      audio.pause()
      if(randList.length<=2){
        MakeRandomList()
      }
      audio = new Audio(`./music/${randList[0]}`);
      image.src = `./coverArt/placeholder.PNG`
      var substringthing = randList[0].substring(0, randList[0].length-4)
      for(let i = 0; i<window.imageList.length; i++){

        if(substringthing==window.imageList[i].substring(0, window.imageList[i].length-4)){
          image.src = `./coverArt/${window.imageList[i]}`

        }
        console.log(substringthing+"; "+window.imageList[i].substring(0, window.imageList[i].length-4))
      }
      latch=false
      playingText = randList[0]
      songCount++
      var skipCheck = songCount
      randList.splice(0,1)
      targGradX[0] = 150
      targGradY[0] = 300
      await sleep(1000)
      state = "playing"
      // state = "playing"
      // latch=true
      audio.play()
      await sleep(3000)
      if(songCount==skipCheck){
        targGradX[0] = 30
        targGradY[0] = 15
  
      }
    }
  }
}

function MakeRandomList(){
  let listStore = window.songList.slice()
  for(let i = 0; i < window.songList.length; i++){
    let rand=Math.floor(Math.random()*listStore.length)
    randList[i] = listStore[rand]
    listStore.splice(rand,1)
  }
}

requestAnimationFrame(tick)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var dBuffer = ""

function dPrint(){
  document.getElementById("debug").innerHTML = `${dBuffer}`;
  dBuffer=""
}
function dAdd(text){
  dBuffer=dBuffer+""+text+"\n"
}
