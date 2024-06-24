const container = document.querySelector("#grid-container");
const changeSize = document.querySelector("#change-size");
const clearSketch = document.querySelector("#clear-sketch");
const blackColor = document.querySelector("#black-color");
const shadeColor = document.querySelector("#shade-color");
const rgbColor = document.querySelector("#rgb-color");

let gridSize = 16;
let color = "black";
let shade = false;
let rgb = false;

changeSize.addEventListener("click", () => {
  // will prompt again whenver not giving a number 1-100.
  do {
    gridSize = Number(prompt("Enter a number of size (1-100)", 16));
  } while (
    isNaN(gridSize) ||
    !Number.isInteger(gridSize) ||
    gridSize < 1 ||
    gridSize > 100
  );
  container.textContent = "";
  createGrid(gridSize);
});

clearSketch.addEventListener("click", () => {
  container.textContent = "";
  createGrid(gridSize);
});

blackColor.addEventListener("click", () => {
  shade = false;
  rgb = false;
});

shadeColor.addEventListener("click", () => {
  shade = true;
  rgb = false;
});

rgbColor.addEventListener("click", () => {
  rgb = true;
  shade = false;
});

function createGrid(gridSize) {
  const numGrids = gridSize * gridSize;
  for (let i = 0; i < numGrids; i++) {
    const box = document.createElement("div");
    box.className = "grid-item";
    box.style.width = `calc(100% / ${gridSize})`; // will divide the width from 100% into gridSize parts
    box.style.height = `calc(100% / ${gridSize})`; // will divide the heigth from 100% into gridSize parts
    box.dataset.shadeLevel = 0;
    container.appendChild(box);
  }

  const gridBoxes = document.querySelectorAll(".grid-item");

  gridBoxes.forEach((gridbox) => {
    gridbox.addEventListener("mouseover", () => {
      if (rgb) {
        gridbox.dataset.shadeLevel = 0;
        color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`;
      } else if (shade) {
        let shadeLevel = parseInt(gridbox.dataset.shadeLevel);
        shadeLevel = Math.min(shadeLevel + 1, 10); // Increment shade level, max is 10
        gridbox.dataset.shadeLevel = shadeLevel;

        const shadeValue = 255 - shadeLevel * 25; // Calculate the new shade value
        color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;

        gridbox.style.backgroundColor = color;
        return;
      } else {
        color = "black";
      }
      gridbox.style.backgroundColor = color;
    });
  });
}

createGrid(gridSize);
