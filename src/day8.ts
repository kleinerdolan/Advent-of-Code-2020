import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input8', 'utf-8');

let rawInstructions:string[] = file.split(/[\r\n]+/);



function run(instructions: string[]) {
    let visitedInstructions: number[] = [];
    let acc: number = 0;
    let jump: number = 1;
    let infinityLoop = false;

    for(let i = 0; i < instructions.length; i+= jump) {
        jump = 1;
        let curInstruction: string = instructions[i];
        let operation: string = curInstruction.split(' ')[0];
        let param: number = parseInt(curInstruction.split(' ')[1]);

        // console.log('[' + i + '] operation: [' + operation + '] param: [' + param + ']');

        //check if revisit
        if(visitedInstructions.includes(i)) {
            // console.log('Infinity Loop detected! Acc = ' + acc);
            infinityLoop = true;
            break;
        }
        visitedInstructions.push(i);

        switch(operation) {
            case 'acc': {
                acc += param;
                break;
            }
            case 'jmp': {
                jump = param;
                break;
            }
            case 'nop': {
                break;
            }
            default: {
                console.log('Default case')
                break;
            }
        }
    }

    if(!infinityLoop) {
        console.log('Terminated! Acc = ' + acc);
    }

    return infinityLoop;
}


for(let i = 0; i < rawInstructions.length; i++) {
    let changedInstructions = [];
    rawInstructions.forEach(val => changedInstructions.push(val));
    if(changedInstructions[i].split(' ')[0] == 'nop') {
        changedInstructions[i] = 'jmp ' + changedInstructions[i].split(' ')[1];
    } else     if(changedInstructions[i].split(' ')[0] == 'jmp') {
        changedInstructions[i] = 'nop ' + changedInstructions[i].split(' ')[1];
    }
    let infinityLoop = run(changedInstructions);

    if(!infinityLoop) {
        // console.log('changed instruction #' + i);
        console.log('changed ' + rawInstructions[i] + ' -> ' + changedInstructions[i]);
        break;
    }
}