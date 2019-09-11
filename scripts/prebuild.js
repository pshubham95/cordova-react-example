const path = require('path');
const { exec } = require('child_process');
const ex = require('./exec');

module.exports = () => {
  const projectPath = path.resolve(process.cwd(), './node_modules/.bin/react-scripts');
  return new Promise((resolve, reject) => {
    exec(`${projectPath} build`,
      (error) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }
        ex.exec(path.resolve(__dirname, '../build/'), path.join(__dirname, '../www/'))
          .then((s) => {
            console.log(s);
            resolve(s);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
  });
};
