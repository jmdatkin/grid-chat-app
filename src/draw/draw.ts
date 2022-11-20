import { FONT_FAMILY, FONT_SIZE } from "../constants";
import Text from "../types/Text";

const drawGrid = function (ctx: CanvasRenderingContext2D, width: number, height: number, x: number, y: number, size: number) {
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 0.5;

    let startX = - (x % size);
    let startY = - (y % size);

    let minorStartX = - ((x / 5) % size) * 5;
    let minorStartY = - ((y / 5) % size) * 5;

    ctx.moveTo(x, y);
    ctx.beginPath();

    // Draw minor lines
    for (let i = startY; i < height; i += size) {
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
    }

    for (let j = startX; j < width; j += size) {
        ctx.moveTo(j, 0);
        ctx.lineTo(j, height);
    }
    
    ctx.stroke();

    ctx.beginPath();

    // Draw major lines
    for (let i = minorStartY; i < height; i += size*5) {
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
    }

    for (let j = minorStartX; j < width; j += size*5) {
        ctx.moveTo(j, 0);
        ctx.lineTo(j, height);
    }

    ctx.stroke();
};

const drawText = function(ctx: CanvasRenderingContext2D, content: string, x: number, y: number) {
    ctx.font = `${FONT_SIZE} ${FONT_FAMILY}`;
    ctx.fillStyle = "#000";
    const metrics = ctx.measureText(content);
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    ctx.fillText(
        content,
        x,
        y + textHeight + 5
        //14: 5
        //12: 4
        //24: 6
    );
};

const clear = function (ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.clearRect(0, 0, width, height);
};

export { drawGrid, drawText, clear };