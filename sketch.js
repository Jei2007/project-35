var database, position

var balloon, BalloonImg
var bgImg

function preload(){
  balloonImg = loadAnimation("h2","h3","h4")
  bgImg = loadImage("h1")
}

function setup() {
  createCanvas(800,400);
  database = firebase.database()
  createSprite(400, 200, 50, 50);

  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value", readPosition, showError)

  image(bgImg, 0, -displayHeight, displayWidth, displayHeight)
}

function draw() {
  background(255,255,255);  
  drawSprites();

  if (keyDown(UP_ARROW)) {
    updateHeight(0,-10)
    balloon.scale = balloon.scale = 0.01
  }

  if (keyDown(DOWN_ARROW)) {
    updateHeight(0,10)
    balloon.addAnimation("balloon", balloonImg)
    balloon.scale = balloon.scale = -0.01
  }
}

function updateHeight(x,y) {
  database.ref('balloon/position').set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readHeight(data) {
  height = data.val()
  balloon.x = height.x
  balloon.y = height.y
}

function showError() {
  console.log("Error in writing to the database");
}