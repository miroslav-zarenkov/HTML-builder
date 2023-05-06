const fs = require("fs");
const path = require("path");
const process = require("process");

const folderPath = path.join(__dirname, "./secret-folder");

fs.promises
  .readdir(folderPath, { withFileTypes: true })
  .then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        const fullName = file.name;
        const nameParts = fullName.split(".");
        const name = nameParts[0];
        const extension = path.extname(fullName).substring(1);
        const filePath = path.join(folderPath, fullName);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            throw err;
          }
          const fileSize = stats.size;
          const sizeInKb = (fileSize / 1024).toFixed(3);
          const finalString = `${name} - ${extension} - ${sizeInKb}kb\n`;
          process.stdout.write(finalString);
        });
      }
    });
  })
  .catch((err) => {
    throw err;
  });
