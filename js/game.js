
import { drawHexagon } from "./draw.js";

const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const centerX = 750;
const centerY = 625;
const hexSize = 25;
let color = "green";

drawHexagon(ctx, centerX, centerY, hexSize, color);