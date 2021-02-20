var bgImg, x1 = 0, x2, scrollSpeed = 4, mario, brickGroup, coinsGroup, coinImage, coinSound, Score = 0, diamondGroup, diamondImage, bgMusic, diamondSound, mushRunning, mushGroup, die, marioDead;

function preload() {
  mario_running = loadAnimation('images/mar1.png', 'images/mar2.png', 'images/mar3.png', 'images/mar4.png', 'images/mar5.png', 'images/mar6.png', 'images/mar7.png');

  mushRunning = loadAnimation("images/mush1.png", "images/mush2.png", "images/mush3.png", "images/mush4.png", "images/mush5.png", "images/mush6.png");

  bgImg = loadImage("images/bg.png");
  bricks = loadImage('images/brick.png');

  coinSound = loadSound('sounds/coinSound.mp3');
  die = loadSound('sounds/dieSound.mp3');

  marioDead = loadImage('images/dead.png')
  diamondSound = loadSound('sounds/diamond.mp3');

  coinImage = loadAnimation('images/con1.png', 'images/con2.png', 'images/con3.png', 'images/con4.png', 'images/con5.png', 'images/con6.png');

  diamondImage = loadImage("images/diamond.png");
  bgMusic = loadSound('sounds/bg.mp3')
}

function setup() {
  gameScreen = createCanvas(800, 400);
  gameScreen.position(285, 250);
  x2 = width;

  mario = createSprite(100, 345, 20, 50);
  mario.addAnimation("running", mario_running);
  mario.scale = 0.15;

  brickGroup = new Group();

  coinsGroup = new Group();

  diamondGroup = new Group();

  mushGroup = new Group();

  bgMusic.loop();

  ground = createSprite(100, 345, 400, 10);
  ground.visible = false;
}


function draw() {
  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);
 
  if (keyDown("space")) {
    mario.velocityY = -13;
  }

  mario.velocityY += 0.5;
  mario.collide(ground);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (mario.x < 100) {
    mario.x = 100;
  }

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }

  for (var i = 0; i < (brickGroup).length; i++) {
    var temp = (brickGroup).get(i);

    if (temp.isTouching(mario)) {
      mario.collide(temp);
    }
  }

  for (var j = 0; j < (coinsGroup).length; j++) {
    var temp2 = (coinsGroup).get(j);

    if (temp2.isTouching(mario)) {
      coinSound.play();
      temp2.destroy();
      temp2 = null;
      Score += 1;
    }
  }

  for (var k = 0; k < (diamondGroup).length; k++) {
    var temp3 = (diamondGroup).get(k);

    if (temp3.isTouching(mario)) {
      diamondSound.play();
      temp3.destroy();
      temp3 = null;
      Score += 10;
    }
  }

  for (var l = 0; l < (mushGroup).length; l++) {
    var temp4 = (mushGroup).get(l);

    if (temp4.isTouching(mario)) {
      bgMusic.stop();
      die.play();
      fill(255, 0, 0);;
      textSize(40);
      text("     YOU DIED\nFINAL SCORE: " + Score, 250, 200);
      mario.velocityX = 0;
      mush.velocityX = 0;
      coin.velocityX = 0;
      diamonds.velocityX = 0;
      scrollSpeed = 0;
    }
  }


  drawSprites();
  textSize(20);
  fill(255, 0, 0);
  text("Score:" + Score, 600, 20);
  generateBricks();
  generateCoins();
  generateDiamonds();
  generateMush();
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateBricks() {
  if (frameCount % 100 == 0) {
    platform = createSprite(1000, random(100, 200), 30, 10);
    platform.addImage(bricks);
    platform.scale = 0.5;
    platform.velocityX = -4;
    platform.lifetime = 270;
    brickGroup.add(platform);
  }
}

function generateCoins() {
  if (frameCount % 50 == 0) {
    var coin = createSprite(1200, random(100, 280), 40, 10);
    coin.addAnimation("coin", coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 1270;
    coinsGroup.add(coin);
  }
}

function generateDiamonds() {
  if (Score % 10 == 0 && frameCount % 100 == 0) {
    var diamonds = createSprite(1200, random(100, 300), 40, 10);
    diamonds.addImage(diamondImage);
    diamonds.velocityX = -3;
    diamonds.scale = 0.2;
    diamondGroup.add(diamonds);
  }

}

function generateMush() {
  if (frameCount % 100 == 0) {
    var mush = createSprite(random(1000, 1400), 315, 40, 40);
    mush.addAnimation("mush", mushRunning);
    mush.velocityX = -4;
    mush.scale = 0.1;
    mushGroup.add(mush);
  }
}
