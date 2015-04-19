var last;
function loop(){
  var delta = new Date().getTime() - last;
  last = new Date().getTime();
  gameloop(delta/1000);
  player.frame = (player.frame + delta/100) % 13;
  render();
  requestAnimationFrame(loop);
}
var images = {}, toLoad = 0;
function start(){
  if(toLoad <= 0){
    last = new Date().getTime();
    loop();
  }
}

var textures = [];
var player = new Entity("character.png",128,128,128,128,20,20,{middleLeft:0.4,middleRight:0.6,middle:0.5,left:.4,right:.6,foot:1,head:.5,knee:0.9,elbow:0.7});

function loadMap(texs,map,blockW,blockH){
  var collide = [];
  for(var i = 0; i < map.length;i++){
    collide[i] = [];
    for(var k = 0; k < map[i].length;k++){
      collide[i][k] = texs[map[i][k]].collide;
      if(texs[map[i][k]].url){
        textures.push(new Texture(texs[map[i][k]].url,k*blockW,i*blockH,blockW,blockH));
      }
    }
  }
  var previous;
  for(var j = 0; j < collide.length;j++){
    if(previous){
      blocks.push(previous);
    }
    previous = undefined;
    for(var h = 0; h < collide[j].length;h++){
      if(collide[j][h]){
        if(previous){
          previous.width += blockW;
        }else{
          previous = new Block(h*blockW,j*blockH,blockW,blockH);
        }
      }else{
        if(previous){
          blocks.push(previous);
        }
        previous = undefined;
      }
    }
  }
}

loadMap([{url:"",collide:false},{url:"grass.png",collide:true}],
[[0],
 [0],
 [0],
 [0],
 [0],
 [0],
 [0],
 [0,0],
 [0],
 [0,0,0,0,0,0,0,1,1,1,1],
 [0],
 [0],
 [0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
 [0],
 [0],
 [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0]],25,25);
 textures.push(new Texture("ship.png",0,350,125,100));
 blocks.push( new Block(0,400,125,50));