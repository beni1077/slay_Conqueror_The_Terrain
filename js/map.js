import { hexKey } from "./hex.js";

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