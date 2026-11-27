import { hexKey, hexDirections, hexDistance } from "./hex.js";
import { randomInt } from "./random.js";
import { generateTerrain } from "./terrain.js";

export const tiles = new Map();

//stores axial coordinate for a hexagon
function createTile(q, r) {
    let tile = {
        q: q,
        r: r,
        owner: null,
        terrain: "grass"
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

//generates a map randomly between the given tile numbers
export function generateMap(minTileNumber, maxTileNumber) {
    tiles.clear();
    let targetSize = randomInt(minTileNumber, maxTileNumber);

    growMainIsland(targetSize);

    generateTerrain(tiles);
}

//get all frontier positions for possible expansion of the map
function getFrontier() {
    let frontier = new Map();

    for (let tile of tiles.values()) {
        let emptyNeighborPositions = getEmptyNeighbors(tile.q, tile.r);
        for (let possiblePosition of emptyNeighborPositions) {
            let key = hexKey(possiblePosition.q, possiblePosition.r);
            let distance = hexDistance(possiblePosition.q, possiblePosition.r, 0, 0);

            if (distance > 15) {
                continue
            }
            frontier.set(key, possiblePosition);
        }
    }
    let positions = [];
    for (let position of frontier.values()) {
        positions.push(position)
    }
    return positions;
}

//defines how the island grows, helper function for generateMap
function growMainIsland(targetSize) {
    addTile(0, 0); //starting tile
    while (tiles.size < targetSize) {
        let frontierPositions = getFrontier();

        if (frontierPositions.length == 0) {
            break;
        }
        let weighted = []; //stores all positions calculated weight
        let totalWeight = 0; //sum of all the weights

        for (let position of frontierPositions) { //calculating every positions weight
            let weight = getWeightedGrowth(position);
            let weightedDetails = {
                position: position,
                weight: weight
            }
            weighted.push(weightedDetails);
            totalWeight += weight;
        }

        let choice = Math.random() * totalWeight; //generating random weight

        for (let current of weighted) { //candidate selection+adding 1 tile
            choice -= current.weight;
            if (choice <= 0) {
                addTile(current.position.q, current.position.r);
                break
            }
        }
    }
}

//counts existing neighbors of a tile
function countExistingNeighbors(q, r) {
    let existingNeighbors = getNeighbors(q, r);

    return existingNeighbors.length;
}

//chooses how desirable a tile is when selecting for growth
function getWeightedGrowth(position) {
    let distanceFromCenter = hexDistance(position.q, position.r, 0, 0);
    let neighbors = countExistingNeighbors(position.q, position.r);
    let compactnessNumber = 1.3;

    if (neighbors == 1) {
        compactnessNumber = 0.75;
    }
    else if (neighbors == 2) {
        compactnessNumber = 1.65;
    }
    else if (neighbors == 3) {
        compactnessNumber = 2.2;
    }

    let distanceWeight = Math.max(0.12, 1 - distanceFromCenter / 17);
    let randomness = 0.5 + Math.random();

    return compactnessNumber * distanceWeight * randomness;
}

//helper function for testing and debugging
export function setTileTerrainTo(q, r, terrainType) {
    let currentTile = getTile(q, r);

    if (currentTile == undefined) {
        return
    }
    currentTile.terrain = terrainType;
}

//calculates the distance between a possible starting tile and closest already selected one
function distanceToClosestStartingTile(candidate, startingTiles) {
    if (startingTiles.length == 0) {
        return hexDistance(candidate.q, candidate.r, 0, 0);
    }
    let closestDistance = null;

    for (let startingTile of startingTiles) {
        let distance = hexDistance(candidate.q, candidate.r, startingTile.q, startingTile.r);

        if (closestDistance == null || distance < closestDistance) {
            closestDistance = distance;
        }
    }
    return closestDistance;
}

//chooses as many starting tiles as the parameter
export function chooseTerritoryStartingTiles(startingTilesCount) {
    let candidates = [];

    for (let tile of tiles.values()) { //only select tiles with 3 or more neighbors
        let neighborCount = countExistingNeighbors(tile.q, tile.r);
        if (neighborCount >= 3) {
            candidates.push(tile);
        }
    }
    let startingTiles = [];

    for (let i = 0; i < startingTilesCount; i++) {
        let bestTile = null;
        let bestScore = 0;

        for (let candidate of candidates) {
            if (startingTiles.includes(candidate)) {
                continue;
            }
            //choosing the best candidate
            let distance = distanceToClosestStartingTile(candidate, startingTiles);
            let score = distance + Math.random() * 2;
            if (bestTile == null || score > bestScore) {
                bestScore = score;
                bestTile = candidate;
            }
        }
        if (bestTile != null) {
            startingTiles.push(bestTile);
        }
    }
    return startingTiles;
}

