var canvas = document.getElementById("canvas");
var ctx  = canvas.getContext("2d");

ctx.imageSmoothingEnabled=false; //anti-aliasing sucks
ctx.mozImageSmoothingEnabled=false; //Firefox sucks

function drawE(entity,x,y,width,height){
  ctx.drawImage(entity.spritesheet,
                (entity.frame|0)*entity.frameWidth,entity.animation*entity.frameHeight,
                entity.frameWidth,entity.frameHeight,
                x,y,width,height);
}
function drawB(block){
  ctx.drawImage(block.image,block.x,block.y,block.width,block.height);
}
function render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawE(player,player.x,player.y,70,70);
  for(var i = 0; i < textures.length; i++){
    drawB(textures[i]);
  }
}