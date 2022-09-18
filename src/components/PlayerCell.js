import '../styles/Cell.css'

/**
 * React-component corresponding to cell in player game field 
 * (all ships visible by default) 
 * @param {*} props - expects status propery with specified shot and ship booleans;
 */
function PlayerCell(props) {
    let status = 'empty';
    if (props.status.ship) {
        if (props.status.shot) {
            status = 'player-hit';
        } else {
            status = 'ship';
        }
    } else {
        if (props.status.shot) {
            status = 'miss';
        }
    }

    return (
        /*
            Click-area is a div around an actual cell, that have no indents between siblings.
            That improves user control experience (even if you click at gap between cells, event will be fired)
        */
        <div className='click-area'>
            <div className={`cell ${status}`}/>
        </div>
    )
}

export default PlayerCell;
