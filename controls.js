var keys = {
  JUMP: 32, //space
  LEFT: 65, //a
  RIGHT: 68,//d
};
document.onkeydown = function(e){
  switch(e.keyCode){
    case keys.JUMP: //space
      console.log("JUMP")
      if (onGround(player)) player.dy -= JUMPV;
      player.y -= 2;
      break;
    case keys.LEFT: //a
      player.direction = -1;
      player.moving = true;
      break;
    case keys.RIGHT: //d
      player.direction = 1;
      player.moving = true;
      break;
  }
};
document.onkeyup = function(e){
  switch(e.keyCode){
    case keys.JUMP: //space
      //do nothing
      break;
    case keys.LEFT: //a
      if(player.direction == -1){
        player.moving = false;
      }
      break;
    case keys.RIGHT: //d
      if(player.direction == 1){
        player.moving = false;
      }
      break;
  }
};