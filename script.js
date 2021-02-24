var bgImg, x1 = 0, x2, scrollSpeed = 4, mario, brickGroup, coinsGroup, coinImage, coinSound, Score = 0, diamondGroup, diamondImage, bgMusic, diamondSound, mushRunning, obstacleGroup, die,  
turtleImage, marioDead, playing=0,gameState = "PLAY"; //declaring the variables


function preload() {
  mario_running = loadAnimation('images/mar1.png', 'images/mar2.png', 'images/mar3.png', 'images/mar4.png', 'images/mar5.png', 'images/mar6.png', 'images/mar7.png'); //loading the animation of the mario sprite 

  mushRunning = loadAnimation("images/mush1.png", "images/mush2.png", "images/mush3.png", "images/mush4.png", "images/mush5.png", "images/mush6.png"); //loading the animtion for enemy 1 - mush

  bgImg = loadImage("images/bg.png"); //loading the background image
  bricks = loadImage('images/brick.png'); //loading the bricks

  coinSound = loadSound('sounds/coinSound.mp3'); //loading the coin sound
  die = loadSound('sounds/dieSound.mp3'); //loading the sound on death of mario

  marioDead = loadImage('images/dead.png') //mario's death image
  diamondSound = loadSound('sounds/diamond.mp3'); //loading the diamond sound

  coinImage = loadAnimation('images/con1.png', 'images/con2.png', 'images/con3.png', 'images/con4.png', 'images/con5.png', 'images/con6.png'); //loading the animation of coin

  diamondImage = loadImage("images/diamond.png"); //loading the image of the diamond
  turtleImage = loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png"); //loading the animation of enemy 2 - turtle

  bgMusic = loadSound('sounds/bg.mp3') //loading the background music
}

function setup() {
  gameScreen = createCanvas(800, 400); //creating the game screen
  bgMusic.play();
  gameScreen.position(285, 250); //positioning the screen
  x2 = width; // taking the width in x2

  mario = createSprite(100, 345, 20, 50); //creating a sprie of mario
  mario.addAnimation("running", mario_running); //adding the preloaded animation to mario
  mario.scale = 0.15; //scaling the sprite of mario to 0.15

  brickGroup = new Group(); //craeting a new brick group

  coinsGroup = new Group(); //creating a new coins group

  diamondGroup = new Group(); //creating a new diamond 

  obstacleGroup = new Group(); // creating a new mush group



  ground = createSprite(100, 345, 400, 10); // creating the ground for mario
  ground.visible = false; //hiding the vsibility of the ground
}


function draw() {
  if(gameState == "PLAY"){
  // if(playing == 0){
  //   bgMusic.play();
  //   playing =1 ;
  // }
  image(bgImg, x1, 0, width, height); // displaying the background image
  image(bgImg, x2, 0, width, height);

  generateBricks();
  generateCoins();
  generateDiamonds();
  generateObstacles();
  // bgMusic.play();
  if (keyDown("space")) { //Checking if the key down is specabar
    mario.velocityY = -13; //then mario gets an upward velocuiy of 13
  }

  mario.velocityY += 0.5;//and we constantly make him to fall down due to a downward velocity
  mario.collide(ground); // and then we make him to collide with the ground such taht it doesnot go beyond the ground
  x1 -= scrollSpeed; // scroll speed for the height of the bg iamge
  x2 -= scrollSpeed; // scroll speed for the width of the bg image

  if (mario.x < 100) {
    mario.x = 100;  //if the x coordinates of mario is lesser than 100, then it moves back to 100 again
  }

  if (x1 < -width) { 
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }

  //Checking for collision wiht bricks
  for (var i = 0; i < (brickGroup).length; i++) {
    var temp = (brickGroup).get(i);

    if (temp.isTouching(mario)) {
      mario.collide(temp);
    }
  }
//Checking for collision with coins and score counter
  for (var j = 0; j < (coinsGroup).length; j++) {
    var temp2 = (coinsGroup).get(j);

    if (temp2.isTouching(mario)) {
      coinSound.play();
      temp2.destroy();
      temp2 = null;
      Score += 1;
    }
  }
//Checking for collision with diamonds and score counter
  for (var k = 0; k < (diamondGroup).length; k++) {
    var temp3 = (diamondGroup).get(k);

    if (temp3.isTouching(mario)) {
      diamondSound.play();
      temp3.destroy();
      temp3 = null;
      Score += 10;
    }

  }

  
    if (obstacleGroup.isTouching(mario)) {
      gameState="END";
      die.play();
    }
  }
  
//Calling all the required functions 
  drawSprites(); //draws all the sprite
  textSize(20); //makes the size of the text as 20 pixels
  fill(255, 0, 0); // color is red
  text("Score:" + Score, 600, 20); // score at600x and 20y
}

function random(min, max) { // a function to generate random numbers 
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to generate Bricks
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

//Function to generate Coins
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
//Fnction to generate diamonds
function generateDiamonds() {
  if (Score % 10 == 0 && frameCount % 100 == 0) {
    var diamonds = createSprite(1200, random(100, 300), 40, 10);
    diamonds.addImage(diamondImage);
    diamonds.velocityX = -3;
    diamonds.scale = 0.2;
    diamondGroup.add(diamonds);
  }

}
//Function to generate Mush
function generateObstacles() {
  if (frameCount % 100 == 0) {
    var obstacles = createSprite(random(1000, 1400), 315, 40, 40);
    var choice= round
    (random(0,1));
    if(choice === 0){
    obstacles.addAnimation("mush", mushRunning);
    }
    else if(choice === 1){
    obstacles.addAnimation("turtle", turtleImage);
    }
    console.log(choice);
    obstacles.velocityX = -4;
    obstacles.scale = 0.1;
    obstacleGroup.add(obstacles);
}
}
