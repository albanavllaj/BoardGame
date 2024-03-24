import { createPlayer } from "./player.js";
let avatar_url = null;
let avatar_url2 = null;
function getPlayerData() {
  const input1 = document.querySelector(".input1 input");
  const input2 = document.querySelector(".input2 input");
  const profile1 = document.querySelector(".profile_photo1");
  const profile2 = document.querySelector(".profile_photo2");
  const avatars = document.querySelectorAll(".select_avatar > div");

  let selectedProfile = profile1;
  let playerName = "";

  function removeBorder() {
    avatars.forEach((avatar) => {
      avatar.style.border = "none";
    });
  }

  input1.addEventListener("click", () => {
    selectedProfile = profile1;
    removeBorder();
    selectedProfile.style.border = "2px solid purple";
    playerName = input1.value;
  });

  input2.addEventListener("click", () => {
    selectedProfile = profile2;
    removeBorder();
    selectedProfile.style.border = "2px solid purple";
    playerName = input2.value;
  });

  let prevSelectedAvatarIndex = -1;

  avatars.forEach((avatar, index) => {
    avatar.addEventListener("click", () => {
      if (prevSelectedAvatarIndex !== index) {
        if (selectedProfile === profile1) {
          avatar_url = `../assets/avatar-images/gamer${index}.png`;
        } else {
          avatar_url2 = `../assets/avatar-images/gamer${index}.png`;
        }
        selectedProfile.style.backgroundImage = `url('../assets/avatar-images/gamer${index}.png')`;
        removeBorder();
        avatar.style.border = "2px solid purple";
        prevSelectedAvatarIndex = index;
      } else {
        alert(
          "You cannot select the same avatar as your profile picture! 💥💥"
        );
      }
    });
  });
}

getPlayerData();

const form = document.getElementById("my-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    localStorage.setItem("selectedOption", selectedOption.value);
  } else {
    alert("Please select an option before saving.");
  }

  const player1Name = $("#player1").val();
  const player2Name = $("#player2").val();

  const player1 = createPlayer(player1Name, avatar_url);
  const player2 = createPlayer(player2Name, avatar_url2);

  localStorage.setItem("Player 1", JSON.stringify(player1));
  localStorage.setItem("Player 2", JSON.stringify(player2));

  window.location.href = "board.html";
});
