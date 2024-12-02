import * as fs from "fs";

let reports: number[][] = [];
// reports = [
//   [7, 6, 4, 2, 1],
//   [1, 2, 7, 8, 9],
//   [9, 7, 6, 2, 1],
//   [1, 3, 2, 4, 5],
//   [8, 6, 4, 4, 1],
//   [1, 3, 6, 7, 9],
// ];

function isItSafe(report: number[]) {
  if (report.length <= 1) {
    return false;
  }

  let prevDiff = report[0] - report[1];
  if (Math.abs(prevDiff) > 3 || Math.abs(prevDiff) < 1) {
    console.log("too big of change, bad report: ", JSON.stringify(report));
    return false;
  }

  for (let i = 1; i < report.length - 1; i++) {
    const currentDiff = report[i] - report[i + 1];
    if (Math.abs(currentDiff) > 3 || Math.abs(currentDiff) < 1) {
      console.log("too big of change, bad report: ", JSON.stringify(report));
      return false;
    }
    if (currentDiff === 0) {
      console.log("no change, bad report: ", JSON.stringify(report));
      return false;
    }

    // use math :)
    if (prevDiff * currentDiff < 0) {
      console.log("direction change, bad report: ", JSON.stringify(report));
      return false;
    }
    prevDiff = currentDiff;
  }
  console.log("SAFE");
  return true;
}

function getSafeReportsCount() {
  let safeReportCount = 0;
  for (let report of reports) {
    console.log("Checking report", JSON.stringify(report));
    const result = isItSafe(report);
    if (result == true) {
      safeReportCount += 1;
    }
  }
  return safeReportCount;
}

async function loadReportsFromFile() {
  const data = await Bun.file("02/input.txt").text();
  reports = data
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split(" ").map(Number));
}

const main = async () => {
  console.log("starting");
  await loadReportsFromFile();
  const result = getSafeReportsCount();
  console.log("result:", result);
};

await main();
