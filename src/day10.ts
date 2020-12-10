import * as fs from 'fs';
import * as _ from 'lodash';


var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input10', 'utf-8');

let inputRaw:string[] = file.split(/[\r\n]+/);

let input:number[] = [0];

for(const i of inputRaw) {
    input.push(parseInt(i));
}

input = input.sort((n1,n2) => n1 - n2);
input = _.uniq(input);

let steps:number[] =[0,0,0,0];

function findHighestOutput() {
    let jolt:number = 0;
    for(let i = 0; i < input.length; i++) {
        if(input[i] <= jolt + 3) {
            steps[input[i] - jolt]++;
            jolt = input[i];
        } else {
            console.log('GAP detected at ' + input[i]);
            console.log('Max jolt = ' + jolt);
            return;
        }
    }
    jolt += 3;
    steps[3]++;
    console.log('Max jolt = ' + jolt);
    // console.log('0-steps: ' + steps[0]);
    // console.log('1-steps: ' + steps[1]);
    // console.log('2-steps: ' + steps[2]);
    // console.log('3-steps: ' + steps[3]);
}

function findMax(list: number[]): number {
    let curMax: number = 0;
    for (const num of list) {
        if(num > curMax) {
            curMax = num;
        }
    }
    return curMax;
}

let waysFromIndexToMax: number[] = new Array(input.length);

//initializing the array to all zeros
for(let i = 0; i < waysFromIndexToMax.length; i++) {
    waysFromIndexToMax[i] = 0;
}

function findAllSubCombinations(subarray: number[], absoluteStart: number): number {
    // console.log('Finding all subCombinations: ' + subarray);
    let combinations: number = 0;

    if(subarray.length == 1) {
        combinations = 1;
        return combinations;
    }

    for(let i = 0; i < subarray.length; i++) {
        if(subarray[i] - subarray[0] > 3 ) {
            break;
        } else if(!validateCombination(subarray.slice(i))) {
            continue;
        }
        // console.log('adding [' + waysFromIndexToMax[absoluteStart + i] + '] to [' + combinations + ']');
        combinations += waysFromIndexToMax[absoluteStart + i];
    }
    return combinations;
}


function findAllCombinations() {
    for(let i = input.length - 1; i >= 0; i--) {
        waysFromIndexToMax[i] = findAllSubCombinations(input.slice(i), i);
    }
    console.log('combinations: ' + waysFromIndexToMax[0]);
    // for (let j = 0; j < input.length; j++) {
    //     console.log('input[' + j + '] : ' + input[j] + ' possibilities: ' + waysFromIndexToMax[j]);
    // }
}


function validateCombination(subarray: number[]): boolean {
    let valid = false;
    let jolt = subarray[0];
    for(let i = 0; i < subarray.length; i++) {
        if(subarray[i] <= jolt + 3) {
            subarray[input[i] - jolt]++;
            jolt = subarray[i];
        } else {
            return valid;
        }
    }
    valid = true;
    return valid;
}

findAllCombinations();