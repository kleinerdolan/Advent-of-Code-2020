import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input9', 'utf-8');

let inputRaw:string[] = file.split(/[\r\n]+/);

let input:number[] = [];

for(const i of inputRaw) {
    input.push(parseInt(i));
}



function checkIfSum(list: number[], target: number): boolean {
    // console.log('checking ' + list + ' for target ' + target)
    let validTarget: boolean = false;
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if(list[i] + list[j] === target) {
                validTarget = true;
                // console.log('valid! ' + list[i] + ' + ' + list[j] + ' = ' + target);
                return validTarget;
            }
        }
    }
    return validTarget;
}

const preambleLength:number = 25;


for (let i = preambleLength; i < input.length; i++) {
    if(!checkIfSum(input.slice(i - preambleLength, i), input[i])) {
        console.log('Invalid number: ' + input[i]);
        let solution = findSubSet(input.slice(0, i), input[i]);
        console.log('Solution = ' + solution);
        break;
    }
}


function findSubSet(list: number[], target: number): number {
    for( let i = 0; i < list.length; i++) {
        let curSubList: number[] = [list[i]];
        let curSum: number = list[i];
        for (let j = i + 1; j < list.length; j++) {
            curSubList.push(list[j]);
            curSum += list[j];
            if(curSum === target) {
                console.log('Subset found! ' + curSubList);
                let min: number = findMin(curSubList);
                let max: number = findMax(curSubList);
                return min + max;
            }
        }
    }
    console.log('No match found!');
    return 0;
}

function findMin(list: number[]): number {
    let curMin: number = Infinity;
    for (const num of list) {
        if(num < curMin) {
            curMin = num;
        }
    }
    console.log('Min = ' + curMin)
    return curMin;
}

function findMax(list: number[]): number {
    let curMax: number = 0;
    for (const num of list) {
        if(num > curMax) {
            curMax = num;
        }
    }
    console.log('Max = ' + curMax)
    return curMax;
}