var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// INPUT
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

// INPUT CHECKER
var enter = false;

function keyDownHandler(a) {
  if(a.which === 16)
  {enter = true;}
  if(a.key == "Right" || a.key == "ArrowRight")
  {player.right = true;}
  else if (a.key =="Left"||a.key =="ArrowLeft")
  {player.left = true;}
}

function keyUpHandler(a) {
  if(a.which === 16)
  {enter = false;}
  if(a.key == "Right" || a.key == "ArrowRight")
  {player.right = false;}
  else if (a.key =="Left"||a.key =="ArrowLeft")
  {player.left = false;}
}

// PADDLE CLASS
class paddle{
  constructor(x, y, width, speed){
    this.x = x;
    this.y = y
    this.width = width;
    this.speed = speed;
  }
  draw(){
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, 5);
    ctx.fillRect(this.x, this.y, -this.width, 5);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }
}

var ball = new function(){
  this.x = canvas.width/2;
  this.dx = -2;

  this.y = canvas.height/2;
  this.dy = -10;
  this.ddy = 0.3;
  this.radius = 25;

  // DRAW FUNCTION
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2 );
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
  // COLLISION FUNCTION
  this.collisions = function(){
    // IF HITS THE WALLS
    if(this.x - this.radius +  this.dx < 0 || this.x + this.dx + this.radius > canvas.width)
    {this.dx = -this.dx}
    // IF HITS THE PADDLE
    if(Math.abs(this.y + this.radius - player.y) < this.dy
    && Math.abs(this.x + this.dx - player.x) < player.width + ball.radius)
    {this.dy = -15}
    // IF HITS THE PADDLE SIDE
    if(this.y > player.y && Math.abs(this.x + this.dx - player.x) < player.width + ball.radius){
      this.dx = -this.dx;
    }
  }

  // PHYSICS FUNCTION
  this.physics = function(){
    this.y += this.dy;
    this.dy += this.ddy;
    this.x += this.dx;
    this.collisions();
  }
}

// NEW PADDLE ( X, WIDTH, SPEED );
// PLAYER PADDLE
var player = new paddle(200,canvas.height-30,40,10);
player.left = false;
player.right = false;
player.move = function(){
  if(this.left && this.x - this.speed - this.width > 0)
  {this.x -= this.speed;}
  if(this.right && this.x + this.speed + this.width < canvas.width)
  {this.x += this.speed;}
}

// DRAW
setInterval(draw,15);

function draw(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  player.draw();
  player.move();
  ball.physics();
  ball.draw();
}
