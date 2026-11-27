import { gameEngine } from "./engine.js";
import { createGameState } from "./state.js";

const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
let state = createGameState();
let game = new gameEngine(state, ctx);

canvas.addEventListener("click", function (event) {
    let action = {
        type: "canvasClick",
        x: event.offsetX,
        y: event.offsetY
    }
    game.input(action);
})

let action = {
    type: "newGame",
    aiCount: 3
}
game.input(action);

console.log(state);