const fs = require("fs")

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input13', 'utf-8');

let input:string[] = file.split(/[\r\n]+/);

let earliestDeparture:number = parseInt(input[0]);
let lines:number[] = [];

for(const split of input[1].split(',')) {
    if(split == '') {
        continue;
    }
    lines.push(parseInt(split));
}

// lines.sort((a, b) => a-b);

let linesString:string ='';

// for(const l of lines) {
//     linesString += '  ' + l;
// }

// console.log('time ' + linesString);


//Part 1:
// outerloop:
// for (let curTime = earliestDeparture - 10; curTime <= earliestDeparture + 10; curTime++) {
//     linesString = '   ';
//     for(const l of lines) {
//         // linesString += ' ' + ((curTime % l == 0)?l + '  ': '   ');
//         if(curTime % l == 0) {
//             if(curTime >= earliestDeparture) {
//                 console.log('Earliest possible bus: ' + l + ' at ' + curTime);
//                 let waitingTime = curTime - earliestDeparture;
//                 console.log('waiting time: ' + waitingTime);
//                 console.log('result = ' + waitingTime * l);
//                 break outerloop;
//             }
//         }
//     }
    // console.log(curTime + linesString);
// }

// console.log(lines);
//
// for(let i = 0; i < lines.length; i++) {
//     if(isNaN(lines[i])) {
//         continue;
//     }
//     console.log('line ' + lines[i] + ' departs ' + i + ' minutes after X');
// }

//constraints:
//  %7     == X
// %13 + 1 == X
// %59 + 4 == X
// %31 + 6 == X
// %19 + 7 == X

for (let curTime = 0; curTime < 200000000000000; curTime++) {
    let valid = true;
    for(let i = 0; i < lines.length; i++) {
        if (isNaN(lines[i])) {
            continue;
        } else {
            if(!((curTime + i) % lines[i] == 0)) {
                valid = false;
                continue;
            }
        }
    }
    if(valid) {
        console.log(curTime);
        break;
    }
}