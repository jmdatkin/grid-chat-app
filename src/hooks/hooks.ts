import { MutableRefObject, useEffect, useRef } from "react";

// const useMouseDrag = function (target: HTMLElement) {
const useMouseDrag = function (target: MutableRefObject<null>) {

    let targetElement: any = target.current;
    let px, py = 0;
    let qx, qy = 0;
    let dragging = false;

    useEffect(() => {
        const mousedownCallback = (e: MouseEvent) => {
            px = e.pageX;
            py = e.pageY;
            dragging = true;
            if (targetElement)
                targetElement.addEventListener('mousemove', mousemoveCallback);
        };

        const mousemoveCallback = (e: MouseEvent) => {
            qx = e.pageX;
            qy = e.pageY;
        }

        const mouseupCallback = (e: MouseEvent) => {
            dragging = false;
            if (targetElement)
                targetElement.removeEventListener('mousemove', mousemoveCallback);
        };

        if (targetElement) {
            targetElement.addEventListener('mousedown', mousedownCallback);
            targetElement.addEventListener('mouseup', mouseupCallback);
        }

        return () => {
            if (targetElement) {
                targetElement.removeEventListener('mousedown', mousedownCallback);
                targetElement.removeEventListener('mouseup', mouseupCallback);
            }
        };
    }, [target.current]);

    return {
        start: { x: px, y: py },
        end: { x: qx, y: qy },
        dragging
    };
};

const usePrevious = (value: any) => {
  const prev = useRef(null)
  useEffect(() => {
    prev.current = value
  });
  return prev.current
}

export { useMouseDrag, usePrevious };