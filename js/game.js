
import { createMap, tiles } from "./map.js";
import { drawMap } from "./draw.js";
import { getTile, getNeighbors } from "./map.js";
import { hexDistance } from "./hex.js";


const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");


createMap(8);
drawMap(ctx);
console.log(getTile(0, 0));
console.log(getTile(100, 100));
console.log(getNeighbors(0, 0));
let numberOfNeighborsTest = getNeighbors(0, 0);
console.log(numberOfNeighborsTest.length);
numberOfNeighborsTest = getNeighbors(8, 0);
console.log(numberOfNeighborsTest.length);
console.log(hexDistance(0, 0, 3, 2));




