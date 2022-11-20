import Point2D from "../types/Point2D";
import Coords from "./Coords";

type ToolbarProps = {
    pos: Point2D
}

function Toolbar(props: ToolbarProps) {

    return (
        <div className="Toolbar">
            <Coords coords={props.pos}></Coords>
        </div>
    );
}

export default Toolbar;