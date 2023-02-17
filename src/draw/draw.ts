import { FONT_FAMILY, FONT_SIZE } from "../constants";
// import { filter } from "../services/profanity-filter";
import Text from "../types/Text";

const drawGrid = function (
    ctx: CanvasRenderingContext2D,
    width: number, height: number,
    x: number,
    y: number,
    color: string,
    size: number
) {
    // ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.strokeStyle = color;
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

    // ctx.beginPath();

    // // Draw major lines
    // for (let i = minorStartY; i < height; i += size * 5) {
    //     ctx.moveTo(0, i);
    //     ctx.lineTo(width, i);
    // }

    // for (let j = minorStartX; j < width; j += size * 5) {
    //     ctx.moveTo(j, 0);
    //     ctx.lineTo(j, height);
    // }

    // ctx.stroke();
};

const scaleAlpha = (z: number, c: number) => 0.15 * ((c - z) / c);

const drawAdaptiveGrid = function (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    x: number,
    y: number,
    z: number,
    size: number) {
    let tz = z;
    while (tz > 5) tz /= 5;

    let s = size / tz;

    let minorSize = size/tz;
    let majorSize = minorSize*5;
    let majorMajorSize = majorSize*25; 

    if (majorSize <= size) {
        minorSize *= 5;
        majorSize *= 5;
        majorMajorSize *= 5;
    }

    const minorColor = `rgba(0,0,0,${scaleAlpha(tz, 5)})`;
    const majorColor = `rgba(0,0,0,${scaleAlpha(tz, 5*2)})`;
    const majorMajorColor = `rgba(0,0,0,${scaleAlpha(tz, 5*3)})`;

    drawGrid(ctx, width, height, x, y, minorColor, minorSize);
    drawGrid(ctx, width, height, x, y, majorColor, majorSize);
    drawGrid(ctx, width, height, x, y, majorMajorColor, majorMajorSize);
};

const drawText = function (ctx: CanvasRenderingContext2D, content: string, x: number, y: number, size: number) {
    ctx.font = `${FONT_SIZE} ${FONT_FAMILY}`;

    if (content === '') return;

    let censor = true;

    // try {
    // content = censor ? filter.cleanHacked(content) : content;
    // } catch(e) {
    //     console.log(content);
    //     return;
    // }

    ctx.font = `${size}px ${FONT_FAMILY}`;
    ctx.fillStyle = "#000";
    ctx.textBaseline = "top";
    const metrics = ctx.measureText(content);
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    
    ctx.fillText(
        content,
        x,
        y// + textHeight + 5
        //14: 5
        //12: 4
        //24: 6
    );
};

const clear = function (ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.clearRect(0, 0, width, height);
};

export { drawAdaptiveGrid, drawGrid, drawText, clear };