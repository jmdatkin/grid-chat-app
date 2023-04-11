const useDraw = function (draw: Function, fps = 1 / 60) {
    let iid: number | null = null;
    let lastTime = 0;

    const start = function () {
        lastTime = Date.now();
        if (iid === null)
            iid = window.requestAnimationFrame(loop);
    };

    const loop = function () {
        let thisTime = Date.now();
        if (thisTime - lastTime > fps) {
            draw();
            lastTime = thisTime;
        }
        iid = window.requestAnimationFrame(loop);
    };

    const stop = function () {
        window.cancelAnimationFrame(iid as number);
        iid = null;
    };

    return { start, stop };
};

export default useDraw;