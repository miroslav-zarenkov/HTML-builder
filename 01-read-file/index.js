const fs = require("fs");
const path = require("path");
const process = require("process");

const filePath = path.join(__dirname, "text.txt");
const newReadStream = fs.createReadStream(filePath, "utf-8");
newReadStream.on("data", (data) => process.stdout.write(data));
