function Entity(url,frameWidth,frameHeight,height,width,x,y,collision){
  this.url = url;
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;
  this.width = width;
  this.height = height;
  this.frame = 0;
  this.animation = 0;
  if (!images[url]){
    toLoad++;
    images[url] = new Image();
    images[url].onload = function(){
      toLoad--;
      start();
    };
    images[url].src = url;
  }
  this.spritesheet = images[url];
  this.direction = 1;
  this.moving = false;
  this.dy = 0;
  this.dx = 0;
  this.y = y;
  this.x = x;
  this.collision = collision;
}
function Texture(url,x,y,width,height){
  this.url = url;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  if (!images[url]){
    toLoad++;
    images[url] = new Image();
    images[url].onload = function(){
      toLoad--;
      start();
    };
    images[url].src = url;
  }
  this.image = images[url];
}
function Block(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
function collideBlock(x,y,block){
  return x > block.x && x < block.x + block.width &&
         y > block.y && y < block.y + block.height;
}
function collideLeft(entity){
  var collision = [[entity.collision.left*entity.width+entity.x, entity.y+entity.height*entity.collision.knee],
                   [entity.collision.left*entity.width+entity.x, entity.y+entity.height*entity.collision.elbow]];
  for(var i = 0; i < blocks.length;i++){
    if(collideBlock(collision[0][0],collision[0][1],blocks[i]) ||
       collideBlock(collision[1][0],collision[1][1],blocks[i])){
         return true;
    }
  }
  return false;
}
function collideRight(entity){
  var collision = [[entity.collision.right*entity.width+entity.x, entity.y+entity.height*entity.collision.knee],
                   [entity.collision.right*entity.width+entity.x, entity.y+entity.height*entity.collision.elbow]];
  for(var i = 0; i < blocks.length;i++){
    if(collideBlock(collision[0][0],collision[0][1],blocks[i]) ||
       collideBlock(collision[1][0],collision[1][1],blocks[i])){
         return true;
    }
  }
  return false;
}
function collideTop(entity){
  var collision = [entity.collision.middle*entity.width+entity.x, entity.y+entity.height*entity.collision.head];
  for(var i = 0; i < blocks.length;i++){
    if(collideBlock(collision[0],collision[1],blocks[i])){
      return true;
    }
  }
  return false;
}
function onGround(entity){
  var collision = [entity.collision.middle*entity.width+entity.x, entity.y+entity.height*entity.collision.foot];
  for(var i = 0; i < blocks.length;i++){
    if(collideBlock(collision[0],collision[1],blocks[i])){
      return {val:collision[1]-blocks[i].y};
    }
  }
  return false;
}
function runPhysics(delta,entity){
  var ground = onGround(entity);
  if(ground){
    entity.y -= ground.val-1;
    ground = !!ground;
  }
  if(entity.moving){
    if(ground){
      entity.dx = entity.direction*MAXSPEED*((ground)?1:AIRSPEED);
    }else{
      entity.dx += entity.direction*AIRSPEED*delta;
    }
  }else if(ground){ //friction
      entity.dx = 0;
  }
  entity.x += entity.dx*delta; //move sideways
  if(entity.dx > 0){
    if(collideRight(entity)){
      entity.x -= entity.dx*delta;
      entity.dx = 0;
    }
  }else{
    if(collideLeft(entity)){
      entity.x -= entity.dx*delta;
      entity.dx = 0;
    }
  }
  if(!ground || entity.dy < 0){
    console.log(entity.dy);
    entity.dy -= GRAVITY*delta;
    entity.y  += entity.dy*delta;
    if(entity.dy < 0){
      if(collideTop(entity)){
        entity.y -= entity.dy*delta;
        entity.dy = 0;
      }
    }else{
      var tmp = onGround(entity);
      if(!!tmp){
        entity.y -= tmp.val-1;
        entity.dy = 0;
      }
    }
  }
}

var GRAVITY = -980,AIRSPEED=400,MAXSPEED=200,JUMPV=600;
var blocks = [];
var entities = [];
function gameloop(delta){
  for(var i = 0; i < entities.length; i++){
    runPhysics(delta,entities[i]);
  }
  runPhysics(delta,player);
}