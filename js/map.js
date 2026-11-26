import { hexKey, hexDirections } from "./hex.js";
import { randomInt, randomItem } from "./random.js";

export const tiles = new Map();

//stores axial coordinate for a hexagon
function createTile(q, r) {
    let tile = {
        q: q,
        r: r,
        owner: null
    }
    return tile;
}

//tells how many layers to draw around the starting hex
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

//search for a given tile by mapkey
export function getTile(q, r) {
    let key = hexKey(q, r);
    let tileToReturn = tiles.get(key);
    return tileToReturn;
}

//gives back an array of neighbor tiles of a hex
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

//sets a tile's owner to the given player
export function setTileOwner(q, r, ownerId) {
    let currentTile = getTile(q, r);

    if (currentTile == undefined) {
        return;
    }
    currentTile.owner = ownerId;
}

//adds a tile to tiles(map))
function addTile(q, r) {
    if (tiles.has(hexKey(q, r)) == true) {
        return getTile(q, r);
    }
    let newTile = createTile(q, r)
    tiles.set(hexKey(q, r), newTile);

    return newTile;

}

//returns empty neighboring tiles
function getEmptyNeighbors(q, r) {
    let emptyNeighbors = [];
    for (let direction of hexDirections) {
        let neighborQ = q + direction.q;
        let neighborR = r + direction.r;

        if (getTile(neighborQ, neighborR) == undefined) {
            let emptyPosition = { q: neighborQ, r: neighborR };
            emptyNeighbors.push(emptyPosition)
        }
    }
    return emptyNeighbors;
}

export function generateMap(minTileNumber, maxTileNumber) {
    tiles.clear();
    let targetSize = randomInt(minTileNumber, maxTileNumber);
    let existingTiles = [];
    let startingTile = addTile(0, 0);
    existingTiles.push(startingTile);

    while (tiles.size < targetSize) {
        let currentTileToGoFrom = randomItem(existingTiles);
        let emptyNeighborsOfCurrentTile = getEmptyNeighbors(currentTileToGoFrom.q, currentTileToGoFrom.r)

        if (emptyNeighborsOfCurrentTile.length > 0) {
            let randomNeighbor = randomItem(emptyNeighborsOfCurrentTile)
            let newTile = addTile(randomNeighbor.q, randomNeighbor.r);
            existingTiles.push(newTile)
        }
    }
}