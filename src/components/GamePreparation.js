import useInput from "../hooks/useInput";

/**
 * React component form to input players names before game starts 
 * @param {*} props - expects onPreparationsDone(playerName, enemyName) callback
 * which will be called after user enter and confirm players names
 */
function GamePreparation(props) {
    const playerNameInput = useInput('');
    const enemyNameInput = useInput('');

    return(
        <div>
            <input value={playerNameInput.value} onChange={playerNameInput.onChange}/>
            <input value={enemyNameInput.value} onChange={enemyNameInput.onChange}/>
            <button onClick={() => props.onPreparationsDone(playerNameInput.value, enemyNameInput.value)}> 
                Играть 
            </button>
        </div>
    )
}

export default GamePreparation;
