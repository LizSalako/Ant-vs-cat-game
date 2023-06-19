// Game
let antSpeed = 0.5;
let gameRunning = false; // Variable to track if the game loop should be running
let gameOver = false;
let winner = false;
let gameLoopInterval = null; // Interval for the game loop
let antAddInterval = null; // Interval for adding new ants
ants = []; // Array to store the ants

// Function to draw the score
function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '35px sans-serif';
  ctx.fillText('Score: ' + score, 10, 40); // Display the score in the top left corner
}

// Instructions
// Add event listener to the instructions button
const instructionsButton = document.getElementById('instructionsButton');
instructionsButton.addEventListener('click', showInstructions);

// Function to show the instructions
function showInstructions() {
  const instructions = document.getElementById('instructions');
  instructions.style.display = 'block';
}

// Add event listener to the close button in the instructions
const closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', closeInstructions);

// Function to close the instructions
function closeInstructions() {
  const instructions = document.getElementById('instructions');
  instructions.style.display = 'none';
}

// Game loop
function gameLoop() {
  if (!gameRunning) {
    return; // Exit the game loop if the game is not running
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  catPaw.draw(); // Draw the cat paw
  drawScore(); // Draw the score

  // Hide the start button when the game starts
startButton.style.display = 'none';


  if (!gameOver) {
    // Rest of the game logic...
    ants.forEach((ant, index) => {
      ant.update(); // Update the ant's position
      if (ant.markedForDeletion) {
        const index = ants.indexOf(ant); // Get the index of the ant
        if(index !== -1) {
        ants.splice(index, 1); // Remove the ant from the array if it's off the screen
        antSpeed += 0.5
      }
      }
      ant.draw(); // Draw the ant

      // Check for collision with the cat paw
      if (ant.y + ant.size > catPaw.y && ant.y < catPaw.y + catPaw.height && ant.x + ant.size > catPaw.x && ant.x < catPaw.x + catPaw.width) {
        ant.markedForDeletion = true; // Mark the ant for deletion
        score++; // Increase the score
        console.log('Score: ' + score);
      }

     if (ant.x < 0) {
      gameOver = true;
      winner = false;
     }
    });
    if (score >= 100) {
      winner = true;
      gameOver = true;
    }
    requestAnimationFrame(gameLoop);
  } else {
    ctx.fillStyle = 'white';
    ctx.font = '50px sans-serif';
    if (winner) {
      ctx.fillText('You win!', canvas.width / 2 - 100, canvas.height / 2);
    } else {
      ctx.fillText('Game over!', canvas.width / 2 - 100, canvas.height / 2);
    }
    cancelAnimationFrame(gameLoopInterval); // Stop the game loop
    clearInterval(antAddInterval); // Stop adding new ants
    return;
  }
}

   
// Start button event listener
startButton.addEventListener('click', () => {
  if (!gameRunning) {
    gameRunning = true; // Start the game loop only if it's not already running
    gameLoop();
  }
});




// Reset the game
function resetGame() {
  yPos = 0; // Reset the y position of the cat paw
  isPaused = false; // Reset the isPaused flag
  gameStarted = false; // Reset the gameStarted flag
  // Display the start button
  startButton.style.display = 'block';
  ants.length = 0; // Clear the ants array
  clearInterval(antAddInterval);
  antSpeed = 1; // Reset the ant speed
  
  // Create new ants
  const numAnts = 10; // Total number of ants
  const antsPerLocation = Math.ceil(numAnts / 3); // Number of ants per location
  const antLocations = [0, canvas.width / 3, canvas.width / 3 * 2]; // Array to store the x positions of the ant locations

  // Create ants at the bottom of the canvas
  for (let i = 0; i < antsPerLocation; i++) {
  const ant = new Ants(game, Math.random() * (canvas.width - Ants.size), canvas.height - Ants.size); // Create a new ant at a random x position at the bottom
  ants.push(ant);
  }
  
  antAddInterval = setInterval(() => {
  const ant = new Ants(game, Math.random() * (canvas.width - Ants.size), canvas.height - Ants.size); // Create a new ant at a random x position at the bottom
  ants.push(ant);
  }, 1500); // Add a new ant every 1.5 seconds
  
  gameOver = false;
  winner = false;
  
  score = 0; // Reset the score
  gameLoopInterval = requestAnimationFrame(gameLoop); // Start the game loop
  game.init(); // Call the init() method on the game object

  }


resetGame(); // Call resetGame() before setting the gameLoopInterval


gameLoopInterval = requestAnimationFrame(gameLoop); // Start the game loop
game.init(); // Call the init() method on the game object