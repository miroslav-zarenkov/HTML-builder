const fs = require("fs");
const path = require("path");
const process = require("process");

const folderPath = path.join(__dirname, "./files");
const copiedFolderPath = path.join(__dirname, "./files-copy");

fs.promises
  .rm(copiedFolderPath, { recursive: true, force: true })
  .then(function () {
    fs.promises
      .mkdir(copiedFolderPath, { recursive: true })
      .then(function () {
        process.stdout.write("Folder created\n");
        fs.promises.readdir(folderPath).then((files) => {
          files.forEach((file) => {
            const sourceFile = path.join(folderPath, file);
            const copiedFile = path.join(copiedFolderPath, file);
            fs.promises
              .copyFile(sourceFile, copiedFile)
              .then(() => process.stdout.write("File copied\n"))
              .catch((err) => {
                throw err;
              });
          });
        });
      })
      .catch((err) => {
        throw err;
      });
  })
  .catch((err) => {
    throw err;
  });
