function nextScreen(num) {
      document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
      document.getElementById(`screen${num}`).classList.add("active");
    }


    const game = document.getElementById("game-area");
    const player = document.getElementById("player");
    const scoreDisplay = document.getElementById("score");
    const endScreen = document.getElementById("screen4");


    let score = 0;
    let playing = false;
    let moveLeft = false, moveRight = false;


    // Keyboard arrows
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") moveLeft = true;
      if (e.key === "ArrowRight") moveRight = true;
    });
    document.addEventListener("keyup", e => {
      if (e.key === "ArrowLeft") moveLeft = false;
      if (e.key === "ArrowRight") moveRight = false;
    });


    // Touch movement
    game.addEventListener("touchmove", e => {
      const touch = e.touches[0];
      const left = touch.clientX - game.getBoundingClientRect().left - 25;
      if (left >= 0 && left <= game.clientWidth - 50) {
        player.style.left = left + "px";
      }
    });


    // Player movement loop
    function movePlayer() {
      if (moveLeft) player.style.left = Math.max(0, player.offsetLeft - 6) + "px";
      if (moveRight) player.style.left = Math.min(game.clientWidth - 50, player.offsetLeft + 6) + "px";
    }


    // Shuttle generator logic
    function createShuttle() {
      if (!playing) return;
      const shuttle = document.createElement("div");
      shuttle.classList.add("emoji");
      shuttle.textContent = "☄";
      shuttle.style.left = Math.random() * (game.clientWidth - 40) + "px";
      shuttle.style.top = "0px";
      game.appendChild(shuttle);


      const speed = 2 + Math.random() * 1.5;
      const drop = setInterval(() => {
        shuttle.style.top = shuttle.offsetTop + speed + "px";


        if (
          shuttle.offsetTop + 30 >= game.clientHeight - 70 &&
          shuttle.offsetLeft + 30 > player.offsetLeft &&
          shuttle.offsetLeft < player.offsetLeft + 60
        ) {
          score++;
          scoreDisplay.innerText = "Score: " + score;
          shuttle.remove();
          clearInterval(drop);
          if (score >= 20) return nextScreen(4);
        }


        if (shuttle.offsetTop > game.clientHeight) {
          shuttle.remove();
          clearInterval(drop);
        }
      }, 20);

      setTimeout(createShuttle, 1000 + Math.random() * 800);
    }
    function startGameAndSwitch() {
      score = 0;
      playing = true;
      scoreDisplay.innerText = "Score: 0";
      nextScreen(3);
      createShuttle();
    }
    function goToStart() {
      score = 0;
      playing = false;
      scoreDisplay.innerText = "Score: 0";
      document.getElementById("screen4").style.display = "none";
      nextScreen(1);
    }
    setInterval(movePlayer, 30);
  </script>

  <script>
  VANTA.NET({
    el: "body",
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x00FF85,
    backgroundColor: 0x0D0D0D,
    points: 13.00,
    maxDistance: 25.00,
    spacing: 18.00
  })
  </script>
