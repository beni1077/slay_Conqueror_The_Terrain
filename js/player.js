export let players = [];

let playerColors = ["lightgreen", "tomato", "cornflowerblue", "orange", "mediumpurple", "pink"];


//creates the player infos as objects
export function createPlayers(aiCount) {
    players.length = 0;
    let humanPlayer = {
        id: 0,
        name: "Player",
        color: playerColors[0],
        isHuman: true
    }
    players.push(humanPlayer);

    for (let i = 1; i <= aiCount; i++) {
        let aiPlayer = {
            id: i,
            name: "AI" + i,
            color: playerColors[i],
            isHuman: false
        }
        players.push(aiPlayer)
    }
}

//searches for a player and returns it
export function getPlayer(id) {
    for (let player of players) {
        if (player.id == id) {
            return player
        }
    }
    return undefined;
}