import { useRef, useState } from "react";
import ShipField from "../models/ShipField";
import { copyMatrix, createSquareMatrix } from "../utils/Utils";

function useGameField() {
    const shipField = useRef(new ShipField());
    const [shotsField, setShotsField] = useState(createSquareMatrix(10, false));

    const shoot = (x, y) => {
        setShotsField((state) => {
            let newState = copyMatrix(state);
            newState[x][y] = true;
            return newState;
        });
    }

    const gameInfo = createSquareMatrix(10, null);
    for (let i = 0; i < shotsField.length; i++) {
        for(let j = 0; j < shotsField[i].length; j++) {
            gameInfo[i][j] = {ship: shipField.current.shipCells[i][j], shot: shotsField[i][j]};
        }
    }

    return [gameInfo, shoot];
}

export default useGameField;
