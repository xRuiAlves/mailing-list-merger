const fs = require("fs");

const COMPLEX_EMAIL_REGEX = /^.*<(.+)>$/

const readEmailList = (file_path) => new Set(fs
    .readFileSync(file_path)
    .toString()
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length !== 0)
    .map(line => {
        const match = COMPLEX_EMAIL_REGEX.exec(line)
        return match 
            ? match[1]
            : line
    }));

if (process.argv.length < 4) {
    console.error("Missing parameters.");
    console.error("usage: node merger.js <file 1> <file 2>");
    process.exit(1);
}

const file1_path = process.argv[2];
const file2_path = process.argv[3];

const l1 = readEmailList(file1_path);
const l2 = readEmailList(file2_path);

const intersection = [...l1].filter(email => l2.has(email)).sort();
const l1_exclusive = [...l1].filter(email => !l2.has(email)).sort();
const l2_exclusive = [...l2].filter(email => !l1.has(email)).sort();


console.info("Intersection:");
console.info(intersection.join("\n"));
console.info("\nList 1 exclusively:");
console.info(l1_exclusive.join("\n"));
console.info("\nList 2 exclusively:");
console.info(l2_exclusive.join("\n"));
