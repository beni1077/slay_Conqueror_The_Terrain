
import { chooseTerritoryStartingTiles, generateMap, setTileOwner } from "./map.js";
import { drawMap } from "./draw.js";
import { getTile, tiles } from "./map.js";
import { pixelToHex } from "./hex.js";
import { createPlayers } from "./player.js";

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

createPlayers(3);
generateMap(180, 240);

let startingTiles = chooseTerritoryStartingTiles(8);
for (let startingTile of startingTiles) {
    setTileOwner(startingTile.q, startingTile.r, 1)
}
drawMap(ctx, selectedTile);

console.log(startingTiles);
console.log(startingTiles.length);
console.log(tiles.size);

