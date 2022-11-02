const drawGrid = function (ctx: CanvasRenderingContext2D, width: number, height: number, size: number) {
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, 0);
    ctx.beginPath();

    for (let i = 0; i < height; i += size) {
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
    }

    for (let j = 0; j < width; j += size) {
        ctx.moveTo(j, 0);
        ctx.lineTo(j, height);
    }

    ctx.stroke();
};

export { drawGrid };