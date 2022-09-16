import useGameField from "../hooks/useGameField";
import PlayerCell from "./PlayerCell";

/**
 * React-component representing main game window
 * @param {*} props - expects playerName and enemyName strings
 */
function Game(props) {
    const [playerField, shoot] = useGameField();

    return (
        <div>
            {props.playerName} vs. {props.enemyName}
            {playerField.map((row) => {
                console.log(row);
                return (
                    <div className='row'>
                        {row.map((cell) => {
                            return <PlayerCell status={cell}/>
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Game;
