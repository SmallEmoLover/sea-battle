import EnemyCell from "./EnemyCell";
import PlayerCell from "./PlayerCell";

/**
 * React-component respresenting sea-battle game field
 * @param {*} props - if cellsHidden set to true ships will not be shown until player hits they.
 * 
 * onClick(x, y) - callback to cell clicks. Expects x, y arguments - coordinates of the cell
 * @returns 
 */
function GameField(props) {
    return(
        <div className="game-field">
            {props.field.map((row, x) => {
                return (
                    /* Using indexes as keys is not reccomended by react documentation, 
                       but in our case we can ensure list items will not be rearranged */
                    <div key={x} className='row'>
                        {row.map((cell, y) => {
                            if (props.cellsHidden) {
                                return <EnemyCell key={y} onClick={() => props.onClick(x, y)} status={cell}/>
                            } else {
                                return <PlayerCell key={y} status={cell}/>
                            }
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default GameField;
