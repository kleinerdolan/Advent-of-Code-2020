import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input1', 'utf-8');

let list:number[] =[];

for (const line of file.split(/[\r\n]+/)){
    var curVal = parseInt(line);
    list = list.concat(curVal);
}


function findMatchBruteForce(list) {
    for (let i = 0; i < list.length - 1; i++) {
        for(let j = 0; j < list.length - 1; j++) {
            if(i == j) {
                continue;
            }
            let cur1 = list[i];
            let cur2 = list[j];
            let sum = cur1+cur2;
            // console.log('[' + i + ']' + '[' + j + '] : ' + cur1 + ' + ' + cur2 + ' = ' + sum);
            if(sum === 2020) {
                console.log(cur1 + ' + ' + cur2 + ' = 2020 SUM = ' + cur1 * cur2);
            }
        }
    }
}
function findTripleBruteForce(list) {
    for (let i = 0; i < list.length - 1; i++) {
        for(let j = 0; j < list.length - 1; j++) {
            for(let k = 0; k < list.length - 1; k++) {
                if (i == j || i == k || j == k) {
                    continue;
                }
                let cur1 = list[i];
                let cur2 = list[j];
                let cur3 = list[k];
                let sum = cur1 + cur2 + cur3;
                // console.log('[' + i + ']' + '[' + j + '] : ' + cur1 + ' + ' + cur2 + ' = ' + sum);
                if (sum === 2020) {
                    console.log(cur1 + ' + ' + cur2 + ' + ' + cur3 + ' = 2020 SUM = ' + cur1 * cur2 * cur3);
                }
            }
        }
    }
}

findTripleBruteForce(list);