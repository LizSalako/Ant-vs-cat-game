// Create the canvas and its context
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1190;
canvas.height = 600;


//const catImage = new Image();
//catImage.src = 'catImage.png';
//const catWidth = 700;
//const catHeight = 600;

//const ant = new Image();
//ant.src = 'Subject.jpg';
//const antWidth = 50;
//const antHeight = 20;

const avatar = new Image();
avatar.src = 'Image5.jpg';
const avatarWidth = 50;
const avatarHeight = 50;


let yPos = 0;
let isPaused = false;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(10, 10, 50, 50);
  ctx.drawImage(ant, 0 * antWidth, 200, antWidth, antHeight);
  ctx.drawImage(catImage, 0 * catWidth, 400, catWidth, catHeight);
  
  if (!isPaused) {
    yPos += 1;
  }
  requestAnimationFrame(animate);
}

canvas.addEventListener('click', function () {
  isPaused = !isPaused;
});

animate();
