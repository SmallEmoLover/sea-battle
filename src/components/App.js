import { useState } from 'react';
import '../styles/App.css';
import GamePreparation from './GamePreparation';

function App() {
    const [playerName, setPlayerName] = useState('');
    const [enemyName, setEnemyName] = useState('');

    return (
        <div className="App">
            Морской бой
            <GamePreparation onPreparationsDone={(playerName, enemyName) => {
                setPlayerName(playerName);
                setEnemyName(enemyName);
            }}/>
            {playerName} vs {enemyName}
        </div>
  );
}
export default App;
