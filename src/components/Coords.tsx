import Point2D from "../types/Point2D";

type CoordsProps = {
    coords: Point2D
};

function Coords(props: CoordsProps) {
    return (
        <div className="Coords">
            <span>x: {props.coords.x}</span>
            <span>y: {props.coords.y}</span>
        </div>
    );   
}

export default Coords;