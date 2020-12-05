import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input3', 'utf-8');

const stepLeft: number = 1;
const stepDown: number = 2;


// Right 1, down 1. 077
// Right 3, down 1. 218
// Right 5, down 1. 065
// Right 7, down 1. 082
// Right 1, down 2. 043


let input:string[] =[];

for (const line of file.split(/[\r\n]+/)){
    input = input.concat(line);
}


function step(input, posY, posX) {
    let newX: number = (posX + stepLeft) % input[0].length;
    let newY: number = posY + stepDown;

    return [newY, newX];
}

let nextSteps: number[] = [0,0];
let finished: boolean = false;
let trees: number = 0;
let stepCounter: number = 0;

while(!finished) {
    nextSteps = step(input, nextSteps[0], nextSteps[1]);

    if(nextSteps[0] >= input.length) {
        finished = true;
    } else {
        console.log('STEP ' + ++stepCounter + ' [' + nextSteps[0] + ']' + '[' + nextSteps[1] + ']' + ' [' + input[nextSteps[0]][nextSteps[1]] + ']');
        if (input[nextSteps[0]][nextSteps[1]] == "#") {
            trees++;
        }
    }
        }

console.log('FINISHED! TREES: ' + trees);


console.log('MULTIPLIED: ' + 77*218*65*82*43)
