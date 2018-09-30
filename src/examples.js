import * as math from "mathjs";

// Example 4.3.3, p.134
export function createData(type) {
    if(type == "4.3.3") {
        const A = math.transpose([
            [1, 0, 1.65],
            [0, 1, 1]
        ]);

        const tmpX = [];
        for (let i = -5; i < 5; i += 0.2) {
            for (let j = -5; j < 5; j += 0.2) {
                tmpX.push([i, j]);
            }
        }

        const X = math.transpose(tmpX);
        return math.transpose(math.multiply(A, X));
    } else if(type == "4.3.10") {
        const A = math.transpose([
            [-1, -2, 2]
        ]);

        const tmpX = [];
        for (let i = -5; i < 5; i += 0.2) {
            tmpX.push([i]);
        }

        const X = math.transpose(tmpX);
        return math.transpose(math.multiply(A, X));
    } else if(type == "4.3.11") {
        const A = math.transpose([
            [4, -1, 1],
            [0, 1, 1]
        ]);

        const tmpX = [];
        for (let i = -5; i < 5; i += 0.2) {
            for (let j = -5; j < 5; j += 0.2) {
                tmpX.push([i, j]);
            }
        }

        const X = math.transpose(tmpX);
        return math.transpose(math.multiply(A, X));
    }

    return null;
}