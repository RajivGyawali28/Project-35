var balloon1, balloon2;
var database, position;

function preload(){
  backgroundImg = loadImage("sprites/Background.png");
  balloon1 = loadAnimation("sprites/HotAirBalloon2.png");
  balloon2 = loadAnimation("sprites/HotAirBalloon2.png","sprites/HotAirBalloon2.png","sprites/HotAirBalloon2.png",
  "sprites/HotAirBalloon3.png","sprites/HotAirBalloon3.png","sprites/HotAirBalloon3.png","sprites/HotAirBalloon4.png",
  "sprites/HotAirBalloon4.png","sprites/HotAirBalloon4.png");
}

function setup() {
  createCanvas(1300,600);
  database = firebase.database();
  balloon = createSprite(400, 450, 50, 50);
  balloon.addAnimation("HotAirBalloon",balloon1);
  balloon.scale=0.5;

  var getinfo = database.ref("balloon/position")
  getinfo.on("value",readop,showError)
}

function draw() {
  background(backgroundImg);
  textSize(20);
  fill("black");
  text("Use Arrow keys to move the Hot Air Balloon",50,50);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
    balloon.addAnimation("HotAirBalloon",balloon2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(+10,0)
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.addAnimation("HotAirBalloon",balloon2);
    balloon.scale=balloon.scale-0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10)
    balloon.addAnimation("HotAirBalloon",balloon2);
    balloon.scale=balloon.scale+0.005;
  }
  drawSprites();
}

function updateHeight(x,y){
  database.ref("balloon/position").update({
      x:position.x+x,
      y:position.y+y
  })
}

function readop(data){
  position = data.val();
  balloon.x = position.x
  balloon.y = position.y
}

function showError(){
  console.log("error");
}