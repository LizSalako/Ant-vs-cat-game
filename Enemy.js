// Purpose: Create the Enemy class and Hero class
let loadedImages = 0; // Move outside the class definition

// Create the game loop
class Enemy {
  constructor(game) { // Add the game parameter
    this.game = game; // Store the game object in the enemy object
    this.markedForDeletion = false; // Add a property to store the marked for deletion flag
  }
  update() { // Remove the game parameter
    this.x -= 1.5; // Move the enemy to the left
    if (this.x < 0 - this.width) { // Check if the enemy is outside the left edge of the canvas
      this.x = this.game.width; // Reset the enemy's x position to the right edge of the canvas
    }
  }
// Draw the enemy
  draw() {
    ctx.drawImage(this.ant, this.x, this.y, this.width, this.height);
  }
}

// Check if all images have been loaded
function checkAllImagesLoaded() {
  loadedImages++;
  console.log("Loaded " + loadedImages + " out of " + ants.length); // Log the number of loaded images
  if (loadedImages === ants.length) {
    console.log("All images loaded");
    gameLoop();
  }
}

// Create the ant class
class Ants extends Enemy {
  constructor(game) { // Add the game parameter
    super(game); // Call the parent class constructor and pass the game parameter
    this.antWidth = 50;
    this.antHeight = 20;
    this.width = this.antWidth;
    this.height = this.antHeight;
    this.x = game.width; // Start the ant outside the right edge of the canvas
    this.y = game.height - this.height - 40; // Start the ant at the bottom of the canvas
    this.direction = Math.random() < 0.5 ? -1 : 1; // Randomly choose the direction
    this.ant = new Image();
    this.ant.src = 'Subject.jpg';
    console.log('Ant image loaded');
    this.ant.onload = () => {
      console.log('Ant image loaded');
      this.loaded = true; // Set the loaded flag to true
      checkAllImagesLoaded(); // Check if all images have been loaded
    };
  }

  update() {
    this.x += 0.90 * this.direction; // Multiply the speed by the direction
    console.log("x is now " + this.x); // Log the x position
    super.update();
    console.log("update() is done!");
  }
}

// Reset the game when the restart button is clicked
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

// Restart the game
function restartGame() {
  yPos = 0; // Reset the y position of the cat paw
  isPaused = false; // Reset the isPaused flag
  gameStarted = false; // Reset the gameStarted flag
  // Display the start button
  startButton.style.display = 'block';
  console.log('Clearing ants and resetting score'); 
  ants.length = 0; // Clear the ants array
  score = 0; 

  console.log('Ants array: ' + ants);
  console.log('Score: ' + score);

  // Create new ants
  for (let i = 0; i < 10; i++) { // Create 10 ants
    const ant = new Ants(game); // Create a new ant
    ants.push(ant); // Add the ant to the ants array
    console.log(`Ant ${i} created`); // Log the creation of the ant

    // Add more ants
    antAddInterval = setInterval(() => { // Store the interval ID in the antAddInterval property
      const ant = new Ants(game); 
      ants.push(ant);
      console.log(`Ant ${i} created`); 
    }, 4000); // Add a new ant every 4 seconds
  }

  // Reset game over flag
  gameOver = false;

  
  // Restart the game loop
  gameLoop();
}

/// Create the game object
const game = {
  width: 1190,
  height: 600,
  ctx: null, // Add a property to store the context
  canvas: null, // Add a property to store the canvas element
  canvasWidth: null, // Add a property to store the canvas width
  canvasHeight: null, // Add a property to store the canvas height
  score: 0, // Add a property to store the score
  gameOver: false, // Add a property to store the game over flag
  winner: false, // Add a property to store the winner flag
  antSpeed: 2.5, // Add a property to store the ant speed
  antAddInterval: null, // Add a property to store the interval ID
  scoreElement: document.getElementById('scoreElement'), // Add a property to store the score element
  gameOverElement: document.getElementById('gameOverElement'), // Add a property to store the game over element
  winnerElement: document.getElementById('winnerElement'), // Add a property to store the winner element
  closeButton: document.getElementById('closeButton'), // Add a property to store the close button
  instructions: document.getElementById('instructions'), // Add a property to store the instructions
  instructionsButton: document.getElementById('instructionsButton'), // Add a property to store the instructions button
  catPaw: null, // Add a property to store the cat paw object
  ants: [], // Add a property to store the ants array
  antImage: new Image(), // Add a property to store the ant image
  catImage: new Image(), // Add a property to store the cat image
  catWidth: 300, // Add a property to store the cat width
  catHeight: 200, // Add a property to store the cat height
  antWidth: 50, // Add a property to store the ant width
  antHeight: 20, // Add a property to store the ant height

  
  

  // Initialize the game
init() {
  // Get the canvas element and its context
  const canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Assign the canvas element to the game object's properties
  this.canvas = canvas;
  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;
 
  // Start the game loop
  gameLoop();
}
};



// Create an array of ant objects
const ants = [];
for (let i = 0; i < 10; i++) {
  const ant = new Ants(game);
  ants.push(ant);
}

// Create the cat paw object
class CatPaw {
  constructor(game) {
    this.game = game;
    this.catWidth = 300;
    this.catHeight = 200;
    this.width = this.catWidth;
    this.height = this.catHeight;
    this.x = 0;
    this.y = game.height - this.height;
    this.catImage = new Image();
    this.catImage.src = 'catImage.png'
    this.catImage.onload = () => {
      console.log('Cat image loaded');
      this.loaded = true; // Set the loaded flag to true
      checkAllImagesLoaded(); // Check if all images have been loaded
    }
  }

  update(mouseX, mouseY) { // Add the mouse position parameters
    // Move the cat paw towards the mouse position
    this.x = mouseX - this.width / 2; // Subtract half of the cat paw width to center the image
    this.y = mouseY - this.height / 2; // Subtract half of the cat paw height to center the image
  
    // Check collision with ants
    ants.forEach((ant) => { // Loop through the ants array
      if (this.isColliding(ant)) { // Check if the cat paw is colliding with the ant
        if (!ant.markedForDeletion) {
          score++; // Increment the score only if the ant is not already marked for deletion
          
        }
        ant.markedForDeletion = true;
 }
});
  }

  isColliding(ant) {
    // Check collision between cat paw and ant using bounding box collision detection
    if (
      this.x < ant.x + ant.width &&
      this.x + this.width > ant.x &&
      this.y < ant.y + ant.height &&
      this.y + this.height > ant.y
    ) {
      return true; // Collision detected
    }
    return false; // No collision
  }

  draw() {
    ctx.drawImage(this.catImage, this.x, this.y, this.width, this.height);
  }
}

// Create the cat paw object
const catPaw = new CatPaw(game);

// Add event listener to track mouse movement
canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  catPaw.update(mouseX, mouseY);
});

// Add event listener to the canvas
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  catPaw.update(mouseX, mouseY);
});


game.init();
