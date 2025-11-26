let ball = {
    x: 50,
    y: 50,
    speedX: 3,
    speedY: 3,
    diameter: 100   
};

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(255);

   
    circle(ball.x, ball.y, ball.diameter);

    
    let radius = ball.diameter / 2;

    
    if (ball.x < radius || ball.x > width - radius) {
        ball.speedX *= -1;
        ball.diameter -= 1;   
        console.log("Diameter:", ball.diameter);
    }

    
    if (ball.y < radius || ball.y > height - radius) {
        ball.speedY *= -1;
        ball.diameter -= 1;   
        console.log("Diameter:", ball.diameter);
    }


    ball.x += ball.speedX;
    ball.y += ball.speedY;
}
