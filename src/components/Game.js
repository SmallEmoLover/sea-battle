import useGameField from "../hooks/useGameField";
import GameField from "./GameField";
import '../styles/Game.css'
import { getShootCoordinates } from "../models/EnemyAi";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";

/**
 * React-component representing main game window
 * @param {*} props - expects playerName and enemyName strings
 */
function Game(props) {
    const playerField = useGameField();
    const enemyField = useGameField();
    const [isPlayerTurn, setPlayerTurn] = useState(true);
    const AIThinkingCheckbox = useInput(false);

    useEffect(() => {
        if (!isPlayerTurn) {
            let delay = 2000;
            if (AIThinkingCheckbox.value) {
                delay = 0;
            }
            let timeout = setTimeout(() => {
                let enemyShot = getShootCoordinates(playerField.gameInfo);
                if(!playerField.shoot(enemyShot.x, enemyShot.y)) {
                    enemyShot = getShootCoordinates(playerField.gameInfo);
                    setPlayerTurn(true);
                }
            }, delay)
            // Without timeout clearing toggling checkbox will cause multiple enemy turns
            return () => clearTimeout(timeout);
        }
    }, [isPlayerTurn, playerField, AIThinkingCheckbox.value])

    if (playerField.shipsAlive === 0) {
        return <div> Вы проиграли </div>
    }

    if (enemyField.shipsAlive === 0) {
        return <div> Вы выиграли </div>
    }

    const onPlayerShoot = (x, y) => {
        if (!isPlayerTurn) {
            return;
        }
        if (!enemyField.shoot(x, y)) {
            setPlayerTurn(false);
        }
    }

    return (
        <div className="game">
            <div className="information-panel">
                <div> <b> {props.playerName} vs. {props.enemyName} </b> </div>
                <div> Осталось клеток с кораблями: </div>
                <div> {playerField.shipsAlive} : {enemyField.shipsAlive} </div>
                <input type='checkbox' checked={AIThinkingCheckbox.value} onChange={AIThinkingCheckbox.onChange}/>
                Противник отвечает мгновенно
            </div>
            <div className="fields-list">
                <GameField field={playerField.gameInfo} cellsHidden={false}/>
                <GameField field={enemyField.gameInfo} onClick={onPlayerShoot} cellsHidden={true}/>
            </div>
        </div>
    )
}

export default Game;
