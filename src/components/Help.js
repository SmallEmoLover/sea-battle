import PlayerCell from "./PlayerCell";
import '../styles/Help.css'

/**
 * React-component to show help to the player
 * @param {*} props - set visible to true to show help.
 * Specify function to close component in closeHelp() prop 
 */
function Help(props) {
    if (!props.visible) {
        return null;
    }

    return (
        <div className="help">
            <button onClick={() => props.closeHelp()}> Закрыть </button>
            <h1> Справка </h1>
            <div> 
                <b> Морской бой </b> - игра, в которой два игрока поочерёдно стараются потопить флот соперника,
                стреляя в одну из клеток вражеского поля. При попадании, <b> игрок ходит заново </b>, при
                промахе - ход переходит к другому игроку (имя игрока, делающего ход, подчёркнуто). 
                Первый игрок, уничтоживший все клетки с кораблями противника - побеждает.
            </div>
            <div> 
                Корабли как игрока, так и соперника расставляются случайным образом, учитывая следующее правило:
                два разных корабля <b> не могут соприкасаться своими соседними клетками, </b> включая диагональные.
                Все корабли прямые (клетки находятся на одной горизонтальной или вертикальной прямой).
                У каждого игрока один четырёхпалубный корабль (4 клетки длиной), два трёхпалубных, три двухпалубных и четыре однопалубных.
            </div>
            <div> 
                Обозначения клеток:
                <ul>
                    <li> <PlayerCell status={{ship: true, shot: false}}/> - клетка с кораблём игрока </li>
                    <li> 
                        <PlayerCell status={{ship: true, shot: true}}/> - клетка с частично потопленным кораблём 
                        (рядом есть ещё непотоплённые части) 
                    </li>
                    <li> <PlayerCell status={{ship: true, shot: true, sunken: true}}/> - клетка с полностью потопленным кораблём </li>
                    <li> <PlayerCell status={{ship: false, shot: true}}/> - промах </li>
                    <li> <PlayerCell status={{ship: false, shot: false}}/> - пустая клетка (нестрелянная) </li>
                </ul>
            </div>
            <div>
                <i> Сделано с любовью, специально для <a href="https://tensor.ru"> Тензор </a> </i>
            </div>
        </div>
    )
}

export default Help;
