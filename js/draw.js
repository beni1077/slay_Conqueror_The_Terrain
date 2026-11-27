import { tiles } from "./map.js";
import { hexSize, hexToPixel, hexKey } from "./hex.js";
import { getPlayer } from "./player.js";

//drawing one hexagon
export function drawHexagon(ctx, x, y, size, color) {
    ctx.beginPath();

    for (let i = 0; i < 6; i++) {
        const angleInRadians = (60 * i - 30) * Math.PI / 180;
        const cornerX = x + size * Math.cos(angleInRadians);
        const cornerY = y + size * Math.sin(angleInRadians);

        if (i == 0) {
            ctx.moveTo(cornerX, cornerY);
        }
        else {
            ctx.lineTo(cornerX, cornerY);
        }
    }
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
}

//drawing multiple hexagons
export function drawMap(ctx, selectedTile) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let tile of tiles.values()) {
        let q = tile.q;
        let r = tile.r;
        let position = hexToPixel(q, r);
        let color = "lightgreen";

        if (tile.terrain == "plains") {
            color = "khaki";
        }
        else if (tile.terrain == "forest") {
            color = "forestgreen";
        }
        else if (tile.terrain == "hills") {
            color = "darkgray";
        }

        if (tile.owner != null) {
            let currentPlayer = getPlayer(tile.owner);
            if (currentPlayer != undefined) {
                color = currentPlayer.color
            }
        }
        let key = hexKey(tile.q, tile.r);
        if (key == selectedTile) {
            color = "yellow";
        }

        drawHexagon(ctx, position.x, position.y, hexSize, color)
    }
}
