var backGround,ground,monkey,score;
var bananaImg,obstaclesImg,backGroundImg;
var monkeyImg,stoneImg;
var obstaclesGroup,foodGroup;

function preload(){
  backGroundImg=loadImage("jungle.jpg");
                                                monkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stoneImg=loadImage("stone.png");
  bananaImg=loadImage("banana.png");
}


function setup() {
  createCanvas(400, 400);
  
  backGround = createSprite(200,200,2000,400);
  backGround.addImage("back",backGroundImg);
  backGround.scale = 1.0;
  
  ground = createSprite(200,380,400,10);
  ground.visible=false;
  
  monkey = createSprite(50,380,20,20);
  monkey.addAnimation("Img",monkeyImg);
  monkey.scale = 0.1;
  
  score = 0;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(220);
  
  backGround.velocityX=-3;
  monkey.velocityY=5.5;
  monkey.collide(ground);
  
  
  if(backGround.x<0){
    backGround.x=backGround.width/2;
  }
  
   if(keyDown("SPACE") && monkey.y>=180) {
    monkey.velocityY = -10;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.1;
  }
  
  if(foodGroup.isTouching(monkey)){
      score = score + 2;
      foodGroup.destroyEach();
    }
  
  
  obstaclesGroup.setColliderEach("rectangle",0,0,300,300);
  foodGroup.setColliderEach("rectangle",0,0,500,500);
  
  size();
  obstacles();
  fruit();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("red");
  text("score:"+ score,300,50);
}

function fruit(){
  if(frameCount % 60 ===0){
    var banana = createSprite(400,random(200,300),10,10);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.addImage("fruit",bananaImg);
    foodGroup.add(banana);
    banana.lifetime = 150;
  }
}

function obstacles(){
  if(frameCount % 100 ===0){
    var stone = createSprite(400,360,10,10);
    stone.scale=0.15;
    stone.velocityX=-3;
    stone.addImage("stone",stoneImg);
    obstaclesGroup.add(stone);
    stone.lifetime = 150;
  }
}

function size(){
  switch(score)
    {
      case 10:
        monkey.scale = 0.12;
      break;
       case 20:
        monkey.scale = 0.14;
      break;
       case 30:
        monkey.scale = 0.16;
      break;
       case 40:
        monkey.scale = 0.18;
      break;
      default: break;
    }
}