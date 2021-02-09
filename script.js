var bgImg;
var x1 = 0;
var x2;
var scrollSpeed = 4;
var mario;

function preload() {
  mario_running = loadAnimation('images/mar1.png', 'images/mar2.png', 'images/mar3.png', 'images/mar4.png', 'images/mar5.png', 'images/mar6.png', 'images/mar7.png');
  bgImg = loadImage("images/bg.png");
}

function setup() {
  gameScreen = createCanvas(800, 400);
  gameScreen.position(285,250)
  x2 = width;
  mario = createSprite(100, 345, 20, 50);
  mario.addAnimation("running", mario_running);
  mario.scale = 0.15;

  ground = createSprite(100, 345, 400, 10);
  ground.visible = false;
}

function draw() {
  // gameScreen.style('margin','auto');
  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);
  // mario.display();
  if(keyDown("space"))
    {
        mario.velocityY=-13;
    }

  mario.velocityY+=+0.5;
  mario.collide(ground);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }
  drawSprites();
}