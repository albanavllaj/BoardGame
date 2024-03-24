function createPlayer(name, avatar) {
  return {
    name: name,
    avatar: avatar,
    position: 1,
    isWinner: false,
    hasMoved: false,
    counter: 0,
    move: function (newPosition) {
      this.position = newPosition;
      localStorage.setItem(name, JSON.stringify(this));
    },
    reset: function () {
      this.position = 1;
      this.isWinner = false;
      this.hasMoved = false;
      localStorage.removeItem(name);
    },
  };
}

function initPlayers() {
  const initPlayer1 = JSON.parse(localStorage.getItem("Player 1"));
  const initPlayer2 = JSON.parse(localStorage.getItem("Player 2"));
  const playerNamesDiv2 = document.getElementById("playerNames");

  const player1Element = document.createElement("div");
  player1Element.innerHTML = `
  <img src="${initPlayer1.avatar}" alt="${initPlayer1.name}" class="avatar-images"/>
  <p class="player1">Player 1: ${initPlayer1.name}</p>`;
  playerNamesDiv2.appendChild(player1Element);

  const player2Element = document.createElement("div");
  player2Element.innerHTML = `
  <img src="${initPlayer2.avatar}" alt="${initPlayer2.name}" class="avatar-images"/>
  <p class="player2">Player 2: ${initPlayer2.name}</p>`;
  playerNamesDiv2.appendChild(player2Element);
}

export { createPlayer, initPlayers };
