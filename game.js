// Game
let score = 0;
let antSpeed = 2.5;
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
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  catPaw.draw(); // Draw the cat paw
  drawScore(); // Draw the score

  if (!gameOver) {
    ants.forEach((ant) => {
      ant.update();
      if (ant.markedForDeletion) {
        const index = ants.indexOf(ant);
        if (index !== -1) {
          ants.splice(index, 1);
          score++; // Increment the score when an ant is caught
          antSpeed += 0.01; // Increase ant speed when caught
        }
      }
      ant.draw(); // Draw the ant

      if (ant.x < 0) { // If the ant reaches the left edge of the canvas
        gameOver = true; // Set the gameOver flag to true
        winner = false; // Set winner to false when the player fails to catch the ants
      }
    });

    if (score >= 100) { 
      winner = true;
      gameOver = true; // Set the gameOver flag to true when the player wins
    }

    requestAnimationFrame(gameLoop);
  } else {
    ctx.fillStyle = 'white';
    ctx.font = '50px sans-serif';
    if (winner) {
      // Display a message "Yay you cleared the ants off!" in the center of the screen
      ctx.fillText('Yay you cleared the ants off!', canvas.width / 3 - 80, canvas.height / 2);
    } else {
      ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    }
    cancelAnimationFrame(gameLoopInterval);
    clearInterval(antAddInterval); // Clear the interval for adding new ants
    return;
  }
}

setTimeout(() => { // Wait 3 seconds before resetting the game
  resetGame(); // Call resetGame() after 3 seconds
}, 3000); 



function resetGame() { 
  ants.length = 0; // Clear the ants array
  clearInterval(antAddInterval);
  antSpeed = 1; // Reset the ant speed


// Create new ants
  const numAnts = 10; // Total number of ants
  const antsPerLocation = Math.ceil(numAnts / 2); // Number of ants per location

  // Create ants at the top of the canvas
  for (let i = 0; i < antsPerLocation; i++) { // Create 5 ants
    const ant1 = new Ants(game); // Create a new ant
    const ant2 = new Ants(game); 
    ants.push(ant1, ant2); 
    console.log("Ants", ant1.id, "and", ant2.id, "created"); 
  }

  // Create ants at the bottom of the canvas
  antAddInterval = setInterval(() => { // Store the interval ID in the antAddInterval property
    const ant1 = new Ants(game);
    const ant2 = new Ants(game);
    ants.push(ant1, ant2);
    console.log("Ants", ant1.id, "and", ant2.id, "created");
  }, 1500); // Add a new pair of ants every 1.5 seconds

  gameOver = false;
  winner = false;
  
}


resetGame(); // Call resetGame() before setting the gameLoopInterval

gameLoopInterval = requestAnimationFrame(gameLoop); // Start the game loop
game.init(); // Call the init() method on the game object