export function randomInt(min, max) {
    let randomRange = max - min + 1;
    let randomGeneration = Math.random() * randomRange
    randomGeneration = Math.floor(randomGeneration);
    randomGeneration += min;

    return randomGeneration;
}

export function randomItem(array) {
    if (array.length == 0) {
        return undefined;
    }
    let generatedRandomItem = randomInt(0, array.length - 1);

    return array[generatedRandomItem];
}