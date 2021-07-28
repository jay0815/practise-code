const path = require('path');

const genPath = (location) => path.resolve(__dirname, `../static/${location.join('.')}`);

const getMiniVuePath = path.resolve(__dirname, `../min-vue/src/main.js`);

const getComponentFiles = path.resolve(__dirname, `../min-vue/src/components/HelloWorld.vue`);

module.exports = {
  genPath,
  getMiniVuePath,
  getComponentFiles
}

