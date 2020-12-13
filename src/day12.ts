import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const file = fs.readFileSync(appDir + '/../files/input12', 'utf-8');

let input:string[] = file.split(/[\r\n]+/);

const EAST = 'E';
const WEST = 'W';
const SOUTH = 'S';
const NORTH = 'N';
const RIGHT = 'R';
const LEFT = 'L';
const FORWARD = 'F';

let distances:number[] = [0,0,0,0];
let direction:number = 1;
let position:number[] = [0,0];
let waypoint:number[] = [1, 10]; //[North, East]


function step1(instruction: string) {
    let curDirection = instruction.charAt(0);
    // let newDirection: number = getDirection(instruction.charAt(0));
    let speed = parseInt(instruction.substring(1));

    switch (curDirection) {
        case NORTH:
            console.log('north + ' + speed);
            distances[0] += speed;
            break;
        case EAST:
            console.log('east + ' + speed);
            distances[1] += speed;
            break;
        case SOUTH:
            console.log('south + ' + speed);
            distances[2] += speed;
            break;
        case WEST:
            console.log('west + ' + speed);
            distances[3] += speed;
            break;
        case RIGHT:
            speed /= 90;
            direction += speed;
            direction %= 4;
            break;
        case LEFT:
             speed /= 90;
            direction -= speed;

            if(direction < 0) {
                direction += 4;
            }
            break;
        case FORWARD:
            // console.log('forward + ' + speed);
            distances[direction] += speed;
            // console.log('!!!!!!!!!!!!! ' + distances[direction]);
            break;
    }

}

function getDirection(dirString:string): number {
    let dir:number;

    switch (dirString) {
        case NORTH:
            dir = 0;
            break;
        case EAST:
            dir = 1;
            break;
        case SOUTH:
            dir = 2;
            break;
        case WEST:
            dir = 3;
            break;
        default:
            dir = 999;
            console.log('direction is left or right');
    }
    return dir;
}

function getAbsolutePosition() {
    if(distances[0] > distances[2]) {
        distances[0] -= distances[2];
        distances[2] = 0;
    } else {
        distances[2] -= distances[0];
        distances[0] = 0;
    }

    if(distances[1] > distances[3]) {
        distances[1] -= distances[3];
        distances[3] = 0;
    } else {
        distances[3] -= distances[1];
        distances[1] = 0;
    }
}








function step(instruction: string) {
    let curDirection = instruction.charAt(0);
    // let newDirection: number = getDirection(instruction.charAt(0));
    let speed = parseInt(instruction.substring(1));

    switch (curDirection) {
        case NORTH:
            console.log('setting waypoint north ' + speed );
            waypoint[0] += speed;
            break;
        case EAST:
            console.log('setting waypoint east ' + speed);
            waypoint[1] += speed;
            break;
        case SOUTH:
            console.log('setting waypoint south ' + speed);
            waypoint[0] -= speed;
            break;
        case WEST:
            console.log('setting waypoint west ' + speed);
            waypoint[1] -= speed;
            break;
        case RIGHT:
            speed /= 90;
            let oldNorth;
            let oldEast;
            for(let i = 0; i < speed; i++) {
                console.log('turning right');
                oldNorth = waypoint[0];
                oldEast = waypoint[1];
                waypoint[0] = -1 * oldEast;
                waypoint[1] = oldNorth;
            }
            break;
        case LEFT:
            speed /= 90;
            let oldNorth2;
            let oldEast2;
            for(let i = 0; i < speed; i++) {
                oldNorth2 = waypoint[0];
                oldEast2 = waypoint[1];
                console.log('turning left');
                waypoint[0] = oldEast2;
                waypoint[1] = -1 * oldNorth2;
            }
            break;
        case FORWARD:
            for(let i = 0; i < speed; i++) {
                console.log('moving forward');
                if(position[0] > 0) {
                    distances[0] += waypoint[0];
                } else {
                    distances[2] += -1 * waypoint[0];
                }
                if( position[1] > 0) {
                    distances[1] += waypoint[1];
                } else {
                    distances[3] += -1 * waypoint[1];
                }
            }
            break;
    }

}










for(const curInstruction of input) {
    step(curInstruction);
    console.log('north: ' + distances[0]);
    console.log('east: ' + distances[1]);
    console.log('south: ' + distances[2]);
    console.log('west: ' + distances[3]);
    console.log('waypoint: ' + waypoint);
    console.log('----------------------');
}

getAbsolutePosition();


// console.log('direction: ' + direction);
console.log('north: ' + distances[0]);
console.log('east: ' + distances[1]);
console.log('south: ' + distances[2]);
console.log('west: ' + distances[3]);
console.log('waypoint: ' + waypoint);

let sum = 0;

sum += distances[0];
sum += distances[1];
sum += distances[2];
sum += distances[3];

console.log('manhattan-distance = ' + sum);

//Part 1
//6324 is too high
//4224 is too high
//82 is wrong
//898 is wrong

//Part 2
//13907 is too low