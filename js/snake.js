(function () {
  const gridContainer = document.getElementById("grid-container2");

  function createGrid() {
    for (let i = 0; i < 60; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item2");
      gridItem.id = `cell-${i + 1}`;
      gridContainer.appendChild(gridItem);
    }
  }

  function updateGridContent() {
    const gridItems = document.querySelectorAll(".grid-item2");
    gridItems.forEach((item, index) => {
      const cellId = `cell-${index + 1}`;
      const cell = document.getElementById(cellId);
    });
  }

  createGrid();
  updateGridContent();
})();
