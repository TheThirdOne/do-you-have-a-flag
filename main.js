var last;
function loop(){
  var delta = new Date().getTime() - last;
  last = new Date().getTime();
  gameloop(delta/1000);
  player.frame = (player.frame + delta/1000) % 6;
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
textures[1] = new Texture("grass.png",0,200,300,50);
textures[0]= new Texture("sea.png",0,300,800,200);
var player = new Entity("test.png",5,6,70,70,20,20,{middle:0.5,left:0,right:1,foot:1,head:0,knee:0.8,elbow:0.4});

blocks[0] = new Block(0,200,300,50);