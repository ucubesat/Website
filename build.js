const fs = require("fs");
const ncp = require('ncp').ncp;
const path = require("path");
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const babelify = require("babelify");
const watchify = require('watchify');
const browserify = require("browserify");
const browserifyShim = require("browserify-shim");

const argv = yargs(hideBin(process.argv)).argv;

// START Build options/paths

const srcDir = "src";
const distDir = "public/js/";
const mainJSPath = path.join(srcDir, "Main.js");
const bundleJSPath = path.join(distDir, "bundle.js");

// END Build options/paths

// Delete 'distDir'
if (fs.existsSync(distDir)) {
    console.info("Deleting contents of build directory: %s", distDir);
    fs.rmdirSync(distDir, {recursive: true});
}

fs.mkdirSync(distDir)

console.info("Browserifying...");
let iBrowserify = browserify(mainJSPath, {cache: {}, packageCache: {}});
applyTransforms(iBrowserify);
bundle();

if (argv.watchify) {
    console.info("Watching JS file: " + mainJSPath);

    iBrowserify.plugin(watchify);
    iBrowserify.on("update", bundle);
    iBrowserify.on('log', function (msg) {
        console.log(msg)
    });
}

function applyTransforms(iBrowserify) {
    iBrowserify.transform(babelify, {
        presets: ["@babel/preset-env"]
    }).transform(browserifyShim, {
        global: true
    })
}

function bundle() {
    iBrowserify.bundle().on("error", console.error).pipe(fs.createWriteStream(bundleJSPath));
}
