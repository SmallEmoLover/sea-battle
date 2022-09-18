import { useState } from 'react';
import '../styles/App.css';
import Game from './Game';
import GamePreparation from './GamePreparation';

function App() {
    const [playerName, setPlayerName] = useState('');
    const [enemyName, setEnemyName] = useState('');

    const [isGameRunning, setGameRunning] = useState(false);

    if (isGameRunning) {
        return (
            <div className="App">
                <Game playerName={playerName} enemyName={enemyName}/>
            </div>
        )
    } else {
        return (
            <GamePreparation onPreparationsDone={(playerName, enemyName) => {
                setPlayerName(playerName);
                setEnemyName(enemyName);
                setGameRunning(true);
            }}/>
        );
    }
}

export default App;
