import { drawMap } from "./draw.js";
import { hexKey, pixelToHex } from "./hex.js";
import { generateMap } from "./map.js";
import { createPlayers } from "./player.js";

export class gameEngine {
    constructor(state, ctx) { //creates an initial object when a new instance of the class is created
        this.state = state;
        this.ctx = ctx;
    }
    handleCanvasClick(x, y) { //handles mouse click and selects clicked tile
        let mousePosition = pixelToHex(x, y);
        let key = hexKey(mousePosition.q, mousePosition.r);
        let currentTile = this.state.tiles.get(key);

        if (currentTile == undefined) {
            this.state.selectedTile = null;
            return;
        }
        this.state.selectedTile = key;
        console.log(this.state.selectedTile);
    }
    getSelectedTile() { //return selected tile if exists
        if (this.state.selectedTile == null) {
            return null;
        }
        let tile = this.state.tiles.get(this.state.selectedTile);
        if (tile == undefined) {
            return null;
        }
        return tile;
    }
    newGame(aiCount) { //resets everything for a new game
        if ((aiCount != 1 && aiCount != 2 && aiCount != 3 && aiCount != 4 && aiCount != 5)) {
            aiCount = 5;
        }
        createPlayers(aiCount);
        generateMap(180, 240, this.state.players);
        this.state.selectedTile = null;
        this.state.selectedUnitKey = null;
        this.state.currentPlayer = 0;
        this.state.turn = 1;
        this.state.phase = "playing";
        this.state.winner = null;
        this.state.territories = new Map();
        this.state.nextTerritoryId = 1;
    }

    //input, update, draw mathods as main engine
    input(action) {
        this.update(action);
        this.draw();
    }
    update(action) {
        if (action.type == "newGame") {
            this.newGame(action.aiCount);
            return;
        }
        if (this.state.phase == "gameover") {
            return;
        }

        switch (action.type) {
            case "canvasClick":
                this.handleCanvasClick(action.x, action.y);
                break;
            default: console.log("I messed up something...unknown action", action.type);

        }
    }
    draw() {
        drawMap(this.ctx, this.state.selectedTile);
    }

}
