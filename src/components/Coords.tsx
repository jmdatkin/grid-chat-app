import Point2D from "../types/Point2D";
import Point3D from "../types/Point3D";
import EditableSpan from "./EditableSpan";

type CoordsProps = {
    coords: Point3D,
    setPos: Function
};

function Coords(props: CoordsProps) {

    const updateX = function(x: number) {
        props.setPos({x, y: props.coords.y, z: props.coords.z});
    };

    const updateY = function(y: number) {
        props.setPos({x: props.coords.x, y, z: props.coords.z});
    };

    const updateZ = function(z: number) {
        props.setPos({x: props.coords.x, y: props.coords.y, z});
    };

    return (
        <div className="Coords">
            {/* <span>
                x: <EditableSpan setParentValue={updateX} value={props.coords.x+''} />
            </span>
            <span>
                y: <EditableSpan setParentValue={updateY} value={props.coords.y+''} />
            </span>
            <span>
                z: <EditableSpan setParentValue={updateZ} value={props.coords.z+''} />
            </span> */}
            <span>x: {props.coords.x}</span>
            <span>y: {props.coords.y}</span>
            <span>z: {props.coords.z}</span>
        </div>
    );   
}

export default Coords;