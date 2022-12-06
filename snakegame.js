// Inicializar canvas y serpiente
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }];
let direction = "right";

// Controlador de eventos para las teclas de flecha en un teclado de Mac
window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight" || event.key == "D") direction = "right";
  else if (event.key == "ArrowLeft" || event.key == "A") direction = "left";
  else if (event.key == "ArrowUp" || event.key == "W") direction = "up";
  else if (event.key == "ArrowDown" || event.key == "S") direction = "down";
});

let food = { x: 320, y: 320 };
let score = 0;

// Dibujar serpiente y comida
function draw() {
  // Limpiar canvas
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Dibujar serpiente
  ctx.fillStyle = "green";
  ctx.strokeStyle = "darkgreen";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    ctx.strokeRect(snake[i].x, snake[i].y, 10, 10);
  }

  // Dibujar comida
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeRect(food.x, food.y, 10, 10);
}

// Actualizar posición de la serpiente y verificar si ha comido una comida o chocado con un obstáculo
function update() {
  // Obtener nueva posición de la cabeza de la serpiente
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction == "right") head.x += 10;
  else if (direction == "left") head.x -= 10;
  else if (direction == "up") head.y -= 10;
  else if (direction == "down") head.y += 10;

  // Comprobar si la serpiente ha chocado con un obstáculo o se ha comido a sí misma
  for (let i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      // La serpiente se ha comido a sí misma
      return true;
    }
  }
  if (head.x < 0 || head.x > canvas.width - 10 || head.y < 0 || head.y > canvas.height - 10) {
    // La serpiente ha chocado con un obstáculo
    return true;
  }

  // Comprobar si la serpiente ha comido una comida
  if (head.x == food.x && head.y == food.y) {
    // Aumentar tamaño de la serpiente
    snake.unshift(head);
    score++;

    // Generar nueva comida
    food = { x: Math.floor(Math.random() * (canvas.width / 10)) * 10, y: Math.floor(Math.random() * (canvas.height / 10)) * 10 };
  } else {
    // Mover la serpiente
    snake.unshift(head);
    snake.pop();
  }
}


// Bucle de juego
function gameLoop() {
  if (update()) {
    // Fin del juego
    alert("Game Over! Puntuación: " + score);
    return;
  }
  draw();
  setTimeout(gameLoop, 100);
}
gameLoop();



