
import { createMap, tiles } from "./map.js";
import { drawMap } from "./draw.js";


const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");


createMap(8);
drawMap(ctx);
console.log(tiles.size);





