import Point2D from "../types/Point2D";
import Point3D from "../types/Point3D";
import Coords from "./Coords";

type ToolbarProps = {
    pos: Point3D,
    setPos: Function
};

function Toolbar(props: ToolbarProps) {

    return (
        <div className="Toolbar">
            <Coords coords={props.pos} setPos={props.setPos}></Coords>
        </div>
    );
}

export default Toolbar;