import * as fs from 'fs';

const curPW = 994;

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input2', 'utf-8');

let policy:string[] =[];
let password:string[] =[];

for (const line of file.split(/[\r\n]+/)){
    let curSplit = line.split(': ');
    policy.push(curSplit[0])
    password.push(curSplit[1])
}



console.log('Policy:' + policy[curPW]);
console.log('Password:' + password[curPW]);

function checkPassword(policy, password) {
    let valid: boolean = false;
    let char: string = policy.charAt(policy.length - 1);
    let lowerBound: number = policy.match(/\d+/);
    let upperBound: number = policy.split('-')[1].split(' ')[0];
    // console.log('Char: ' + char + ' lowerBound: ' + lowerBound + ' upperBound: ' + upperBound);

    let count: number = (password.match(new RegExp(char, "g")) || []).length;

    if(lowerBound <= count && count <= upperBound) {
        console.log('CORRECT: ' + lowerBound + ' <= ' + count + ' <= ' + upperBound + '[' + char + '] IN: ' + password);
        valid = true;
    } else {
        console.log('ERROR: ' + lowerBound + ' <= ' + count + ' <= ' + upperBound + '[' + char + '] IN: ' + password);
        valid = false;
    }
    return valid;
}


function checkPassword2(policy, password) {
    let valid: boolean = false;
    let char: string = policy.charAt(policy.length - 1);
    let index1: number = policy.match(/\d+/);
    let index2: number = policy.split('-')[1].split(' ')[0];


    console.log('Password: ' + password +' Char: ' + char + ' index1: ' + index1 + ' index2: ' + index2);
    index1--;
    index2--;

    console.log('Password: ' + password.substring(0, index1) + ' [' + password[index1] + '] ' + password.substring(index1 + 1, index2) + ' [' + password[index2] + '] ' + password.substring(index2 + 1));

    if((password[index1] == char && password[index2] != char) || (password[index1] != char && password[index2] == char)) {
        console.log('CORRECT');
        valid = true;
    } else {
        console.log('WRONG');
        valid = false;
    }

    console.log();
    console.log();
    return valid;
}


let validCount: number = 0;
for (let i = 0; i < password.length; i++) {
    let result: boolean = checkPassword2(policy[i], password[i]);
    if(result) {
        validCount++;
    }
}

console.log('Correct passwords: ' + validCount);