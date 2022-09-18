import '../styles/GameEnd.css'

function GameEnd(props) {
    return (
        <div className="game-end">
            <h1> Наш победитель - {props.winner}! </h1>
            <div> Но, на этом игра не кончается </div>
            <button onClick={() => props.restart()}> Начать заново </button>
        </div>
    )
}

export default GameEnd;
