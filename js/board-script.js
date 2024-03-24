import { initPlayers, createPlayer } from "./player.js";

const ladder = {
  18: 39,
  7: 14,
  8: 31,
  27: 47,
  36: 84,
  52: 66,
  71: 91,
  78: 98,
};

const snake = {
  16: 6,
  46: 25,
  49: 12,
  62: 19,
  30: 10,
  73: 54,
  89: 70,
  95: 75,
  99: 80,
};

const board = document.getElementById("board");
const rows = 10;
const matrixArray = [];

var selectedOption = localStorage.getItem("selectedOption");
if (selectedOption === "theme1") {
  document.getElementById("customStylesheet").href = "../css/theme1.css";
} else if (selectedOption === "theme2") {
  document.getElementById("customStylesheet").href = "../css/theme2.css";
}

function createMatrix(n) {
  let block = n * n;

  for (let row = 0; row < n; row++) {
    let rows = [];

    for (let col = 0; col < n; col++) {
      rows.push(block);
      block--;
    }

    if (row % 2 === 1) {
      rows.reverse();
    }

    matrixArray.push(rows);
  }
}

createMatrix(rows);

function createBoard(matrixArray) {
  let boardHTML = "";

  for (let row = 0; row < matrixArray.length; row++) {
    for (let col = 0; col < matrixArray[row].length; col++) {
      const value = matrixArray[row][col];
      boardHTML += `<div class="tile" data-value="${value}">${value}</div>`;
    }
  }

  board.innerHTML = boardHTML;
}

createBoard(matrixArray);

initPlayers();

const storedPlayer1Data = JSON.parse(localStorage.getItem("Player 1"));
const storedPlayer2Data = JSON.parse(localStorage.getItem("Player 2"));

const storedPlayer1 = createPlayer(
  storedPlayer1Data.name,
  storedPlayer1Data.avatar,
  storedPlayer1Data.position,
  storedPlayer1Data.counter
);
const storedPlayer2 = createPlayer(
  storedPlayer2Data.name,
  storedPlayer2Data.avatar,
  storedPlayer2Data.position,
  storedPlayer2Data.counter
);

function placePlayerCircles(player) {
  const tile = document.querySelector(`.tile[data-value="${player.position}"]`);

  if (tile) {
    const playerCircle = document.createElement("div");
    playerCircle.id = `player-${player.name.toLowerCase()}-circle`;
    playerCircle.innerHTML = `
    <img src = ${player.avatar} class = "board_img">`;
    playerCircle.className = "circle";
    playerCircle.style.backgroundColor = "white";
    tile.appendChild(playerCircle);
  }
}

placePlayerCircles(storedPlayer1);
placePlayerCircles(storedPlayer2);

function displayWinnerModal(winnerName, winnerAvatar) {
  const modal = document.getElementById("winnerModal");
  const winnerModal = document.querySelector(".winner-modal-content");
  const winnerMessage = document.getElementById("winner-message");
  const avatarDiv = document.createElement("div");
  avatarDiv.innerHTML = `<img src="${winnerAvatar}" alt="${winnerName}" />`;
  winnerModal.appendChild(avatarDiv);
  winnerMessage.textContent = `${winnerName} has won the game!`;

  modal.style.display = "block";

  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// ----------Player Movement Dice Condition-----------------

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnPause = document.getElementById("pauseButton");
const modal = document.getElementById("pauseModal");
const resumeButton = document.getElementById("resumeButton");
let currentPlayer = storedPlayer1;
let timer;
let isPaused = false;

function rollDice() {
  if (isPaused) {
    return;
  }

  console.log(currentPlayer);

  const playerNamesElement = document.getElementById("current-player-name");

  playerNamesElement.textContent = `${currentPlayer.name}`;

  if (currentPlayer === storedPlayer1) {
    playerNamesElement.style.backgroundColor = "rosybrown";
  } else {
    playerNamesElement.style.backgroundColor = "royalblue";
  }

  if (currentPlayer) {
    fetch("https://api.random.org/json-rpc/2/invoke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "generateIntegers",
        params: {
          apiKey: "f68ace33-3b20-42f8-aeef-86d1150b923e",
          n: 1,
          min: 1,
          max: 6,
        },
        id: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const dice = data.result.random.data[0];
        diceEl.src = `../assets/dice-images/dice-${dice}.png`;

        if (!currentPlayer.hasMoved) {
          if (dice === 6) {
            currentPlayer.hasMoved = true;
            console.log("You rolled a 6 to start moving.");
          } else {
            switchTurn();
          }
        } else if (currentPlayer.hasMoved) {
          if (dice === 6) {
            currentPlayer.counter++;
            animatePlayerMovement(currentPlayer, dice);
            if (currentPlayer.counter >= 3) {
              switchTurn();
            }
          } else {
            if (currentPlayer.position <= 100) {
              animatePlayerMovement(currentPlayer, dice);
            }

            switchTurn();
          }
        }
      })
      .catch((error) => console.error("Error:", error));
  }
}

