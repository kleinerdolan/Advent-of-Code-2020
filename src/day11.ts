import * as fs from 'fs';
import * as _ from 'lodash';


var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input11', 'utf-8');

let inputRaw:string[] = file.split(/[\r\n]+/);

const FLOOR:string = '.';
const EMPTY:string = 'L';
const OCCUPIED:string = '#';
const OUTOFBOUNDS:string = 'oob';

function get(row: number, column: number, grid:string[]):string {
    let seat: string;
    // if(row < 0 || row > grid.length - 1 || column < 0 || column > grid[0].length - 1) {
    //     seat = OUTOFBOUNDS;
    // } else {
    //     seat = grid[row].charAt(column);
    // }
    if(grid[row] == undefined) {
        return OUTOFBOUNDS;
        } else if(grid[row].charAt(column) == '') {
        return  OUTOFBOUNDS;
    } else
        {
        return grid[row].charAt(column);
    }
    // return seat;
}

function getSurroundingSeatsPart1(row, column, grid:string[]): number[] {
    let occupiedSeats:number = 0;
    let emptySeats:number = 0;
    for (let curRow = row - 1; curRow <= row + 1; curRow++) {
        for (let curCol = column - 1; curCol <= column + 1; curCol++) {
            if(curCol == column && curRow == row) {
                continue;
            }
            let curSeat:string = get( curRow, curCol, grid);
            // if(row == 0) {
            //     console.log('row = ' + (curRow) + ' column = ' + (curCol) + ' : ' + curSeat);
            // }
            if(curSeat == EMPTY) {
                emptySeats++
            } else if(curSeat == OCCUPIED) {
                occupiedSeats++;
            }
        }
    }
    return [emptySeats, occupiedSeats];
}

function getSurroundingSeats(row, column, grid:string[]): number[] {
    let occupiedSeats:number = 0;
    let emptySeats:number = 0;
    //check all 8 directions until the seat is out of bounds

    // console.log('getting srroundedSeats');

    //left up
    // console.log('checking left up');
    if(checkDirection(row, column, -1, -1, grid)) {
        occupiedSeats++;
    }
    //up
    // console.log('checking up');
    if(checkDirection(row, column, -1, 0, grid)) {
        occupiedSeats++;
    }
    //right up
    // console.log('checking right up');
    if(checkDirection(row, column, -1, 1, grid)) {
        occupiedSeats++;
    }
    //right
    // console.log('checking right');
    if(checkDirection(row, column, 0, 1, grid)) {
        occupiedSeats++;
    }
    //right down
    // console.log('checking right down');
    if(checkDirection(row, column, 1, 1, grid)) {
        occupiedSeats++;
    }
    //down
    // console.log('checking down');
    if(checkDirection(row, column, 1, 0, grid)) {
        occupiedSeats++;
    }
    //down left
    // console.log('checking down left');
    if(checkDirection(row, column, 1, -1, grid)) {
        occupiedSeats++;
    }
    //left
    // console.log('checking left');
    if(checkDirection(row, column, 0, -1, grid)) {
        occupiedSeats++;
    }
    // console.log('occupied seats: ' + occupiedSeats)
    return [0, occupiedSeats];
}

function checkDirection(row: number, col: number, rowStep: number, colStep:number, grid:string[]): boolean {
    let occupied = false;
    row += rowStep;
    col -= colStep;
    let curSeat:string = get( row, col, grid);
    // console.log('begin: ' +curSeat);
    while(true){
        // console.log('[' + row + '][' + col + ']');
        curSeat = get( row, col, grid);
        // console.log('curSeat = ' + curSeat);
        if(curSeat == OCCUPIED) {
            occupied = true;
            break;
        }
        if(curSeat == OUTOFBOUNDS) {
            break;
        }
        if(curSeat == EMPTY) {
            break;
        }
        row += rowStep;
        col -= colStep;
    }
    // console.log('--------------------------------------------------------------------------------------')
    // console.log('occupied? ' + occupied);
    return occupied;
}

function updateSeats(oldGrid:string[]): string[] {
    let newGrid: string[] = getCopy(oldGrid);
    for(let r = 0; r < inputRaw.length; r++) {
        for (let c = 0; c < inputRaw[0].length; c++) {
            let surroundingSeats:number[] = getSurroundingSeats(r, c, oldGrid);
            let centerSeat: string = get(r, c, oldGrid);

            // console.log('updating [' + r + '][' + c + '] = ' + centerSeat);
            // console.log('surrounding seats = ' + surroundingSeats);

            if(centerSeat == FLOOR) {
                continue;
            }

            if(centerSeat == EMPTY) {
                if(surroundingSeats[1] == 0) {
                    // console.log('taking seat [' + r + '][' + c + ']');
                    newGrid[r] = newGrid[r].substring(0,c) + OCCUPIED + inputRaw[r].substring(c+1);
                }
            } else if(centerSeat == OCCUPIED) {
                if(surroundingSeats[1] >= 5) {
                    // console.log('leaving seat [' + r + '][' + c + ']');
                    newGrid[r] = newGrid[r].substring(0,c) + EMPTY + inputRaw[r].substring(c+1);
                }
            }
        }
    }
    return newGrid;
}


function countOccupiedSeats(grid: string[]): number {
    let occupiedSeats = 0;
    for(let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if(get(r, c, grid) == OCCUPIED) {
                occupiedSeats++;
            }
        }
    }
    console.log('OCCUPIED: ' + occupiedSeats);
    return occupiedSeats;
}

function getCopy(oldGrid: string[]): string[] {
    let copy:string[] = [];
    for(let r = 0; r < oldGrid.length; r++) {
        copy.push(oldGrid[r]);
    }
    return copy;
}

function print(grid:string[]) {
    console.log('-----------------------------------------------');
    for(let r = 0; r < grid.length; r++) {
        let rowString = '';
        for (let c = 0; c < grid[0].length; c++) {
            rowString += get(r, c, grid);
        }
        console.log(rowString);
    }
    console.log('-----------------------------------------------');
}

let loopCounter:number = 0;
let occupiedSeatsCounter: number = -1;


print(inputRaw);
// inputRaw = updateSeats(inputRaw);
// print(inputRaw);
// countOccupiedSeats(inputRaw);
//
//
// inputRaw = updateSeats(inputRaw);
// print(inputRaw);
// countOccupiedSeats(inputRaw);


while(countOccupiedSeats(inputRaw) != occupiedSeatsCounter) {
// for (let c = 0; c < 5; c++) {
    occupiedSeatsCounter = countOccupiedSeats(inputRaw);
    inputRaw = updateSeats(inputRaw);
    // print(inputRaw);
    loopCounter++;
}

print(inputRaw);
console.log('No more changes! ' + loopCounter + ' loops. Occupied Seats: ' + occupiedSeatsCounter);


//Part 1:
//8918 to high
//2031 is wrong