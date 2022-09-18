import { getRandomInt } from "../utils/Random";

/**
 * Computes next shot coordinates for enemy AI
 * @param {*} fieldState - field of the player
 * @returns {} {x, y} - coordinates of the next shot
 */
export function getShootCoordinates(fieldState) {
    while (true) {
        let x = getRandomInt(0, fieldState.length - 1);
        let y = getRandomInt(0, fieldState.length - 1);

        if (!fieldState[x][y].shot) {
            return {x: x, y: y};
        }
    }
}
