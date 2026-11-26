export const centerX = 750;
export const centerY = 625;
export const hexSize = 25;

//possible neighbor directions
export let hexDirections = [
    { q: 1, r: 0 },
    { q: 1, r: -1 },
    { q: 0, r: -1 },
    { q: -1, r: 0 },
    { q: -1, r: 1 },
    { q: 0, r: 1 }
];

//axial conversion to pixel coordninates
export function hexToPixel(q, r) {
    let x = centerX + (hexSize * Math.sqrt(3)) * (q + r / 2);
    let y = centerY + hexSize * 1.5 * r;
    let hexPosition = {
        x: x,
        y: y
    }
    return hexPosition;
}

//making coordinates easier to reach for map
export function hexKey(q, r) {
    return q + "," + r
}

//distance between 2 tiles
export function hexDistance(q1, r1, q2, r2) {
    let dq = q1 - q2;
    let dr = r1 - r2;
    let ds = dq + dr;
    let distance = (Math.abs(dq) + Math.abs(dr) + Math.abs(ds)) / 2;

    return distance;
}

//converting coordinates from pixel back to axial ones
export function pixelToHex(x, y) {
    let toConvertX = x - centerX;
    let toConvertY = y - centerY;
    let q = (Math.sqrt(3) / 3 * toConvertX - toConvertY / 3) / hexSize;
    let r = (2 / 3) * toConvertY / hexSize;

    return hexRound(q, r);
}

//rounding because pixelToHex did not give integer values back
function hexRound(q, r) {
    let s = -q - r;
    let roundedQ = Math.round(q);
    let roundedR = Math.round(r);
    let roundedS = Math.round(s);
    let qDifference = Math.abs(roundedQ - q);
    let rDifference = Math.abs(roundedR - r);
    let sDifference = Math.abs(roundedS - s);

    if (qDifference > rDifference && qDifference > sDifference) {
        roundedQ = -roundedR - roundedS;
    }
    else if (rDifference > sDifference) {
        roundedR = -roundedQ - roundedS;
    }
    else {
        roundedS = -roundedQ - roundedR;
    }

    return { q: roundedQ, r: roundedR };
}