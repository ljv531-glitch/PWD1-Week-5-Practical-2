let player = {
  x: 50,
  y: 50,
  size: 50,
  speed: 3
};

let obstacle = {
  x: 150,
  y: 100,
  width: 100,
  height: 200
};

let keys = {}; // 

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

 
  let proposedX = player.x;
  let proposedY = player.y;

  if (keys['w']) proposedY -= player.speed;
  if (keys['s']) proposedY += player.speed;
  if (keys['a']) proposedX -= player.speed;
  if (keys['d']) proposedX += player.speed;

 
  if (!collides(proposedX, player.y)) {
    player.x = proposedX;
  }
  if (!collides(player.x, proposedY)) {
    player.y = proposedY;
  }

 
  fill(0);
  rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

  
  fill(0, 200, 0);
  square(player.x, player.y, player.size);
}

function collides(px, py) {
  
  return !(
    px + player.size < obstacle.x ||              
    px > obstacle.x + obstacle.width ||          
    py + player.size < obstacle.y ||              
    py > obstacle.y + obstacle.height            
  );
}

function keyPressed() {
  keys[key.toLowerCase()] = true;
}

function keyReleased() {
  keys[key.toLowerCase()] = false;
}
