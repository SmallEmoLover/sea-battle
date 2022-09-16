import '../styles/Cell.css'

/**
 * React-component corresponding to cell in player game field 
 * (all ships visible by default) 
 * @param {*} props - expects status propery with specified shot and ship booleans;
 * 
 * provide onClick callback to handle clicks
 */
function PlayerCell(props) {
    let status = 'empty';
    if (props.status.ship) {
        if (props.status.shot) {
            status = 'hit';
        } else {
            status = 'ship';
        }
    } else {
        if (props.status.shot) {
            status = 'miss';
        }
    }

    return <div className={`cell ${status}`}></div>
}

export default PlayerCell;
