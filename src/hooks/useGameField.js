import { useRef, useState } from "react";
import ShipField from "../models/ShipField";
import { copyMatrix, createSquareMatrix } from "../utils/Utils";

function useGameField() {
    const shipField = useRef(new ShipField());
    const [shotsField, setShotsField] = useState(createSquareMatrix(10, false));
    const [shipsAlive, setShipsAlive] = useState(ShipField.ships.reduce(
        (alive, ship) => alive + ship.amount * ship.length,
        0
        ))

    /**
     * Shoots to specified coordinates
     * @param {*} x 
     * @param {*} y 
     * @returns true, if the shot hits the ship, otherwise - false
     */
    const shoot = (x, y) => {
        setShotsField((state) => {
            let newState = copyMatrix(state);
            newState[x][y] = true;
            return newState;
        });

        if (shipField.current.shipCells[x][y]) {
            setShipsAlive((state) => state - 1);
            return true;
        }

        return false;
    }

    const gameInfo = createSquareMatrix(10, null);
    for (let i = 0; i < shotsField.length; i++) {
        for(let j = 0; j < shotsField[i].length; j++) {
            gameInfo[i][j] = {ship: shipField.current.shipCells[i][j], shot: shotsField[i][j]};
        }
    }

    return {gameInfo: gameInfo, shoot: shoot, shipsAlive: shipsAlive};
}

export default useGameField;
