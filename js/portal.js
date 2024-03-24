(function () {
  const gridContainer = document.getElementById("grid-container");

  function createGrid() {
    for (let i = 0; i < 100; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridItem.id = `cell-${i + 1}`;
      gridContainer.appendChild(gridItem);
    }
  }

  function updateGridContent() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item, index) => {
      const cellId = `cell-${index + 1}`;
      const cell = document.getElementById(cellId);
    });
  }
  createGrid();
  updateGridContent();
})();
