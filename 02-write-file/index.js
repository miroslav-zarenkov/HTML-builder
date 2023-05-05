const fs = require("fs");
const path = require("path");
const process = require("process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.output.write("Write your text:\n");
const filePath = path.join(__dirname, "text.txt");
fs.appendFile(filePath, "", (err) => {
  if (err) throw err;
});
rl.on("line", (input) => {
  if (input.toString().trim() === "exit") {
    process.exit();
  } else {
    fs.appendFile(filePath, input, (err) => {
      if (err) throw err;
    });
  }
});

rl.on("SIGINT", function () {
  process.exit();
});
process.on("exit", () => rl.write("Exiting program.\n"));
