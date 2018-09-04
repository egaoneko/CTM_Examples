import {lin_comb} from '../src/linear1'
import * as math from "mathjs";

describe("Simple expression tests", () => {
    const A = [
        [ 1, 2, 3 ],
        [ 1, 2, 3 ],
        [ 1, 2, 3 ],
        [ 1, 2, 3 ]
    ];

    const B = [
        1, 1, 1, 1
    ];

    const AA = math.transpose(A);
    const BB = math.transpose(B);

    test("test1", () => {
        expect(lin_comb(A, B).toArray()).toEqual([ 4, 8, 12 ]);
    });

    test("test2", () => {
        expect(math.multiply(AA, BB)).toEqual([ 4, 8, 12 ]);
    });
});