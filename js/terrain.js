import { randomItem, randomInt } from "./random.js";
import { hexKey } from "./hex.js";
import { getNeighbors } from "./map.js";

const plainsDistributionPercentage = 0.08;
const forestDistributionPercentage = 0.07;
const hillDistributionPercentage = 0.05;

const groupDistributinChances = [1, 1, 1, 1, 1, 1, 2, 2, 2, 3];

export const terrainTypes = {
    grass: {
        name: "Grassland",
        income: 1,
        defense: 0,
        allowCastle: true
    },
    plains: {
        name: "Plains",
        income: 2,
        defense: 0,
        allowCastle: true
    },
    forest: {
        name: "Forest",
        income: 1,
        defense: 1,
        allowCastle: false
    },
    hills: {
        name: "Hills",
        income: 1,
        defense: 2,
        allowCastle: false
    }
}

//Search and return a given terrainType
export function getTerrainDetails(type) {
    let terrain = terrainTypes[type];

    if (terrain != undefined) {
        return terrain;
    }
    return terrainTypes.grass
}

//gives back an array of available grass tiles
function getAvailableTiles(tiles) {
    let availableTiles = [];

    for (let tile of tiles.values()) {
        if (tile.terrain == "grass") {
            availableTiles.push(tile);
        }
    }
    return availableTiles;
}

//select a random tile and sets its terrain to the given terrainType
function placeTerrain(tiles, terrainType, targetAmount) {
    let placedTerrain = 0;
    let attempts = 0;
    let maxAttempts = tiles.size * 20;

    while (placedTerrain < targetAmount && attempts < maxAttempts) {
        let availableTiles = getAvailableTiles(tiles);
        attempts += 1;

        if (availableTiles.length == 0) {
            break;
        }
        let isolatedTiles = getIsolatedTiles(availableTiles);
        let possibleStarts = availableTiles;

        if (isolatedTiles.length > 0) {
            possibleStarts = isolatedTiles;
        }

        let startTile = randomItem(possibleStarts);

        if (startTile == undefined) {
            continue
        }
        //determine desired group size
        let desiredSize = randomItem(groupDistributinChances);
        let remainingTilesToModify = targetAmount - placedTerrain;
        if (desiredSize > remainingTilesToModify) {
            desiredSize = remainingTilesToModify;
        }
        let groupOfTiles = [startTile];
        let usedTiles = new Set();//collecting used tiles
        usedTiles.add(hexKey(startTile.q, startTile.r));

        //collect candidates, select one, expand group
        while (groupOfTiles.length < desiredSize) {
            let candidates = [];

            for (let tile of groupOfTiles) {
                let neighbors = getNeighbors(tile.q, tile.r);

                for (let neighbor of neighbors) {
                    let key = hexKey(neighbor.q, neighbor.r);

                    if (neighbor.terrain == "grass" && usedTiles.has(key) == false) {
                        candidates.push(neighbor);
                    }
                }
            }
            if (candidates.length == 0) {
                break;
            }
            let chosenTile = randomItem(candidates);
            groupOfTiles.push(chosenTile);//add chosen tile to arrays
            usedTiles.add(hexKey(chosenTile.q, chosenTile.r));
        }

        for (let tile of groupOfTiles) { //apply terrain
            tile.terrain = terrainType;
            placedTerrain += 1;
        }
    }
}

//clears the terrain then generates and places special tiles randomly
export function generateTerrain(tiles) {
    let totalTiles = tiles.size;

    for (let tile of tiles.values()) {
        tile.terrain = "grass";
    }

    let terrainCounts = [
        { type: "plains", count: Math.round(totalTiles * plainsDistributionPercentage) },
        { type: "forest", count: Math.round(totalTiles * forestDistributionPercentage) },
        { type: "hills", count: Math.round(totalTiles * hillDistributionPercentage) }
    ];
    let randomTerrainType = shuffleArray(terrainCounts);
    for (let currentTerrain of randomTerrainType) {
        placeTerrain(tiles, currentTerrain.type, currentTerrain.count);
    }
}

//Fisher yates shuffle: returns a shuffled copy of the original array
function shuffleArray(array) {
    let shuffledItems = [];

    for (let currentItem of array) {
        shuffledItems.push(currentItem);
    }
    for (let i = shuffledItems.length - 1; i > 0; i--) {
        let randomIndex = randomInt(0, i);
        let temporary = shuffledItems[i]; //preventing losing an element
        shuffledItems[i] = shuffledItems[randomIndex];
        shuffledItems[randomIndex] = temporary;
    }
    return shuffledItems;
}

//checks if a tile has special neighboring tiles
function hasNearbySpecialTile(tile) {
    let neighbors = getNeighbors(tile.q, tile.r);

    for (let neighbor of neighbors) {
        if (neighbor.terrain != "grass") {
            return true;
        }
    }
    return false;
}

//searches for, and returns grass tiles without special neighbors
function getIsolatedTiles(available) {
    let isolatedTiles = [];
    for (let tile of available) {
        if (hasNearbySpecialTile(tile) == false) {
            isolatedTiles.push(tile);
        }
    }
    return isolatedTiles;
}

