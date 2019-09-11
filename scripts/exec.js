const fs = require('fs');
const rimraf = require('rimraf');

function renameOutputFolder(buildFolderPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    fs.rename(buildFolderPath, outputFolderPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Successfully built!');
      }
    });
  });
}

function exec(buildFolderPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(buildFolderPath)) {
      if (fs.existsSync(outputFolderPath)) {
        rimraf(outputFolderPath, (err) => {
          if (err) {
            reject(err);
            return;
          }
          renameOutputFolder(buildFolderPath, outputFolderPath)
            .then(val => resolve(val))
            .catch(e => reject(e));
        });
      } else {
        renameOutputFolder(buildFolderPath, outputFolderPath)
          .then(val => resolve(val))
          .catch(e => reject(e));
      }
    } else {
      reject(new Error('build folder does not exist'));
    }
  });
}

module.exports.exec = exec;
