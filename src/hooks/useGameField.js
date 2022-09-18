import { useRef, useState } from "react";
import ShipField from "../models/ShipField";
import { copyMatrix, createSquareMatrix } from "../utils/Utils";

function useGameField() {
    const shipField = useRef(new ShipField());
    const [shotsField, setShotsField] = useState(createSquareMatrix(ShipField.FIELD_SIZE, false));
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

    const gameInfo = createSquareMatrix(ShipField.FIELD_SIZE, null);
    for (let i = 0; i < shotsField.length; i++) {
        for(let j = 0; j < shotsField[i].length; j++) {
            gameInfo[i][j] = {ship: shipField.current.shipCells[i][j], shot: shotsField[i][j]};
        }
    }
    findSunkenShips(gameInfo);

    return {gameInfo: gameInfo, shoot: shoot, shipsAlive: shipsAlive};
}

/**
 * Iterates over game field and finds sunken (all ship cells damaged) ships
 */
function findSunkenShips(gameInfo) {
    for (let x = 0; x < gameInfo.length; x++) {
        for (let y = 0; y < gameInfo[x].length; y++) {
            let cell = gameInfo[x][y];
            if (cell.ship && cell.shot) {
                if (
                    // Checks sibling cells to the right from current 
                    checkSunkenCells(x + 1, y, gameInfo, (x, y) => { return { x: x + 1, y: y} }) &&
                    // To the left 
                    checkSunkenCells(x - 1, y, gameInfo, (x, y) => { return { x: x - 1, y: y} }) &&
                    // Above 
                    checkSunkenCells(x, y + 1, gameInfo, (x, y) => { return { x: x, y: y + 1} }) &&
                    // Under 
                    checkSunkenCells(x, y - 1, gameInfo, (x, y) => { return { x: x, y: y - 1} })
                ) {
                    cell.sunken = true;
                }
            }
        }
    }
}

/**
 * Checks sunken cells, finding next ship cells by specified function
 * @param {*} nextCell(x, y) => {x, y} function to generate next cell to check
 * @returns true, if all cells found by function are damaged
 */
function checkSunkenCells(x, y, gameInfo, nextCell) {
    if (x < 0 || x >= ShipField.FIELD_SIZE || y < 0 || y >= ShipField.FIELD_SIZE) {
        return true;
    }
    
    let cell = gameInfo[x][y];
    if (!cell.ship || cell.sunken) {
        return true;
    }
    if (cell.shot) {
        let coordinates = nextCell(x, y);
        return checkSunkenCells(coordinates.x, coordinates.y, gameInfo, nextCell);
    }

    return false;
}

export default useGameField;
