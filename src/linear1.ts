import * as math from 'mathjs';
import {MathType} from "mathjs";

export function lin_comb(vlist: number[][], clist: number[]): any {
    let sum: MathType = math.zeros(vlist[0].length)

    for(let i = 0; i < vlist.length; i++) {
        let v = math.dotMultiply(vlist[i], clist[i]);
        sum = math.add(sum, v)
    }

    return sum;
}