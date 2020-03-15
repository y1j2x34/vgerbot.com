const path = require('path');
const childProcess = require('child_process');
const phantomjs = require('phantomjs-prebuilt')

const binPath = phantomjs.path;
console.info(phantomjs.path);
childProcess.execFile(binPath, [
    path.join(__dirname, 'crawl.js')
], function(err, stdout, stderr) {
    console.info(err, stdout, stderr);
});
