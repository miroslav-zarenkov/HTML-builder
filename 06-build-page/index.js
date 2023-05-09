const fs = require("fs");
const path = require("path");
const process = require("process");

const distFolderPath = path.join(__dirname, "./project-dist");
const htmlFilePath = path.join(distFolderPath, "index.html");
const cssFilePath = path.join(distFolderPath, "style.css");
const assetsFolderPath = path.join(__dirname, "./assets");
const copiedFolderPath = path.join(distFolderPath, "./assets");

fs.promises.mkdir(distFolderPath, { recursive: true });
fs.promises.writeFile(htmlFilePath, "", (err) => {
  if (err) throw err;
});
fs.promises.writeFile(cssFilePath, "", (err) => {
  if (err) throw err;
});

async function copyFilesAndFolders(src, dest) {
  const items = await fs.promises.readdir(src, { withFileTypes: true });
  await fs.promises.mkdir(dest, { recursive: true });
  console.log(items);
  for (const item of items) {
    const sourcePath = path.join(src, item.name);
    const destinationPath = path.join(dest, item.name);
    if (item.isDirectory()) {
      await copyFilesAndFolders(sourcePath, destinationPath);
    } else {
      await fs.promises.copyFile(sourcePath, destinationPath);
      process.stdout.write(`File copied: ${sourcePath}\n`);
    }
  }
}

fs.promises
  .rm(copiedFolderPath, { recursive: true, force: true })
  .then(() => copyFilesAndFolders(assetsFolderPath, copiedFolderPath))
  .then(() => {
    process.stdout.write("All files and folders copied\n");
  })
  .catch((err) => {
    throw err;
  });

const stylesFolderPath = path.join(__dirname, "./styles");
const bundleFolderPath = path.join(__dirname, "./project-dist");
const bundleFilePath = path.join(bundleFolderPath, "style.css");
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
    process.stdout.write("Created style.css\n");
  })
  .catch((err) => {
    throw err;
  });
