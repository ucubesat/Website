const fs = require("fs");
const ncp = require('ncp').ncp;
const path = require("path");
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

// START Build options/paths

const srcDir = "src";
const buildDir = "build";
const copyFileToBuildDirPaths = [
    path.join(srcDir, "index.html"),
    path.join(srcDir, "main.css"),
];
const copyDirectoryToBuildDirPaths = [];

// END Build options/paths

// Delete 'buildDir'
if (fs.existsSync(buildDir)) {
    console.info("Deleting contents of build directory: %s", buildDir);
    fs.rmdirSync(buildDir, {recursive: true});
}

fs.mkdirSync(buildDir)

// Copy files defined in 'copyFileToBuildDirPaths'
for (let pathIndex = 0; pathIndex < copyFileToBuildDirPaths.length; pathIndex++) {
    let fromPath = copyFileToBuildDirPaths[pathIndex];
    let toPath = path.join(buildDir, path.basename(fromPath));

    console.info("Copying file %s to %s", fromPath, toPath);

    fs.copyFileSync(fromPath, toPath);
}

// Copy directories recursively defined in 'copyDirectoryToBuildDirPaths'
for (let pathIndex = 0; pathIndex < copyDirectoryToBuildDirPaths.length; pathIndex++) {
    let fromPath = copyDirectoryToBuildDirPaths[pathIndex];
    let toPath = path.join(buildDir, path.basename(fromPath));

    console.info("Copying directory %s to %s", fromPath, toPath);

    ncp.ncp(fromPath, toPath, (err) => {
        if (err) throw err;
    });
}
