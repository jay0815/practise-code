const { genPath } = require('../utils/filePath');

const JAVASCRIPT_PATH = genPath(['index', 'js']);
const CSS_PATH = genPath(['index', 'css']);
const HTML_PATH = genPath(['index', 'html']);
const TEMP_HTML_PATH = genPath(['temp', 'html']);
const JSON_PATH = genPath(['record', 'json']);

module.exports = {
  JAVASCRIPT_PATH,
  CSS_PATH,
  HTML_PATH ,
  TEMP_HTML_PATH,
  JSON_PATH,
}