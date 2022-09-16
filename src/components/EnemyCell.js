import '../styles/Cell.css'
/**
 * React-component corresponding to cell in player game field 
 * (all ships hidden until player hits they) 
 * @param {*} props - expects status propery with specified shot and ship booleans;
 * 
 * provide onClick callback to handle clicks
 */
function EnemyCell(props) {
    let status = 'empty';
    if (props.status.shot) {
        if (props.status.ship) {
            status = 'hit';
        } else {
            status = 'miss';
        }
    }

    return <div onClick={() => props.onClick()} className={`cell ${status}`}></div>
}

export default EnemyCell;
