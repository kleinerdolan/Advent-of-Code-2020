import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input4', 'utf-8');

let input:string[] =[];

let passports:string[] = [];

// for (const line of file.split(/[\r\n]+/)){
for (const line of file.split(/[\r]/)){
    input = input.concat(line);
}


let newPassport: string = '';

for (const line of input) {
    if(line == '\n') {
        passports.push(newPassport);
        newPassport = '';
        continue;
    }
    let buffer:string = (line.split('\n')[1]|| '')   + ' ' ;
        newPassport += buffer;
}
//add the last passport
passports.concat(newPassport);


function validatePassport(passport) {


    // console.log();
    // console.log('__________________________________________________________');
    //
    // console.log('VALITADING PASSPORT: ');
    // console.log(passport);

    let valid:boolean = false;
    let attributes:string = passport.split(' ');
    let attributeMap:Map<string, string> = new Map();

    for (const key of attributes) {
        let curAttributePair = key.split(':');
        let curKey:string = curAttributePair[0];
        let curValue:string = curAttributePair[1];
        if(curKey != '') {
            attributeMap.set(curKey, curValue);
        }
    }


    if(attributeMap.has('byr') && attributeMap.has('iyr') && attributeMap.has('eyr') && attributeMap.has('hgt') && attributeMap.has('hcl') && attributeMap.has('ecl') && attributeMap.has('pid')) {

        if(attributeMap.get('pid').length > 9) {
            return false;
        }

        if(attributeMap.get('ecl').length > 3) {
            return false;
        }


        if(attributeMap.get('byr').length == 4 && parseInt(attributeMap.get('byr')) >= 1920 && parseInt(attributeMap.get('byr')) <= 2002) {
            // console.log('CORRECT birthyear [1920-2002]: ' + attributeMap.get('byr'))
            valid = true;
        } else {
            // console.log('WRONG birthyear [1920-2002]: ' + attributeMap.get('byr'))
            valid = false;
            return valid;
        }

        if(attributeMap.get('iyr').length == 4 && parseInt(attributeMap.get('iyr')) >= 2010 && parseInt(attributeMap.get('iyr')) <= 2020) {
            // console.log('CORRECT issueyear [2010-2020]: ' + attributeMap.get('iyr'))
            valid = true;
        } else {
            // console.log('WRONG issueyear [2010-2020]: ' + attributeMap.get('iyr'))
            valid = false;
            return valid;
        }

        if(attributeMap.get('eyr').length == 4 && parseInt(attributeMap.get('eyr')) >= 2020 && parseInt(attributeMap.get('eyr')) <= 2030) {
            // console.log('CORRECT expiration year [2020-2030] : ' + attributeMap.get('eyr'))
            valid = true;
        } else {
            // console.log('WRONG expiration year [2020-2030] : ' + attributeMap.get('eyr'))
            valid = false;
            return valid;
        }


        if(attributeMap.get('hgt').endsWith('in') || attributeMap.get('hgt').endsWith('cm')) {
            let height: number = parseInt(attributeMap.get('hgt').substring(0, attributeMap.get('hgt').length -2));
            if(attributeMap.get('hgt').endsWith('cm') && height >= 150 && height <= 193) {
                // console.log('CORRECT height: ' + attributeMap.get('hgt') + ' [' + height + ']' + '[cm] 150-193');
                valid = true;
            } else if(attributeMap.get('hgt').endsWith('in') && height >= 59 && height <= 76) {
                // console.log('CORRECT height: ' + attributeMap.get('hgt') + ' [' + height + ']' + '[in] 59-76');
                valid = true;
            } else {
                // console.log('WRONG height: ' + attributeMap.get('hgt') + ' [' + height + ']');
                valid = false;
                return valid;
            }
        }


        if(attributeMap.get('hcl').startsWith('#') && attributeMap.get('hcl').match("#[0-9a-f]{6}") != null) {
            let match = attributeMap.get('hcl').match("#[0-9a-f]{6}");
            valid = true;
            // console.log('CORRECT hair colour: ' + attributeMap.get('hcl') + ' checked substring: [' + attributeMap.get('hcl') + '] match= ' + match);
        } else {
            let match = attributeMap.get('hcl').match("#[0-9a-f]{6}$");
            // console.log('WRONG hair colour: ' + attributeMap.get('hcl') + ' checked substring: [' + attributeMap.get('hcl') + '] match= ' + match);
            valid = false;
            return valid;
        }

        let eyecolor: string = attributeMap.get('ecl');
        if(eyecolor == 'amb' || eyecolor == 'blu' || eyecolor == 'brn' || eyecolor == 'gry' || eyecolor == 'grn' || eyecolor == 'hzl' || eyecolor == 'oth') {
            valid = true
            // console.log('CORRECT eye colour: [' + eyecolor + '] amb blu brn gry grn hzl oth');
        } else {
            valid = false;
            // console.log('WRONG eye colour: ' + eyecolor + ' amb blu brn gry grn hzl oth');
            return valid;
        }

        if(attributeMap.get('pid').match('[0-9]{9}$') && attributeMap.get('pid').length == 9) {
            valid = true;
            // console.log('CORRECT passport id: [' + attributeMap.get('pid') + '] length=' + attributeMap.get('pid').length);
        } else {
            // console.log('WRONG passport id: [' + attributeMap.get('pid') + '] length=' + attributeMap.get('pid').length);
            valid = false;
            return valid;
        }


    } else {
        // console.log('WRONG FORMAT');
    }



    if(!valid) {
        // console.log(passport);
        // console.log();

    }


    return valid;
}

let validPassports: number = 0;
for (const curPassport of passports) {
    if(validatePassport(curPassport)) {
        validPassports++;
    }
}

console.log('Valid passports: ' + validPassports);