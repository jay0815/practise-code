const {
  JAVASCRIPT_PATH,
  CSS_PATH,
  HTML_PATH ,
} = require('./tpath');
const kv = {
  javascript: {
    mime: "js",
    path: JAVASCRIPT_PATH,
    prefix: "index",
  },
  css: {
    mime: "css",
    path: CSS_PATH,
    prefix: "index",
  },
  html: {
    mime: "html",
    path: HTML_PATH,
    prefix: "index",
  }
}

module.exports = kv;