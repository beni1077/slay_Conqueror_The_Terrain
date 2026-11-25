export const centerX = 750;
export const centerY = 625;
export const hexSize = 25;

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

export function hexToPixel(q, r) {
    let x = centerX + (hexSize * Math.sqrt(3)) * (q + r / 2);
    let y = centerY + hexSize * 1.5 * r;
    let hexPosition = {
        x: x,
        y: y
    }
    return hexPosition;
}