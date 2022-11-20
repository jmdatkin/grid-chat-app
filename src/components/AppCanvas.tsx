import React, { ReactHTML, useEffect, useRef, useState } from "react";
import { drawGrid, clear, drawText } from "../draw/draw";
import Point2D from "../types/Point2D";
import Text from "../types/Text";

type AppCanvasProps = {
    texts: Text[],
    width: number,
    height: number
    pos: Point2D,
    setPos: Function,
    setInputPos: Function
};

const GRID_SIZE = 75;

function AppCanvas(props: AppCanvasProps) {

    const canvasRef = useRef(null);

    const canvasOffsetLeft = useRef(0);
    const canvasOffsetTop = useRef(0);

    // const [ctx, setCtx] = useState<null | CanvasRenderingContext2D>(null);
    const ctx = useRef<null | CanvasRenderingContext2D>(null);

    // const [pos, setPos] = useState({ x: 0, y: 0 });

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [dragging, setDragging] = useState(false);

    const [initialMousedownLocation, setInitialMousedownLocation] = useState({ x: 0, y: 0 });
    const [initialMousedownPos, setInitialMousedownPos] = useState({ x: 0, y: 0 });

    const render = function () {
        if (ctx.current) {
            clear(ctx.current!, props.width, props.height);
            props.texts.forEach((text) => {
                drawText(ctx.current!, text.content, text.x - props.pos.x, text.y - props.pos.y);
            });
            drawGrid(ctx.current!, props.width, props.height, props.pos.x, props.pos.y, GRID_SIZE);
        }
    };

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;

        canvas.width = props.width;
        canvas.height = props.height;

        let bb = canvas.getBoundingClientRect();

        // canvasOffsetLeft.current = canvas.offsetLeft;
        // canvasOffsetTop.current = canvas.offsetTop;

        canvasOffsetLeft.current = bb.left;
        canvasOffsetTop.current = bb.top;

        const thisCtx: CanvasRenderingContext2D = canvas.getContext('2d')!;
        ctx.current = thisCtx;

        // setCtx(ctx);


        drawGrid(ctx.current, props.width, props.height, props.pos.x, props.pos.y, GRID_SIZE);
    }, []);

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;

        canvas.width = props.width;
        canvas.height = props.height;

        let bb = canvas.getBoundingClientRect();

        // canvasOffsetLeft.current = canvas.offsetLeft;
        // canvasOffsetTop.current = canvas.offsetTop;

        canvasOffsetLeft.current = bb.left;
        canvasOffsetTop.current = bb.top;

        render();
    }, [props.width, props.height]);

    useEffect(() => {
        // if (ctx) {
        //     clear(ctx.current!, props.width, props.height);
        //     props.texts.forEach((text) => {
        //         drawText(ctx.current!, text.content, text.x - props.pos.x, text.y - props.pos.y);
        //     });
        //     drawGrid(ctx.current!, props.width, props.height, props.pos.x, props.pos.y, GRID_SIZE);
        // }
        render();
    }, [props.pos, props.texts])

    const onMouseDown = function (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
        let x = 0, y = 0;
        if (window.TouchEvent && e.nativeEvent instanceof TouchEvent) {
            let touchEvent = e as React.TouchEvent;
            x = touchEvent.touches[0].pageX;
            y = touchEvent.touches[0].pageY;
        } else if (e.nativeEvent instanceof MouseEvent) {
            let mouseEvent = e as React.MouseEvent;
            x = mouseEvent.pageX;
            y = mouseEvent.pageY;
        }
        setIsMouseDown(true);
        setInitialMousedownLocation({ x, y });
        setInitialMousedownPos(props.pos);
    };

    const onMouseMove = function (e: React.MouseEvent | React.TouchEvent) {
        let ix = initialMousedownPos.x;
        let iy = initialMousedownPos.y;

        let px = initialMousedownLocation.x;
        let py = initialMousedownLocation.y;

        let qx = 0, qy = 0;
        if (window.TouchEvent && e.nativeEvent instanceof TouchEvent) {
            let touchEvent = e as React.TouchEvent;
            qx = touchEvent.touches[0].pageX;
            qy = touchEvent.touches[0].pageY;
        } else if (e.nativeEvent instanceof MouseEvent) {
            e.preventDefault();
            let mouseEvent = e as React.MouseEvent;
            qx = mouseEvent.pageX;
            qy = mouseEvent.pageY;
        }

        let dx = qx - px;
        let dy = qy - py;

        if (dragging) {
            props.setPos({ x: ix - dx, y: iy - dy });
            let canvas: HTMLCanvasElement = canvasRef.current!;
            canvas.style.cursor = 'grab';
            // console.log("HOO");
        } else if (dx * dx + dy * dy > 81 && isMouseDown) {
            setDragging(true);
        }
    };

    const onMouseUp = function (e: React.MouseEvent | React.TouchEvent) {
        let x = 0, y = 0;
        if (window.TouchEvent && e.nativeEvent instanceof TouchEvent) {
            let touchEvent = e as React.TouchEvent;
            x = touchEvent.touches[0].pageX;
            y = touchEvent.touches[0].pageY;
        } else if (e.nativeEvent instanceof MouseEvent) {
            let mouseEvent = e as React.MouseEvent;
            x = mouseEvent.pageX;
            y = mouseEvent.pageY;
        }
        if (!dragging) {
            props.setInputPos({ x: x - canvasOffsetLeft.current, y: y - canvasOffsetTop.current });
        }

        let canvas: HTMLCanvasElement = canvasRef.current!;
        canvas.style.cursor = 'inherit';
        setIsMouseDown(false);
        setDragging(false);
    };


    return (
        <canvas ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}

            onTouchStart={onMouseDown}
            onTouchMove={onMouseMove}
            onTouchEnd={onMouseUp}

        ></canvas>
    );
}

export default AppCanvas;