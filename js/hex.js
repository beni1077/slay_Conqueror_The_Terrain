export const centerX = 750;
export const centerY = 625;
export const hexSize = 25;

export function hexToPixel(q, r) {
    let x = centerX + (hexSize * Math.sqrt(3)) * (q + r / 2);
    let y = centerY + hexSize * 1.5 * r;
    let hexPosition = {
        x: x,
        y: y
    }
    return hexPosition;
}
export function hexKey(q, r) {
    return q + "," + r
}