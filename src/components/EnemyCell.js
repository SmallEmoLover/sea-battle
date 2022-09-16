import '../styles/Cell.css'
/**
 * React-component corresponding to cell in player game field 
 * (all ships hidden until player hits they) 
 * @param {*} props - expects status propery with specified shot and ship booleans;
 * 
 * provide onClick callback to handle clicks (only to non-shooten cells) 
 */
function EnemyCell(props) {
    let status = 'empty';
    let onClick = props.onClick;
    if (props.status.shot) {
        // To prevent player from shooting already stricken cell 
        onClick = () => {}

        if (props.status.ship) {
            status = 'hit';
        } else {
            status = 'miss';
        }
    }

    return <div onClick={() => onClick()} className={`cell ${status}`}></div>
}

export default EnemyCell;
