import useGameField from "../hooks/useGameField";
import GameField from "./GameField";
import '../styles/Game.css'

/**
 * React-component representing main game window
 * @param {*} props - expects playerName and enemyName strings
 */
function Game(props) {
    const [playerField, shootPlayer] = useGameField();
    const [enemyField, shootEnemy] = useGameField();

    return (
        <div>
            {props.playerName} vs. {props.enemyName}
            <div className="fields-list">
                <GameField field={playerField} cellsHidden={false}/>
                <GameField field={enemyField} onClick={(x, y) => {shootEnemy(x, y)}} cellsHidden={true}/>
            </div>
        </div>
    )
}

export default Game;
