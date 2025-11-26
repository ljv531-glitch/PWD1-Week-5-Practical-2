let rects = [];
let bgColor;

function setup() {
  createCanvas(600, 600);
  bgColor = color(random(50, 200), random(50, 200), random(50, 200));
  generateRectangles();
}

function draw() {
  background(bgColor);

  for (let i = 0; i < rects.length; i++) {
    let r = rects[i];
    if (i % 2 === 0) {
      fill(0);   
    } else {
      fill(255); 
    }
    rect(r.x, r.y, r.w, r.h);
  }
}

function keyPressed() {
  if (key === ' ') {
    generateRectangles();
    
    bgColor = color(random(50, 200), random(50, 200), random(50, 200));
  }
}

function generateRectangles() {
  rects = [];
  for (let i = 0; i < 100; i++) {
    rects.push({
      x: random(width),
      y: random(height),
      w: random(5, 10),
      h: random(5, 10)
    });
  }
}
