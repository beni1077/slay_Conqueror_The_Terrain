
import { createMap } from "./map.js";
import { drawMap } from "./draw.js";
import { getTile } from "./map.js";
import { pixelToHex } from "./hex.js";


const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
let selectedTile = null;
canvas.addEventListener("click", function (event) {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    let mousePosition = pixelToHex(mouseX, mouseY);
    let currentTile = getTile(mousePosition.q, mousePosition.r);
    if (currentTile != undefined) {
        selectedTile = currentTile;
    }
    else {
        selectedTile = null;
    }
    console.log(selectedTile);
    drawMap(ctx, selectedTile);
})



createMap(8);
drawMap(ctx, selectedTile);




