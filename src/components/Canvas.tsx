import { CommonGestureState, FullGestureState, usePinch } from "@use-gesture/react";
import React, { ReactHTML, useEffect, useRef, useState } from "react";
import { FONT_SIZE } from "../constants";
import { drawGrid, clear, drawText, drawAdaptiveGrid } from "../draw/draw";
import Point2D from "../types/Point2D";
import Point3D from "../types/Point3D";
import Text from "../types/Text";

type CanvasProps = {
    texts: Text[],
    width: number,
    height: number
    pos: Point3D,
    setPos: Function,
    setInputPos: Function
};

const GRID_SIZE = 75;

const formatFloat = (f: number) => parseFloat(f.toFixed(2));

function Canvas(props: CanvasProps) {

    const canvasRef = useRef(null);

    const canvasOffsetLeft = useRef(0);
    const canvasOffsetTop = useRef(0);

    const lastScrollPosition = useRef(0);
    const scrolling = useRef(false);

    const ctx = useRef<null | CanvasRenderingContext2D>(null);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [dragging, setDragging] = useState(false);

    const [initialMousedownLocation, setInitialMousedownLocation] = useState({ x: 0, y: 0 });
    const [initialMousedownPos, setInitialMousedownPos] = useState({ x: 0, y: 0 });

    const offsetPosX = () => props.pos.x - props.width / 2;
    const offsetPosY = () => props.pos.y - props.height / 2;

    const render = function () {
        if (ctx.current) {
            ctx.current.translate(-0.5, -0.5);
            clear(ctx.current!, props.width, props.height);
            props.texts.forEach((text) => {
                drawText(ctx.current!, text.content,
                    // (text.x - props.pos.x) / props.pos.z,
                    // (text.y - props.pos.y) / props.pos.z,
                    (text.x - props.pos.x) / props.pos.z,
                    (text.y - props.pos.y) / props.pos.z,
                    FONT_SIZE / props.pos.z
                );
            });
            drawAdaptiveGrid(ctx.current!, props.width, props.height, props.pos.x / props.pos.z, props.pos.y / props.pos.z, props.pos.z, GRID_SIZE);
            ctx.current.translate(0.5, 0.5);
        }
    };

    const doZoom = function (zoom: number, mouseX: number, mouseY: number) {
        let { x, y, z } = props.pos;

        let cx = mouseX * z + x;
        let cy = mouseY * z + y;

        let newZ = z + zoom * z;
        newZ = Math.max(0.25, Math.min(newZ, 10));

        let tx = -newZ / z * (cx - x) + cx;
        let ty = -newZ / z * (cy - y) + cy;

        return { x: tx, y: ty, z: newZ };
    };

    const onPinch = function (state: any) {
        let mouseX = state.origin[0];
        let mouseY = state.origin[1];

        let [mx, my] = state.movement;

        // console.log(state.origin);
        // (canvasRef.current! as HTMLCanvasElement).style.backgroundColor = "red";
        let { x, y, z } = doZoom(
            // mx**mx + my**my,
            mx / 20,
            mouseX,
            mouseY
        );

        props.setPos({
            x: formatFloat(x),
            y: formatFloat(y),
            z: formatFloat(z)
        });
    };

    // Init
    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;

        canvas.style.width = `${props.width}px`;
        canvas.style.height = `${props.height}px`;

        const scale = window.devicePixelRatio;

        // canvas.width = props.width;
        // canvas.height = props.height;
        canvas.width = Math.floor(props.width * scale);
        canvas.height = Math.floor(props.height * scale);

        let bb = canvas.getBoundingClientRect();

        // canvasOffsetLeft.current = canvas.offsetLeft;
        // canvasOffsetTop.current = canvas.offsetTop;

        canvasOffsetLeft.current = bb.left;
        canvasOffsetTop.current = bb.top;

        const thisCtx: CanvasRenderingContext2D = canvas.getContext('2d')!;
        ctx.current = thisCtx;

        thisCtx.imageSmoothingEnabled = false;

        // ctx.current.scale(scale, scale);

        // props.setPos({
        //     x: props.pos.x - props.width/2,
        //     y: props.pos.y - props.height/2,
        //     z: props.pos.z
        // });

        // drawAdaptiveGrid(ctx.current, props.width, props.height, x, y, props.pos.z, GRID_SIZE);
    }, []);

    // usePinch(onPinch, {
    //     target: canvasRef.current!,
    //     preventDefault: true,
    //     eventOptions: {
    //         passive: false
    //     }
    // });

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;

        canvas.style.width = `${props.width}px`;
        canvas.style.height = `${props.height}px`;

        const scale = window.devicePixelRatio;

        // canvas.width = props.width;
        // canvas.height = props.height;
        canvas.width = Math.floor(props.width * scale);
        canvas.height = Math.floor(props.height * scale);

        ctx.current!.scale(scale, scale);

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
            e.preventDefault();
            let touchEvent = e as React.TouchEvent;
            if (touchEvent.touches.length >= 2) return;
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
            e.preventDefault();
            let touchEvent = e as React.TouchEvent;
            if (touchEvent.touches.length >= 2) return;
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
            props.setPos({  // Set world coords
                // x: formatFloat(ix - dx * props.pos.z),
                // y: formatFloat(iy - dy * props.pos.z),
                x: formatFloat(ix - dx * props.pos.z),
                y: formatFloat(iy - dy * props.pos.z),
                z: formatFloat(props.pos.z)
            });
            let canvas: HTMLCanvasElement = canvasRef.current!;
            canvas.style.cursor = 'grab';
        } else if (dx * dx + dy * dy > 81 && isMouseDown) {
            setDragging(true);
        }
    };

    const onMouseUp = function (e: React.MouseEvent | React.TouchEvent) {
        let x = 0, y = 0;
        if (window.TouchEvent && e.nativeEvent instanceof TouchEvent) {
            e.preventDefault();
            let touchEvent = e as React.TouchEvent;
            if (touchEvent.touches.length >= 2) {
                let canvas: HTMLCanvasElement = canvasRef.current!;
                canvas.style.cursor = 'inherit';
                setIsMouseDown(false);
                setDragging(false);
                return;
            };
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


    const onWheel = function (e: React.WheelEvent) {
        let scaled = e.deltaY / 1000;

        let mouseX = e.pageX;
        let mouseY = e.pageY;

        let { x: tx, y: ty, z: newZ } = doZoom(scaled, mouseX, mouseY);


        // props.setPos({x: props.pos.x, y: props.pos.y, z: props.pos.z + scaled});
        props.setPos({
            // x: ((props.pos.x + mouseX)*newZ)-mouseX,
            // y: ((props.pos.y + mouseY)*newZ)-mouseY,
            // z: newZ
            x: formatFloat(tx),
            y: formatFloat(ty),
            z: formatFloat(newZ)
        });
    };


    return (
        <canvas ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}

            onTouchStart={onMouseDown}
            onTouchMove={onMouseMove}
            onTouchEnd={onMouseUp}

            onWheel={onWheel}

        ></canvas>
    );
}

export default Canvas;