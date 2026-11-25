
import { drawHexagon } from "./draw.js";
import { hexToPixel } from "./draw.js";
import { hexSize } from "./draw.js";

const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
let color = "green";

let hexPosition = hexToPixel(0, 0);

drawHexagon(ctx, hexPosition.x, hexPosition.y, hexSize, color);
hexPosition = hexToPixel(1, 0);
drawHexagon(ctx, hexPosition.x, hexPosition.y, hexSize, color);
hexPosition = hexToPixel(1, -1);
drawHexagon(ctx, hexPosition.x, hexPosition.y, hexSize, color);
hexPosition = hexToPixel(0, -1);
drawHexagon(ctx, hexPosition.x, hexPosition.y, hexSize, color);
hexPosition = hexToPixel(-1, 0);
drawHexagon(ctx, hexPosition.x, hexPosition.y, hexSize, color);
hexPosition = hexToPixel(-1, 1);
drawHexagon(ctx, hexPosition.x, hexPosition.y, hexSize, color);
hexPosition = hexToPixel(0, 1);
drawHexagon(ctx, hexPosition.x, hexPosition.y, hexSize, color);




