import { tiles } from "./map.js";
import { players } from "./player.js";

export function createGameState() {
    let states = {
        tiles: tiles,
        players: players,
        territories: new Map(),
        nextTerritoryId: 1,
        selectedTile: null,
        selectedUnitKey: null,
        currentPlayer: 0,
        turn: 1,
        phase: "playing",
        winner: null
    }
    return states;
}