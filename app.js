// Create the canvas and its context
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1190;
canvas.height = 600;

// When player enters the game add a start button to the page and when clicked, the game starts
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', function () {
  startButton.style.display = 'none'; // Hide the start button
  instructionsButton.style.display = 'none'; // Hide the instructions button
  closeButton.style.display = 'none'; // Hide the close button
  instructions.style.display = 'none'; // Hide the instructions
 

  

     // Display the canvas
const canvas = document.getElementById('canvas1');
canvas.style.display = 'block';



      // Start the game loop
      resetGame();
      gameLoopInterval = requestAnimationFrame(gameLoop);
    });

const catImage = new Image();
catImage.src = 'catImage.png';
const catWidth = 700;
const catHeight = 600;


const ant = new Image();
ant.src = 'Subject.jpg';
const antWidth = 50;
const antHeight = 20;

let yPos = 0;
let isPaused = false;

function animate() {
  if (gameStarted) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(10, 10, 50, 50);
  ctx.drawImage(ant, 0 * antWidth, 200, antWidth, antHeight);
  ctx.drawImage(catImage, 0 * catWidth, 400, catWidth, catHeight);
  
  if (!isPaused) {
    yPos += 1;
  }
   // Check for game over condition and reset the game
   if (yPos > canvas.height) {
    resetGame();
  }
  }
  requestAnimationFrame(animate);
}

canvas.addEventListener('click', function () {
  isPaused = !isPaused;
});





animate();
