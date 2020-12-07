import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input7', 'utf-8');

let rules:string[] = file.split(/[\r\n]+/);
let colors:string[] = [];
let dependencyMap:Map<string,string[]> = new Map();
let resolvedDependencies:Map<string,string[]> = new Map();

function getAllColors() {
    for (const line of rules) {
        colors.push(line.split(' bags contain')[0]);
    }
}

function getAllDependencies() {
    for (let i = 0; i < rules.length; i++) {
        let outerBag: string = rules[i].split(' bags contain')[0];
        let innerBags: string[] = rules[i].split(' bags contain ')[1].split(', ')
        innerBags = innerBags.map(entry => entry.split(' bag')[0]);
        if(innerBags[innerBags.length - 1] == 'no other') {
            innerBags.pop();
        }

        let resolvedInnerBags: string[] = [];
        // console.log(innerBags);
        if(innerBags.length > 0) {
            for (const curBag of innerBags) {
            let singelBagNumber = parseInt(curBag.match('[1-9 ]')[0]);
            let singleBagText = curBag.match(' [a-z]+ [a-z]+')[0].substring(1);
            // for (let i = 0; i < singelBagNumber; i++) {
            //     resolvedInnerBags.push(singleBagText);
            // }
                resolvedInnerBags.push(singleBagText);
        }
        }
        dependencyMap[outerBag] = resolvedInnerBags;

    }
}

let counter = 0;

