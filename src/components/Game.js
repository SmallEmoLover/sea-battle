import useGameField from "../hooks/useGameField";
import GameField from "./GameField";
import '../styles/Game.css'
import { getShootCoordinates } from "../models/EnemyAi";

/**
 * React-component representing main game window
 * @param {*} props - expects playerName and enemyName strings
 */
function Game(props) {
    const [playerField, shootPlayer] = useGameField();
    const [enemyField, shootEnemy] = useGameField();

    const onPlayerShoot = (x, y) => {
        shootEnemy(x, y);
        let enemyShot = getShootCoordinates(playerField);
        shootPlayer(enemyShot.x, enemyShot.y);
    }

    return (
        <div>
            {props.playerName} vs. {props.enemyName}
            <div className="fields-list">
                <GameField field={playerField} cellsHidden={false}/>
                <GameField field={enemyField} onClick={onPlayerShoot} cellsHidden={true}/>
            </div>
        </div>
    )
}

export default Game;
