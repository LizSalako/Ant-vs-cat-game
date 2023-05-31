class Enemy {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }
  

  update() {
    this.x -= 1.5;
    if (this.x < 0 - this.width) {
      this.x = this.game.width; // Reset the enemy's x position to the right edge of the canvas
    }
  }

  draw() {
    ctx.drawImage(this.ant, this.x, this.y, this.width, this.height);
  }
}

let loadedImages = 0; // Move outside the class definition



// Check if all images have been loaded
function checkAllImagesLoaded() {
  loadedImages++;
  console.log("Loaded " + loadedImages + " out of " + ants.length);
  if (loadedImages === ants.length) {
    gameLoop(); // Start the game loop when all images have been loaded
  }
}

class Ants extends Enemy {
  constructor(game) {
    super(game);
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
    console.log("x is now " + this.x);
    super.update();
    console.log("update() is done!");
  }
}



const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);


function restartGame() {
  console.log('Clearing ants and resetting score');
  ants.length = 0;
  score = 0;
  
  console.log('Ants array: ' + ants);
  console.log('Score: ' + score);

  // Create new ants
  for (let i = 0; i < 10; i++) {
    const ant = new Ants(game);
    ants.push(ant);
    console.log(`Ant ${i} created`);
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

  // Initialize the game
init() {
  // Get the canvas element and its context
  const canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');

  // Assign the canvas element to the game object's properties
  this.canvas = canvas;
  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;

  // Create an array of ant objects
 
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
  }
  

  update(mouseX, mouseY) {
    // Move the cat paw towards the mouse position
    this.x = mouseX - this.width / 2;
    this.y = mouseY - this.height / 2;

    // Check collision with ants
    ants.forEach((ant) => {
      if (this.isColliding(ant)) {
        // Handle collision logic here
        // For example, you can remove the collided ant from the ants array
        // and increase the score
        score++;

        ant.markedForDeletion = true;

   // Add new ants
   //const newAntsCount = Math.floor(score / 5) + 1; // Increase the number of ants added
   //for (let i = 0; i < newAntsCount; i++) {
     //const newAnt = new Ants(game);
     //ants.push(newAnt);
   //}
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


