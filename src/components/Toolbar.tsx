import Point2D from "../types/Point2D";
import Point3D from "../types/Point3D";
import Coords from "./Coords";
import UserIndicator from "./UserIndicator";

type ToolbarProps = {
    pos: Point3D,
    setPos: Function,
    setSidebarHidden: Function
};

function Toolbar(props: ToolbarProps) {

    return (
        <div className="Toolbar">
            <Coords coords={props.pos} setPos={props.setPos}></Coords>
            <UserIndicator setSidebarHidden={props.setSidebarHidden}></UserIndicator>
        </div>
    );
}

export default Toolbar;