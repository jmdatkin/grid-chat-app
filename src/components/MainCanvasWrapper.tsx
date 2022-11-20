import { useEffect, useRef } from "react";
import Point2D from "../types/Point2D";
import Point3D from "../types/Point3D";
import Text from "../types/Text";
import AppCanvas from "./AppCanvas";
import FloatingInput from "./FloatingInput";

type MainCanvasWrapperProps = {
    texts: Text[],
    inputPos: Point2D,
    pos: Point3D,
    setPos: Function,
    setInputPos: Function,
};

function MainCanvasWrapper(props: MainCanvasWrapperProps) {

    const wrapperRef = useRef(null);

    const width = useRef(1600);
    const height = useRef(900);

    useEffect(() => {
        const resizeHandler = function() {
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
        <div ref={wrapperRef} className="MainCanvasWrapper">
            <FloatingInput
                pos={props.pos}
                inputPos={props.inputPos}></FloatingInput>
            <AppCanvas
            pos={props.pos}
            setPos={props.setPos}
            setInputPos={props.setInputPos}
            width={width.current}
            height={height.current}
            texts={props.texts}
            ></AppCanvas>
        </div>
    )
}

export default MainCanvasWrapper;