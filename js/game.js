
import { createMap, setTileOwner } from "./map.js";
import { drawMap } from "./draw.js";
import { getTile } from "./map.js";
import { pixelToHex } from "./hex.js";
import { createPlayers, players } from "./player.js";


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
createMap(8);

setTileOwner(0, 0, 0);
setTileOwner(1, 0, 0);
setTileOwner(1, -1, 0);
setTileOwner(-3, 0, 1);
setTileOwner(-3, 1, 1);
setTileOwner(-2, 0, 1);
setTileOwner(3, -3, 2);
setTileOwner(4, -3, 2);
setTileOwner(3, -2, 2);
setTileOwner(0, 3, 3);
setTileOwner(1, 3, 3);
setTileOwner(0, 4, 3);

drawMap(ctx, selectedTile);
console.log(players)


