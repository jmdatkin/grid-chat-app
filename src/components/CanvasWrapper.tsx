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

    const width = useRef(1600);
    const height = useRef(900);

    useEffect(() => {
        const resizeHandler = function () {
            let wrapper: HTMLElement = wrapperRef.current!;

            let bb = wrapper.getBoundingClientRect();

            width.current = bb.width;
            height.current = bb.height;
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
                width={width.current}
                height={height.current}
                texts={props.texts}
            ></Canvas>
        </div>
    )
}

export default CanvasWrapper;