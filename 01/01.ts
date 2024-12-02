import * as fs from "fs";

const listA: number[] = [];
const listB: number[] = [];

let distanceSum = 0;

function getDistance() {
  const listAsorted = listA.sort();
  const listBsorted = listB.sort();

  for (let i = 0; i < listA.length; i++) {
    const distance = Math.abs(listAsorted[i] - listBsorted[i]);
    if (!Number.isNaN(distance)) {
      distanceSum = distanceSum + distance;
    }
  }
  return distanceSum;
}

async function loadListsFromFile() {
  const data = fs.readFileSync("01/input.txt", "utf8");
  const lines = data.split("\n");
  for (const line of lines) {
    const lineEntries = line.split("   ").map((i) => {
      return parseInt(i);
    });
    listA.push(lineEntries[0]);
    listB.push(lineEntries[1]);
  }
}

console.log("starting");
await loadListsFromFile();
const result = getDistance();
console.log("result", result);
