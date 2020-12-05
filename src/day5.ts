import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input5', 'utf-8');

let seats:string[] =[];

for (const line of file.split(/[\r]/)){
    seats = seats.concat(line.replace('\n', ''));
}


function getRow(seatString) {
    let rowString: string = seatString.substring(0, 7);
    let row: number = 127;

    for(let i = rowString.length - 1; i >= 0; i--) {
        if(rowString[6-i] == 'F') {
            row -= Math.pow(2, i);
        }
    }
    return row;

    //         F    B     F     B    B        F        F
    // 127   -64         -16                  -2      -1
    //              +32        +8     +4
    // 0-127 0-63  32-63 32-47 40-47  44-47   44-45   44-44
}


function getColumn(seatString) {
    let columnString: string = seatString.substring(7);
    let column: number = 7;

    for(let i = columnString.length - 1; i >= 0; i--) {
        if(columnString[2-i] == 'L') {
            column -= Math.pow(2, i);
        }
    }
    return column;
}



let max: number = 0;
let seatIds: number[] = [];

for(const seat of seats) {
    let row: number = getRow(seat);
    let column: number = getColumn(seat);
    let seatID: number = row * 8 + column;
    seatIds.push(seatID);
    if(seatID > max) {
        max = seatID;
    }
    // console.log('row ' + row + ', column ' + column + ', seat ID ' + seatID);
}

console.log('highest seatId: ' + max);

seatIds.sort((a, b) => a - b);

for(let i = 0; i < seatIds.length - 1; i++) {
    if(seatIds[i + 1] - seatIds[i] != 1) {
        console.log('gap at: [' + i + ']-[' + (i+1) + ']: ' + seatIds[i] + ' - ' + seatIds[i+1]);
    }
}
