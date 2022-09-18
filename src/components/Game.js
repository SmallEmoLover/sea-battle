import useGameField from "../hooks/useGameField";
import GameField from "./GameField";
import '../styles/Game.css'
import { getShootCoordinates } from "../models/EnemyAi";

/**
 * React-component representing main game window
 * @param {*} props - expects playerName and enemyName strings
 */
function Game(props) {
    const playerField = useGameField();
    const enemyField = useGameField();

    if (playerField.shipsAlive === 0) {
        return <div> Вы проиграли </div>
    }

    if (enemyField.shipsAlive === 0) {
        return <div> Вы выиграли </div>
    }

    const onPlayerShoot = (x, y) => {
        enemyField.shoot(x, y);
        let enemyShot = getShootCoordinates(playerField.gameInfo);
        playerField.shoot(enemyShot.x, enemyShot.y);
    }

    return (
        <div className="game">
            <div className="information-panel">
                <div> <b> {props.playerName} vs. {props.enemyName} </b> </div>
                <div> Осталось клеток с кораблями: </div>
                <div> {playerField.shipsAlive} : {enemyField.shipsAlive} </div>
            </div>
            <div className="fields-list">
                <GameField field={playerField.gameInfo} cellsHidden={false}/>
                <GameField field={enemyField.gameInfo} onClick={onPlayerShoot} cellsHidden={true}/>
            </div>
        </div>
    )
}

export default Game;
