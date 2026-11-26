export const centerX = 750;
export const centerY = 625;
export const hexSize = 25;

export let hexDirections = [
    { q: 1, r: 0 },
    { q: 1, r: -1 },
    { q: 0, r: -1 },
    { q: -1, r: 0 },
    { q: -1, r: 1 },
    { q: 0, r: 1 }
];

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
export function hexDistance(q1, r1, q2, r2) {
    let dq = q1 - q2;
    let dr = r1 - r2;
    let ds = dq + dr;
    let distance = (Math.abs(dq) + Math.abs(dr) + Math.abs(ds)) / 2;

    return distance;
}