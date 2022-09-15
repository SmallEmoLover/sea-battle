export function getRandomInt(from, to) {
    return Math.floor(
        Math.random() * (to - from + 1) + from
    );
}

export function getRandomBoolean() {
    return getRandomInt(0, 1) === 1;
}