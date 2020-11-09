var monkey, monkey_running;
var banana, bananaImage, rock, rockImage;
var bananaGroup, rockGroup;
var ground;
var background,backgroundImage;
var score=0, survivalTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rand;

var death=0;


function preload() {


  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png" );
  backgroundImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");

}



function setup() {
  background = createSprite(300,200)
  background.addImage(backgroundImage);
  background.scale=0.8;
  
  monkey = createSprite(50, 140, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.10; 

  ground = createSprite(300, 390, 1200, 10)

  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible=false;

  
  bananaGroup = new Group();
  rockGroup = new Group();
}


function draw() {
  createCanvas(600, 400);
  if(gameState===PLAY){




  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  if (keyDown("space") && monkey.y >= 142) {
    monkey.velocityY = -12;

  }

  if (ground.x < 0) {
    ground.x = 200;

  }
  if(bananaGroup.isTouching(monkey)){
   score +=2;
   bananaGroup.destroyEach();

  }
  if (rockGroup.isTouching(monkey)){
    death += 1
    }
    
    if(death === 2){
    gameState = END
    }

  food();
  obstacle();
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,200,50)
}

if (gameState===END){

  stroke("black");
  textSize(50);
  fill("red");
   text("GAME OVER",200,200);
   background("black");

  monkey.destroy();
  bananaGroup.destroyEach();
  rockGroup.destroyEach();
  background.destroy();
}
}


function food() {

  if (frameCount % 120 === 0) {
    banana = createSprite(700, 200, 20, 20);
    banana.addImage(bananaImage);


    banana.velocityX = -4;
    banana.lifetime = 300;
    banana.scale = 0.1;
    banana.y = Math.round(random(200, 235));
    bananaGroup.add(banana);
  }


}

function obstacle() {
  if (frameCount % 80 === 0) {
    rock = createSprite(500, 360, 20, 20);
    rock.addImage(rockImage);
    rock.velocityX = -4;
    rock.lifetime = 300;
    rock.scale = 0.15;

    rockGroup.add(rock);
  }
  switch(score){
     case 6: monkey.scale=0.12;
            break;
     case 10: monkey.scale=0.14;
            break;
     case 16: monkey.scale=0.16;
            break;    
     case 20: monkey.scale=0.18;
            break;   




  }
}