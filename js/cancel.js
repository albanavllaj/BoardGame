
/**function resetInputFields() {
  const input1 = document.getElementById("player1");
  const input2 = document.getElementById("player2");

  input1.value = "";
  input2.value = "";
}
*/

function resetInputFields() {
  $("#player1").val("");
  $("#player2").val("");
}


function clearAvatarSelections() {
  const avatarElements = document.querySelectorAll(".select_avatar > div");

  avatarElements.forEach((avatarElement) => {
    avatarElement.style.border = "none";
    avatarElement.style.backgroundColor = "";
    avatarElement.classList.remove("selected");
  });

  const profilePhoto1 = document.querySelector(".profile_photo1");
  const profilePhoto2 = document.querySelector(".profile_photo2");

  profilePhoto1.style.backgroundImage = "";
  profilePhoto2.style.backgroundImage = "";

  profilePhoto1.style.border = "none";
  profilePhoto2.style.border = "none";
}

function uncheckRadioButtons() {
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="option"]'
  );
  radioButtons.forEach((radioButton) => {
    radioButton.checked = false;
  });
}

const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", () => {
  resetInputFields();
  clearAvatarSelections();
  uncheckRadioButtons();
});
