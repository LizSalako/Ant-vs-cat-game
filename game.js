let score = 0;


function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '35px sans-serif';
  ctx.fillText('Score: ' + score, 10, 40);
}

let antSpeed = 1.5;
let gameOver = false;
let winner = false;
let gameLoopInterval = null;
let antAddInterval = null; // Interval for adding new ants


// Add event listener to the instructions button
const instructionsButton = document.getElementById('instructionsButton');
instructionsButton.addEventListener('click', showInstructions);

// Function to show the instructions
function showInstructions() {
  const instructions = document.getElementById('instructions');
  instructions.style.display = 'block';
}

const instructions = document.getElementById('instructions');
const closeButton = document.getElementById('closeButton');

closeButton.addEventListener('click', closeInstructions);

function closeInstructions() {
  instructions.style.display = 'none';
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    catPaw.draw();
    drawScore();
  
    if (!gameOver) {
      ants.forEach((ant) => {
        ant.update();
        if (ant.markedForDeletion) {
          const index = ants.indexOf(ant);
          if (index !== -1) {
            ants.splice(index, 1);
            score++; // Increment the score when an ant is caught
            antSpeed += 0.05; // Increase ant speed when caught
          }
        }
        ant.draw();
  
        if (ant.x < 0) {
          gameOver = true;
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
        // Display a message Yay you clear the ants off in the center of the screen
        ctx.fillText('Yay you clear the ants off!', game.width / 3 - 80, game.height / 2);
      } else {
        ctx.fillText('Game Over', game.width / 2 - 100, game.height / 2);
      }
      cancelAnimationFrame(gameLoopInterval);
      clearInterval(antAddInterval); // Clear the interval for adding new ants
      return;
    }
  }

setTimeout(() => {
  resetGame();
}, 3000);



function resetGame() {
  ants.length = 0;
  clearInterval(antAddInterval);
  score = 0; // Reset the score

  const numAnts = 10; // Total number of ants
  const antsPerLocation = Math.ceil(numAnts / 2); // Number of ants per location

  for (let i = 0; i < antsPerLocation; i++) {
    const ant1 = new Ants(game);
    const ant2 = new Ants(game);
    ants.push(ant1, ant2);
    console.log("Ants", ant1.id, "and", ant2.id, "created");
  }

  antAddInterval = setInterval(() => {
    const ant1 = new Ants(game);
    const ant2 = new Ants(game);
    ants.push(ant1, ant2);
    console.log("Ants", ant1.id, "and", ant2.id, "created");
  }, 1500); // Add a new pair of ants every 1.5 seconds

  antSpeed = 1.1; // Reset the ant speed
  gameOver = false;
  winner = false;
}


resetGame(); // Call resetGame() before setting the gameLoopInterval

gameLoopInterval = requestAnimationFrame(gameLoop);
game.init();
