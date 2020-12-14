import * as fs from "fs";

interface IBus {
    busId: number;
    offset: number;
}
console.time("part2");


var path = require('path');
var appDir = path.dirname(require.main.filename);

const data = fs.readFileSync(appDir + '/../files/input13', 'utf-8').split("\r\n");
const buses: IBus[] = data[1]
    .split(",")
    .map((id, index) => ({ busId: parseInt(id), offset: index }))
    .filter((c) => !isNaN(c.busId));



const nextTimestamp = (
        initialTimestamp: number,
    increment: number,
    nextBus: IBus
): number => {
    while ((initialTimestamp + nextBus.offset) % nextBus.busId != 0) {
        initialTimestamp += increment;
    }
    return initialTimestamp;
};

let timestamp = 0;
let increment = 1;

for (let bus = 1; bus < buses.length; bus++) {
    increment *= buses[bus - 1].busId;
    timestamp = nextTimestamp(timestamp, increment, buses[bus]);
}

console.log("Answer:", timestamp);
console.timeEnd("part2");