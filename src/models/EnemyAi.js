import { getRandomInt } from "../utils/Random";

export function getShootCoordinates(fieldState) {
    while (true) {
        let x = getRandomInt(0, fieldState.length - 1);
        let y = getRandomInt(0, fieldState.length - 1);

        if (!fieldState[x][y].shot) {
            return {x: x, y: y};
        }
    }
}
