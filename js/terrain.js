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
export function getTerrainDetails(type) {
    let terrain = terrainTypes[type];

    if (terrain != undefined) {
        return terrain;
    }
    return terrainTypes.grass
}