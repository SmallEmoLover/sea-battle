/**
 * Gets random integer in range [from, to]
 * @param {*} from - lower range bound
 * @param {*} to - upper range bound
 * @returns random integer in specified range
 */
export function getRandomInt(from, to) {
    return Math.floor(
        Math.random() * (to - from + 1) + from
    );
}

export function getRandomBoolean() {
    return getRandomInt(0, 1) === 1;
}