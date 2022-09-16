import { getRandomBoolean, getRandomInt } from "../utils/Random";
import { createSquareMatrix } from "../utils/Utils";

/**
 * Model of the sea battle game field
 */
class ShipField {
    /**
     * List with ships stats: it length and maximum amount
     */
    static ships = Object.freeze([
        { length: 4, amount: 1 },
        { length: 3, amount: 2 },
        { length: 2, amount: 3 },
        { length: 1, amount: 4 }
    ])

    constructor() {
        this.shipCells = createSquareMatrix(10, false);
        this.#createShips();
    }
    
    #createShips() {
        ShipField.ships.forEach((ship) => {
            for (let i = 0; i < ship.amount; i++) {
                let isShipHorizontal = getRandomBoolean();
                let coordinates;
                while (true) {
                    if (isShipHorizontal) {
                        coordinates = {x: getRandomInt(0, 10 - ship.length), y: getRandomInt(0, 9)}
                    } else {
                        coordinates = {x: getRandomInt(0, 9), y: getRandomInt(0, 10 - ship.length)}
                    }
                    if (this.canPlaceShip(coordinates.x, coordinates.y, ship.length, isShipHorizontal)) {
                        this.placeShip(coordinates.x, coordinates.y, ship.length, isShipHorizontal);
                        break;
                    }
                }
            }
        })
    }

    placeShip(x, y, length, isHorizontal) {
        for (let bias = 0; bias < length; bias++) {
            if (isHorizontal) {
                this.shipCells[x + bias][y] = true;
            } else {
                this.shipCells[x][y + bias] = true;
            }
        }
    }

    canPlaceShip(x, y, length, isHorizontal) {
        for (let bias = 0; bias < length; bias++) {
            if (
                (isHorizontal && this.hasShipNearby(x + bias, y)) ||
                (!isHorizontal && this.hasShipNearby(x, y + bias)) 
            ) {
                return false;
            }
        }

        return true;
    }

    /**
     * Checks if neighbors or diagonals cells around specified coordinates has ship on it 
     */
    hasShipNearby(x, y) {
        for (let xbias = -1; xbias <= 1; xbias++) {
            for (let ybias = -1; ybias <= 1; ybias++) {
                if (this.hasShip(x + xbias, y + ybias)) {
                    return true;
                }
            }
        }

        return false;
    }

    hasShip(x, y) {
        if (x < 0 || x > 9 
            || y < 0 || y > 9) {
                return false;
        }
        return this.shipCells[x][y];
    }
}

export default ShipField;
