const gameContainer = document.querySelector("#gameContainer");
const scoreBoard = document.querySelector("#score");

//
const gridSize = 40;
let snake = [760];
let direction = 1;
let foodPosition = null;
let score = 0;
let interval;

// crate game grid

function createGrid() {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.id = `pixel${i}`;
    gameContainer.appendChild(pixel);
  }
}

// place food

function placeFood() {
  let food = document.querySelector(".food");
  if (food) food.classList.remove("food");

  do {
    foodPosition = Math.floor(Math.random() * gridSize * gridSize);
  } while (snake.includes(foodPosition));
  document.getElementById(`pixel${foodPosition}`).classList.add("food");
}

// move snake

function moveSnake() {
  const head = snake[0] + direction;

  // check for collision
  if (
    head < 0 || //top wall
    head >= gridSize * gridSize || //bottomwall
    (direction === 1 && head % gridSize === 0) || // right wall
    (direction === -1 && (head + 1) % gridSize === 0) || // left wall
    snake.includes(head) // self collision
  ) {
    alert("GAme OVer! Final Score" + score);
    clearInterval(interval);
    return;
  }
   // Add new head
   snake.unshift(head);

   // Check for food
   if (head === foodPosition) {
     score++;
     scoreBoard.textContent = score;
     placeFood();
   } else {
     // Remove tail
     const tail = snake.pop();
     document.getElementById(`pixel${tail}`).classList.remove('snakeBodyPixel');
   }
 
   // Update snake on grid
   snake.forEach((segment) => {
     document.getElementById(`pixel${segment}`).classList.add('snakeBodyPixel');
   });
}
// Change Direction
function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== gridSize) direction = -gridSize; // Up
    if (key === 'ArrowDown' && direction !== -gridSize) direction = gridSize; // Down
    if (key === 'ArrowLeft' && direction !== 1) direction = -1; // Left
    if (key === 'ArrowRight' && direction !== -1) direction = 1; // Right
  }
  
  // Initialize Game
  function initGame() {
    createGrid();
    placeFood();
    interval = setInterval(moveSnake, 100);
    document.addEventListener('keydown', changeDirection);
  }
  
  // Start the game
  initGame();