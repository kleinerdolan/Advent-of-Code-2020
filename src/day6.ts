import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input6', 'utf-8');

let groups:string[] = [''];
let curGroup: number = 0;


for (let line of file.split(/[\r]/)){
    if(line == '\n') {
        curGroup++;
        groups[curGroup] = '';
    } else {
        line = line.replace('\n', ' ');
        if(line != '') {
            groups[curGroup] += line;
        }
    }
}

function differentAnswersPerGroup(group) {
    let result: number = 0;
    let answers: string[] = [];
    let answeredQuestions: string[] = [];

    for (const curAnswer of group.split(' ')) {
        if(curAnswer == '') {
            continue;
        } else {
            answers.push(curAnswer);
        }
    }

    for(const curAnswer of answers) {
        for(const question of curAnswer) {
            if(!answeredQuestions.includes(question)) {
                answeredQuestions.push(question);
                result++;
            }
        }
    }
    console.log('Different questions: ' + result);
    return result;
}

function sameAnswersPerGroup(group) {
    let result: number = 0;
    let answers: string[] = [];
    let answeredQuestions: string[] = [];
    let questionCounter: number = 0;

    for (const curAnswer of group.split(' ')) {
        if(curAnswer == '') {
            continue;
        } else {
            answers.push(curAnswer);
        }
    }
    if(answers.length == 0) {
        return 0;
    }

    let questionsPerAnswer: string[][] = [];

    for(const curAnswer of answers) {
        for(const question of curAnswer) {
            if(questionsPerAnswer[questionCounter] == undefined) {
                questionsPerAnswer[questionCounter] = [question];
            } else if(!questionsPerAnswer[questionCounter].includes(question)) {
                questionsPerAnswer[questionCounter].push(question);
            }
        }
        questionCounter++;
    }

    let overallSameQuestions: string[] = questionsPerAnswer[0];

    for(const questions of questionsPerAnswer) {
        overallSameQuestions = overallSameQuestions.filter(x => questions.includes(x));
    }

    // if(!overallSameQuestions.includes(answer)) {
    //     overallSameQuestions.splice( overallSameQuestions.indexOf(answer),1);
    // }


    console.log('Same questions: ' + overallSameQuestions);
    return overallSameQuestions.length;
}

let overallCount: number = 0;

for (const group of groups) {
    overallCount += sameAnswersPerGroup(group);
}

console.log('Answer: ' + overallCount);