const  canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');

let gameOver = false;
let speed;

function game() {
  if(!gameOver){
       speed = 4;
        setInterval(update, 1000 / speed);
   }        
}
game();

function Audio(src) {
  this.Audio = document.createElement("audio");
  this.Audio.src = src;
  this.Audio.setAttribute("preload", "auto");
  this.Audio.setAttribute("controls", "none");
  this.Audio.style.display = "none";
  this.Audio.volume = 0.1;

  document.body.appendChild(this.Audio);

  this.play = function () {
    this.Audio.play();
  };
  this.stop = function () {
    this.Audio.pause();
  };
}

//////audios
      const biteSound = new Audio("./audios/snakebite.wav");
      const collisionSound = new Audio("./audios/snakedead.wav");
      const bgmSound = new Audio("./audios/snakebgm.wav");
      
      let gridSize = 30;
      let tileSize = 16;
      let nextX = 0;
      let nextY = 0;
      // snakeSS
      let defaultTailSize = 3;
      let tailSize = defaultTailSize;
      let snakeTrail = [];
      let snakeX = 10;
      let snakeY = 10;

      //apple
      let appleImage = new Image();
      appleImage.src = "./png/apple8.png";
      let appleX = 20;
      let appleY = 20;

      //draw every x times call function update
      let score = 0;
    function update() {
        if(gameOver){
          return} else {
          //bgmSound.play();
           snakeX += nextX;
           snakeY += nextY;
        }       

     /////end game
        if (snakeX < -1 ||
          snakeX > gridSize ||
          snakeY < -1 ||
          snakeY > gridSize) {
            collisionSound.play();
            bgmSound.stop();
            gameOver = true;
            clearInterval(game);
            startBtn.style.display = 'block';
        }
       
        //snake bite apple
        if (snakeX == appleX && snakeY == appleY) {
          tailSize++;
          appleX = Math.floor(Math.random() * gridSize);
          appleY = Math.floor(Math.random() * gridSize);
          score++;
          speed += 0.5;
          biteSound.play();
          document.getElementById("score").innerHTML = "Score:" + score;
        }
       
        //background draw color
        ctx.fillStyle = "#ddd";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let j = 0; j < canvas.width; j += 16) {
          ctx.strokeStyle = "#aaa";
          ctx.strokeRect(j, 0, tileSize * gridSize, tileSize * gridSize);
          ctx.strokeRect(0, j, tileSize * gridSize, tileSize * gridSize);
        }

        for (var i = 0; i < snakeTrail.length; i++) {
          ctx.fillStyle = i == snakeTrail.length - 1 ? "green" : "orange";
          ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
          );

          if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            tailSize = defaultTailSize;
            document.getElementById("score").innerHTML = score;
            score = 0;
          }
        }

        ctx.drawImage(
          appleImage,
          appleX * tileSize,
          appleY * tileSize,
          tileSize * 1.25,
          tileSize * 1.25
        );
        //set snake snakeTrail
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
          snakeTrail.shift();
        } 
    }

    /////keydown event/////
      document.addEventListener("keydown", keyDownEvent);
      function keyDownEvent(e) {
        bgmSound.play();
        switch (e.keyCode) {
          case 37:
            nextX = -1;
            nextY = 0;
            break;
          case 38:
            nextX = 0;
            nextY = -1;
            break;
          case 39:
            nextX = 1;
            nextY = 0;
            break;
          case 40:
            nextX = 0;
            nextY = 1;
            break;
        }
      }
  
  /////button event/////
      const up = document.getElementById('upBtn');
      const left = document.getElementById('leftBtn');
      const right = document.getElementById('rightBtn');
      const down = document.getElementById('downBtn');

  up.addEventListener('click', () => {
    bgmSound.play();
    nextX = 0;
    nextY = -1;
  })
  down.addEventListener('click', () => {
    nextX = 0;
    bgmSound.play();
    nextY = 1;
  })
  left.addEventListener('click', () => {
    bgmSound.play();
    nextX = -1;
    nextY = 0;
  })
  right.addEventListener('click', () => {
    bgmSound.play();
    nextX = 1;
    nextY = 0;
  })

  ////restart
  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';   
    snakeX = 10;
    snakeY = 10;
    appleX = 20;
    appleY = 20;
    score = 0;
    gameOver = false;  
  })