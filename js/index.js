var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

//paleta
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//Detectar las teclas direccionales de izquierda/derecha
var rightPressed = false;
var leftPressed = false;

//Agregar eventos de presionado y soltado de teclas
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

//Esta funcion determina si se presiona una tecla
function keyDownHandler(event) {
if (event.keyCode == 39){
  rightPressed = true;
} else if (event.keyCode == 37) {
  leftPressed = true;
 }
}
//Esta funcion determina si se suleta una tecla
function keyUpHandler(event){
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
}

//Esta función dibuja una paleta
function drawPaddle(){
  context.beginPath();
  context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle = "#E91E63";
  context.fill();
  context.closePath();
}

// Esta funcion dibuja un circulo en la posicion x, y
function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI*2);
  context.fillStyle = "#f368e0";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Se llama a la funcion de dibujar un circulo
  drawBall();

  //se llama a la funcion de dibujar ña paleta
  drawPaddle();

  // Verificar si llego al limite izquierdo/derecha
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && paddleX + paddleWidth){
      dy = -dy;
    } else {
        alert("MORISTE");
        document.location.reload();
    }
  }

  // verificar si se toco la tecla direccional derecha
  if (rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);
