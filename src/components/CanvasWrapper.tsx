import { useEffect, useRef, useState } from "react";
import Point2D from "../types/Point2D";
import Point3D from "../types/Point3D";
import Text from "../types/Text";
import Canvas from "./Canvas";
import FloatingInput from "./FloatingInput";
import Spinner from "./Spinner";

type CanvasWrapperProps = {
    textsLoaded: boolean,
    texts: Text[],
    inputPos: Point2D,
    pos: Point3D,
    setPos: Function,
    setInputPos: Function,
};

function CanvasWrapper(props: CanvasWrapperProps) {

    const wrapperRef = useRef(null);

    const [width, setWidth] = useState(1600);
    const [height, setHeight] = useState(900);

    useEffect(() => {
        const resizeHandler = function () {
            let wrapper: HTMLElement = wrapperRef.current!;

            let bb = wrapper.getBoundingClientRect();

            setWidth(bb.width);
            setHeight(bb.height);
        };

        resizeHandler();

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('rezize', resizeHandler);
        }
    }, []);

    return (
        <div ref={wrapperRef} className={`${props.textsLoaded ? 'loaded' : ''} MainCanvasWrapper`}>
            <FloatingInput
                pos={props.pos}
                inputPos={props.inputPos}></FloatingInput>
            <Canvas
                pos={props.pos}
                setPos={props.setPos}
                setInputPos={props.setInputPos}
                width={width}
                height={height}
                texts={props.texts}
            ></Canvas>
        </div>
    )
}

export default CanvasWrapper;