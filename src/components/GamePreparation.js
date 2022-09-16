import { useState } from "react";
import useInput from "../hooks/useInput";
import '../styles/GamePreparation.css'

/**
 * React component form to input players names before game starts 
 * @param {*} props - expects onPreparationsDone(playerName, enemyName) callback
 * which will be called after user enter and confirm players names
 */
function GamePreparation(props) {
    const playerNameInput = useInput('');
    const enemyNameInput = useInput('');
    const [isStartPressed, setStartPressed] = useState(false);

    const defaultPlayerName = 'Люк';
    const defaultEnemyName = 'C-ЗPO';

    const onStartPressed = () => {
        setStartPressed(true);
        setTimeout(
            () => props.onPreparationsDone(
                playerNameInput.value || defaultPlayerName, 
                enemyNameInput.value || defaultEnemyName
            ),
            5000
        );
    }

    if (isStartPressed) {
        return (
            <div className='game-preparation'>
                <div className="preparation-block upper-right"/>
                <div className="middle-block">
                    <div className='versus-label'>
                        <div className="player-name"> {playerNameInput.value || defaultPlayerName} </div>
                        VS
                        <div className="player-name"> {enemyNameInput.value || defaultEnemyName} </div> 
                    </div>
                </div>
                <div className="preparation-block down-left"/>
            </div>
        );
    } else {
        return (
            <div className='game-preparation'>
                <div className="preparation-block upper-right">
                    <input value={playerNameInput.value} placeholder='Имя хорошего человека' onChange={playerNameInput.onChange}/>
                    <div> Игрок </div>
                </div>
                <div className="middle-block">
                    <button className="start-button" onClick={onStartPressed}> 
                        START 
                    </button>
                </div>
                <div className="preparation-block down-left">
                    <div> Противник </div>
                    <input value={enemyNameInput.value} placeholder='Модель глупой железки' onChange={enemyNameInput.onChange}/>
                </div>
            </div>
        )
    }
}

export default GamePreparation;
