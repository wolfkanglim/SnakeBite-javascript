const  canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function game() {
        let x = 5;
        setInterval(update, 1000 / x);
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

      //audios
      const bite = new Audio("/audios/snakebite.wav");
      const dead = new Audio("/audios/snakedead.wav");
      const run = new Audio("/audios/ping.mp3");

      let gridSize = 30;
      let tileSize = 16;
      let nextX = (nextY = 0);
      // snakeSS
      let defaultTailSize = 3;
      let tailSize = defaultTailSize;
      let snakeTrail = [];
      let snakeX = (snakeY = 10);

      //apple
      let appleImage = new Image();
      appleImage.src = "/imagesvs/apple8.png";
      let appleX = (appleY = 20);

      //draw every x times call function update
      let score = 0;
      function update() {
        snakeX += nextX;
        snakeY += nextY;

        //outof bound hit the wall -return from other side
        /*    if (snakeX < 0) {
          snakeX = gridSize - 1;
        }
        if (snakeX > gridSize - 1) {
          snakeX = 0;
        }
        if (snakeY < 0) {
          snakeY = gridSize - 1;
        }
        if (snakeY > gridSize - 1) {
          snakeY = 0;
        } */

        //end game
        if (
          snakeX == -1 ||
          snakeX == gridSize ||
          snakeY == -1 ||
          snakeY == gridSize
        ) {
          dead.play();
        }
        if (
          snakeX < -3 ||
          snakeX > gridSize + 3 ||
          snakeY < -3 ||
          snakeY > gridSize + 3
        ) {
          clearInterval(game);
        }

        //snake bite apple
        if (snakeX == appleX && snakeY == appleY) {
          tailSize++;
          appleX = Math.floor(Math.random() * gridSize);
          appleY = Math.floor(Math.random() * gridSize);
          score++;
          bite.play();
          document.getElementById("demo").innerHTML = score;
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
            document.getElementById("demo").innerHTML = score;
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
      document.addEventListener("keydown", keyDownEvent);
      function keyDownEvent(e) {
        run.play();
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
      /*  const btn = document.getElementById("btn");
      btn.addEventListener("click", game); */
