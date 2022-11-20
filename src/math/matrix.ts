import Point2D from "../types/Point2D"

type AffineMatrix = number[];

const makeAffineTransform = function(tx: number = 0, ty: number = 0, sx: number = 1, sy: number = 1) {
    return [
        sx, 0,  tx,
        0,  1,  ty,
        0,  0,  1
    ];
};

const applyAffineTransform = function(point: Point2D, matrix: AffineMatrix) {
    let point3 = [point.x, point.y, 1];

    return [
        point3[0]*matrix[0] + matrix[2],
        point3[1]*matrix[3] + matrix[5],
    ];
};

export { makeAffineTransform, applyAffineTransform };