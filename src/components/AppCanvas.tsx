import { useEffect, useRef, useState } from "react";
import { drawGrid } from "../draw/draw";

type AppCanvasProps = {
    width: number,
    height: number
};

function AppCanvas(props: AppCanvasProps) {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;

        canvas.width = props.width;
        canvas.height = props.height;

        const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

        drawGrid(ctx, props.width, props.height, 50);
    }, []);

    const state = useState({
        x: 0,
        y: 0
    });

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default AppCanvas;