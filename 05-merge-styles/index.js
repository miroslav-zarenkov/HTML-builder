const fs = require("fs");
const path = require("path");
const process = require("process");

const stylesFolderPath = path.join(__dirname, "./styles");
const bundleFolderPath = path.join(__dirname, "./project-dist");
const bundleFilePath = path.join(bundleFolderPath, "bundle.css");

fs.promises.writeFile(bundleFilePath, "", (err) => {
  if (err) throw err;
});
fs.promises
  .readdir(stylesFolderPath, { withFileTypes: true })
  .then((files) => {
    const stylesFiles = files.filter(
      (file) => path.extname(file.name) === ".css"
    );
    stylesFiles.forEach((file) => {
      if (file.isFile()) {
        const styleFilePath = path.join(stylesFolderPath, file.name);
        const newReadStream = fs.createReadStream(styleFilePath, "utf-8");
        newReadStream.on("data", (data) =>
          fs.appendFile(bundleFilePath, `${data}\n`, (err) => {
            if (err) throw err;
          })
        );
      }
    });
    process.stdout.write("Created bundle.css\n");
  })
  .catch((err) => {
    throw err;
  });
