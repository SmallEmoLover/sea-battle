import useGameField from "../hooks/useGameField";
import GameField from "./GameField";
import '../styles/Game.css'
import { getShootCoordinates } from "../models/EnemyAi";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import GameEnd from "./GameEnd";
import Help from "./Help";

/**
 * React-component representing main game window
 * @param {*} props - expects playerName and enemyName strings
 */
function Game(props) {
    const playerField = useGameField();
    const enemyField = useGameField();
    const [isPlayerTurn, setPlayerTurn] = useState(true);
    const AIThinkingCheckbox = useInput(true);
    const [isHelpVisible, setHelpVisible] = useState(false);

    useEffect(() => {
        if (!isPlayerTurn) {
            let delay = 2000;
            if (!AIThinkingCheckbox.value) {
                delay = 0;
            }
            let timeout = setTimeout(() => {
                let enemyShot = getShootCoordinates(playerField.gameInfo);
                if(!playerField.shoot(enemyShot.x, enemyShot.y)) {
                    setPlayerTurn(true);
                }
            }, delay)
            // Without timeout clearing toggling checkbox will cause multiple enemy turns
            return () => clearTimeout(timeout);
        }
    }, [isPlayerTurn, playerField, AIThinkingCheckbox.value])

    if (playerField.shipsAlive === 0) {
        return <GameEnd winner={props.enemyName} restart={props.restart}/>
    }

    if (enemyField.shipsAlive === 0) {
        return <GameEnd winner={props.playerName} restart={props.restart}/>
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
            <Help visible={isHelpVisible} closeHelp={() => {setHelpVisible(false)}}/>
            <div className="information-panel">
                <h1> {props.playerName} vs. {props.enemyName} </h1>
                <div>
                    <input type='checkbox' checked={AIThinkingCheckbox.value} onChange={AIThinkingCheckbox.onChange}/>
                    Задержка перед ходом противника
                </div>
                <div> Осталось клеток с кораблями: </div>
                <div> {playerField.shipsAlive} : {enemyField.shipsAlive} </div>
                <button onClick={() => {setHelpVisible(true)}}> Справка </button>
            </div>
            <div className="fields-list">
                <div>
                    {/* We check AIThinkingCheckbox to prevent enemy name flashing when AI makes a move without delay */}
                    <p className={(isPlayerTurn || !AIThinkingCheckbox.value) ? 'active-turn' : ''}> {props.playerName} </p>
                    <GameField field={playerField.gameInfo} cellsHidden={false}/>
                </div>
                <div>
                    <p className={(!isPlayerTurn && AIThinkingCheckbox.value) ? 'active-turn' : ''}> {props.enemyName} </p>
                    <GameField field={enemyField.gameInfo} onClick={onPlayerShoot} cellsHidden={true}/>
                </div>
            </div>
        </div>
    )
}

export default Game;
