import { hexKey } from "./hex.js";
import { hexDirections } from "./hex.js";

export const tiles = new Map();

function createTile(q, r) {
    let tile = {
        q: q,
        r: r
    }
    return tile;
}
export function createMap(radius) {
    tiles.clear();

    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            if (Math.abs(i + j) <= radius) {
                const tile = createTile(i, j);
                const key = hexKey(i, j);
                tiles.set(key, tile);
            }
        }
    }
}
export function getTile(q, r) {
    let key = hexKey(q, r);
    let tileToReturn = tiles.get(key);
    return tileToReturn;
}
export function getNeighbors(q, r) {
    let neighbors = [];
    for (let direction of hexDirections) {
        let neighborQ = q + direction.q;
        let neighborR = r + direction.r;
        let neighborTile = getTile(neighborQ, neighborR);

        if (neighborTile !== undefined) {
            neighbors.push(neighborTile);
        }
    }
    return neighbors;
}