function findGold () {
    // iterate through all keys
    // for each value find all internal bags until terminal or shiny gold
    for(const color of colors) {
        console.log('COLOR: ' + color + ' [' + dependencyMap[color] + ']');
        if(dependencyMap[color].length == 0) {
            continue;
        }
        loop1:
        for (const entry of dependencyMap[color]) {
            if(dependencyMap[entry].length == 0) {
                // console.log(entry + ' is terminal');
                break;
            } else if(entry == 'shiny gold') {
                console.log('GOLD')
                counter++
                break;
            } else {
                // console.log('entering: ' + entry);

                for (const innerEntry of dependencyMap[entry]) {
                    if(dependencyMap[innerEntry].length == 0) {
                        // console.log(innerEntry + ' is terminal');
                        break;
                    } else if(innerEntry == 'shiny gold') {
                        console.log('GOLD')
                        counter++
                        break loop1;
                    }  else {
                        // console.log('entering2: ' + innerEntry);

                        for (const innerEntry2 of dependencyMap[innerEntry]) {
                            if(dependencyMap[innerEntry2].length == 0) {
                                // console.log(innerEntry2 + ' is terminal');
                                break;
                            } else if(innerEntry2 == 'shiny gold') {
                                console.log('GOLD')
                                counter++
                                break loop1;
                            } else {
                                // console.log('entering3: ' + innerEntry2);

                                for (const innerEntry3 of dependencyMap[innerEntry2]) {
                                    if(dependencyMap[innerEntry3].length == 0) {
                                        // console.log(innerEntry3 + ' is terminal');
                                        break;
                                    } else if(innerEntry3 == 'shiny gold') {
                                        console.log('GOLD')
                                        counter++
                                        break loop1;
                                    } else {
                                        // console.log('entering4: ' + innerEntry3);

                                        for (const innerEntry4 of dependencyMap[innerEntry3]) {
                                            if(dependencyMap[innerEntry4].length == 0) {
                                                // console.log(innerEntry4 + ' is terminal');
                                                break;
                                            } else if(innerEntry4 == 'shiny gold') {
                                                console.log('GOLD')
                                                counter++
                                                break loop1;
                                            } else {
                                                // console.log('entering5: ' + innerEntry4);

                                                for (const innerEntry5 of dependencyMap[innerEntry4]) {
                                                    if(dependencyMap[innerEntry5].length == 0) {
                                                        // console.log(innerEntry5 + ' is terminal');
                                                        break;
                                                    } else if(innerEntry5 == 'shiny gold') {
                                                        console.log('GOLD')
                                                        counter++
                                                        break loop1;
                                                    } else {
                                                        // console.log('entering6: ' + innerEntry5);

                                                        for (const innerEntry6 of dependencyMap[innerEntry5]) {
                                                            if(dependencyMap[innerEntry6].length == 0) {
                                                                // console.log(innerEntry6 + ' is terminal');
                                                                break;
                                                            } else if(innerEntry6 == 'shiny gold') {
                                                                console.log('GOLD')
                                                                counter++
                                                                break loop1;
                                                            } else {
                                                                // console.log('entering7: ' + innerEntry6);

                                                                for (const innerEntry7 of dependencyMap[innerEntry6]) {
                                                                    if(dependencyMap[innerEntry7].length == 0) {
                                                                        // console.log(innerEntry7 + ' is terminal');
                                                                        break;
                                                                    } else if(innerEntry7 == 'shiny gold') {
                                                                        console.log('GOLD')
                                                                        counter++
                                                                        break loop1;
                                                                    } else {
                                                                        // console.log('entering8: ' + innerEntry7);

                                                                        for (const innerEntry8 of dependencyMap[innerEntry7]) {
                                                                            if(dependencyMap[innerEntry8].length == 0) {
                                                                                // console.log(innerEntry8 + ' is terminal');
                                                                                break;
                                                                            } else if(innerEntry8 == 'shiny gold') {
                                                                                console.log('GOLD')
                                                                                counter++
                                                                                break loop1;
                                                                            } else {
                                                                                // console.log('entering9: ' + innerEntry8);

                                                                                for (const innerEntry9 of dependencyMap[innerEntry8]) {
                                                                                    if(dependencyMap[innerEntry9].length == 0) {
                                                                                        // console.log(innerEntry9 + ' is terminal');
                                                                                        break;
                                                                                    } else if(innerEntry9 == 'shiny gold') {
                                                                                        console.log('GOLD')
                                                                                        counter++
                                                                                        break loop1;
                                                                                    } else {
                                                                                        // console.log('entering10: ' + innerEntry9);

                                                                                        for (const innerEntry10 of dependencyMap[innerEntry9]) {
                                                                                            if(dependencyMap[innerEntry10].length == 0) {
                                                                                                // console.log(innerEntry10 + ' is terminal');
                                                                                                break;
                                                                                            } else if(innerEntry10 == 'shiny gold') {
                                                                                                console.log('GOLD')
                                                                                                counter++
                                                                                                break loop1;
                                                                                            } else {
                                                                                                // console.log('entering11: ' + innerEntry10);

                                                                                                for (const innerEntry11 of dependencyMap[innerEntry10]) {
                                                                                                    if(dependencyMap[innerEntry11].length == 0) {
                                                                                                        // console.log(innerEntry11 + ' is terminal');
                                                                                                        break;
                                                                                                    } else if(innerEntry11 == 'shiny gold') {
                                                                                                        console.log('GOLD')
                                                                                                        counter++
                                                                                                        break loop1;
                                                                                                    } else {
                                                                                                        // console.log('entering12: ' + innerEntry11);

                                                                                                        for (const innerEntry12 of dependencyMap[innerEntry11]) {
                                                                                                            if(dependencyMap[innerEntry12].length == 0) {
                                                                                                                // console.log(innerEntry12 + ' is terminal');
                                                                                                                break;
                                                                                                            } else if(innerEntry12 == 'shiny gold') {
                                                                                                                console.log('GOLD')
                                                                                                                counter++
                                                                                                                break loop1;
                                                                                                            } else {
                                                                                                                // console.log('entering13: ' + innerEntry12);

                                                                                                                for (const innerEntry13 of dependencyMap[innerEntry12]) {
                                                                                                                    if(dependencyMap[innerEntry13].length == 0) {
                                                                                                                        // console.log(innerEntry13 + ' is terminal');
                                                                                                                        break;
                                                                                                                    } else if(innerEntry13 == 'shiny gold') {
                                                                                                                        console.log('GOLD')
                                                                                                                        counter++
                                                                                                                        break loop1;
                                                                                                                    } else {
                                                                                                                        // console.log('entering14: ' + innerEntry13);

                                                                                                                        for (const innerEntry14 of dependencyMap[innerEntry13]) {
                                                                                                                            if(dependencyMap[innerEntry14].length == 0) {
                                                                                                                                // console.log(innerEntry14 + ' is terminal');
                                                                                                                                break;
                                                                                                                            } else if(innerEntry14 == 'shiny gold') {
                                                                                                                                console.log('GOLD')
                                                                                                                                counter++
                                                                                                                                break loop1;
                                                                                                                            } else {
                                                                                                                                // console.log('entering14: ' + innerEntry13);

                                                                                                                                for (const innerEntry15 of dependencyMap[innerEntry14]) {
                                                                                                                                    if(dependencyMap[innerEntry15].length == 0) {
                                                                                                                                        // console.log(innerEntry15 + ' is terminal');
                                                                                                                                        break;
                                                                                                                                    } else if(innerEntry15 == 'shiny gold') {
                                                                                                                                        console.log('GOLD')
                                                                                                                                        counter++
                                                                                                                                        break loop1;
                                                                                                                                    } else {
                                                                                                                                        // console.log('entering14: ' + innerEntry13);

                                                                                                                                        for (const innerEntry16 of dependencyMap[innerEntry15]) {
                                                                                                                                            if(dependencyMap[innerEntry16].length == 0) {
                                                                                                                                                // console.log(innerEntry16 + ' is terminal');
                                                                                                                                                break;
                                                                                                                                            } else if(innerEntry16 == 'shiny gold') {
                                                                                                                                                console.log('GOLD')
                                                                                                                                                counter++
                                                                                                                                                break loop1;
                                                                                                                                            } else {
                                                                                                                                                // console.log('entering14: ' + innerEntry13);

                                                                                                                                                for (const innerEntry17 of dependencyMap[innerEntry16]) {
                                                                                                                                                    if(dependencyMap[innerEntry17].length == 0) {
                                                                                                                                                        // console.log(innerEntry17 + ' is terminal');
                                                                                                                                                        break;
                                                                                                                                                    } else if(innerEntry17 == 'shiny gold') {
                                                                                                                                                        console.log('GOLD')
                                                                                                                                                        counter++
                                                                                                                                                        break loop1;
                                                                                                                                                    } else {
                                                                                                                                                        // console.log('entering14: ' + innerEntry13);
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


getAllColors();
getAllDependencies();
findGold();
console.log('counter: ' + counter);

























let changeCounter: number = 0;

function resolveDependencies() {
    changeCounter = 0;
    for(const color of colors) {
        // console.log('COLOR: ' + color + ' [' + dependencyMap[color] + ']');
        let resolvedEntries:string[] = [];
        if(dependencyMap[color].length == 0) {
            continue;
        }
        for (const entry of dependencyMap[color]) {
            // console.log('entry: ' + entry);
            if(dependencyMap[entry].length == 0) {
                // console.log(entry + ' is terminal');
                // console.log('adding ' + entry);
                resolvedEntries = resolvedEntries.concat(entry);
            } else {
                changeCounter++;
                let newEntry = dependencyMap[entry];
                // resolvedEntries.push(dependencyMap[entry]);
                resolvedEntries =resolvedEntries.concat(newEntry);
            }
        }
        dependencyMap[color] = resolvedEntries;
        // console.log('------------------------------------------------')
    }
}



function outerRecursion(bags: string[]) {
    // console.log('ENTERING OUTER RECURSION FOR: ' + bags)
    let count:number;
    let innerBag:string;
    let result: string[] = [];


    if(bags.length == 1) {
        count = parseInt(bags[0].match('[1-9 ]')[0]);
        innerBag = bags[0].match(' [a-z]+ [a-z]+')[0].substring(1);
        for(let i = 0; i < count; i++) {
            result.push(innerBag);
        }
        // console.log('returning single: ' + result);
        return result;
    }

    for (const bag of bags) {
        count = parseInt(bag.match('[1-9 ]')[0]);
        innerBag = bag.match(' [a-z]+ [a-z]+')[0].substring(1);
        for(let i = 0; i < count; i++) {
            // console.log('dependencyMap[' + innerBag + '] = ' + dependencyMap[innerBag]);
            if(dependencyMap[innerBag].length > 0) {
                result.concat(outerRecursion(dependencyMap[innerBag]));
            } else {
                console.log('terminal: ' + innerBag);

                result.push(innerBag);
            }
        }
    }

    // console.log('returning multiple: ' + result);
    return result;

}


