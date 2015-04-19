var canvas = document.getElementById("canvas");
var ctx  = canvas.getContext("2d");

ctx.imageSmoothingEnabled=false; //anti-aliasing sucks
ctx.mozImageSmoothingEnabled=false; //Firefox sucks

function drawE(entity){
  ctx.drawImage(entity.spritesheet,
                (entity.frame|0)*entity.frameWidth,entity.animation*entity.frameHeight,
                entity.frameWidth,entity.frameHeight,
                entity.x,entity.y,entity.width,entity.height);
}
function drawB(block){
  ctx.drawImage(block.image,block.x,block.y,block.width,block.height);
}
function drawR(block){
  ctx.rect(block.x,block.y,block.width,block.height);
}
function render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  for(var i = 0; i < textures.length; i++){
    drawB(textures[i]);
  }
  ctx.beginPath();
  for(i = 0; i < blocks.length; i++){
    drawR(blocks[i]);
  }
  ctx.strokeStyle = "#000000";
  drawE(player);
  ctx.rect(player.collision.left*player.width+player.x,player.collision.head*player.height+player.y,(player.collision.right-player.collision.left)*player.width,(player.collision.foot-player.collision.head)*player.height);
  ctx.stroke();
  ctx.closePath()
  
}