function switchTurn() {
  currentPlayer.counter = 0;
  if (currentPlayer === storedPlayer1) {
    currentPlayer = storedPlayer2;
  } else {
    currentPlayer = storedPlayer1;
  }
}

function autoRollDice() {
  clearInterval(timer);
  timer = setTimeout(() => {
    rollDice();
    autoRollDice();
  }, 10000);
}

btnRoll.addEventListener("click", function () {
  if (!currentPlayer.isWinner && !isPaused) {
    clearInterval(timer);
    rollDice();
    autoRollDice();
  }
});

btnPause.addEventListener("click", function () {
  pauseGame();
});

function pauseGame() {
  clearInterval(timer);
  isPaused = true;
  modal.style.display = "block";
}

resumeButton.addEventListener("click", function () {
  resumeGame();
});

function resumeGame() {
  isPaused = false;
  modal.style.display = "none";
  autoRollDice();
}

function disableGame() {
  btnRoll.disabled = true;
  clearInterval(timer);
}

autoRollDice();

function checkForCollisions(player) {
  for (const otherPlayer of [storedPlayer1, storedPlayer2]) {
    if (player !== otherPlayer && player.position === otherPlayer.position) {
      otherPlayer.position = 1;
      const tile = document.querySelector(`.tile[data-value="1"]`);
      tile.appendChild(
        document.getElementById(
          `player-${otherPlayer.name.toLowerCase()}-circle`
        )
      );
    }
  }
}

function movePlayer(player, dice) {
  let newPosition = player.position + dice;

  if (ladder[newPosition] && dice === 0) {
    newPosition = ladder[newPosition];
    console.log(
      `${player.name} found a ladder! Moving to position ${newPosition}.`
    );
  } else if (snake[newPosition] && dice === 0) {
    newPosition = snake[newPosition];
    console.log(
      `${player.name} found a snake! Moving to position ${newPosition}.`
    );
  }

  if (newPosition >= 100) {
    newPosition = 100;
  }

  const prevActiveTile = document.querySelector(".activeTile");
  if (prevActiveTile) {
    prevActiveTile.classList.remove("activeTile");
  }

  const currentTile = document.querySelector(
    `.tile[data-value="${player.position}"]`
  );
  const newTile = document.querySelector(`.tile[data-value="${newPosition}"]`);

  if (currentTile && newTile) {
    const playerId = player.name.toLowerCase();
    const playerCircle = document.getElementById(`player-${playerId}-circle`);
    if (playerCircle) {
      newTile.appendChild(playerCircle);
    } else {
      console.error("Player circle not found:", `player_${playerId}`);
    }
    player.move(newPosition);
    if (dice === 0) {
      checkForCollisions(player);
    }

    newTile.classList.add("activeTile");
  }

  if (player.position === 100) {
    setTimeout(() => {
      player.isWinner = true;
      displayWinnerModal(player.name, player.avatar);
      disableGame();
    }, 1000);
  }
}

function animatePlayerMovement(player, dice) {
  let currentPosition = player.position;
  let steps = dice;

  function moveStep() {
    setTimeout(function () {
      if (steps > 0) {
        currentPosition++;
        if (currentPosition <= 100) {
          movePlayer(player, 1);
          steps--;
          moveStep();
        }
      } else if (steps == 0) {
        movePlayer(player, 0);
      }
    }, 500);
  }

  moveStep();
}

//-----------Reset data after game over---------
function clearPlayers() {
  localStorage.removeItem("Player 1");
  localStorage.removeItem("Player 2");
  storedPlayer1.reset();
  storedPlayer2.reset();
}

function exitGame() {
  clearPlayers();

  currentPlayer = storedPlayer1;
  isPaused = false;

  const playerCircles = document.querySelectorAll(".circle");
  playerCircles.forEach((circle) => circle.remove());

  const modal = document.getElementById("winnerModal");
  modal.style.display = "none";

  btnRoll.disabled = false;

  autoRollDice();
}

const exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", function () {
  exitGame();
  window.location.href = "homepage.html";
});
