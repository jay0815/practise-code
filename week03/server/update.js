const fs = require('fs');
const { generatorHtml } = require('./generatorHtml.js');
const { generatorPath } = require('./utils/filePath.js');
const md5File = require('md5-file');

const JAVASCRIPT_PATH = generatorPath(['index', 'js']);
const CSS_PATH = generatorPath(['index', 'css']);
const HTML_PATH = generatorPath(['index', 'html']);
const TEMP_HTML_PATH = generatorPath(['temp', 'html']);

const JSON_PATH = generatorPath(['record', 'json']);

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

const generatorIndexHtml = (data, record) => {
    const res = generatorHtml({
      html: data,
      js: record.js || void 0,
      css: record.css || void 0,
    })
    fs.writeFileSync(TEMP_HTML_PATH, res, { encoding: 'utf-8' });
    const hash = md5File.sync(TEMP_HTML_PATH);
    fs.copyFileSync(TEMP_HTML_PATH, generatorPath(['index', hash, mime]));
    fs.rmSync(TEMP_HTML_PATH);
    sse.send(hash, mime);
}

const execFile = ({ sse, path, mime, data, record }) => {
    // 重写 index.css | index.js 文件
    fs.writeFileSync(path, data, { encoding: 'utf-8' });
    const hash = md5File.sync(path);
    // 生成待提供的 可更新 文件
    fs.copyFileSync(path, generatorPath([hash, mime]));
    if (mime === 'html') {
      generatorIndexHtml(data, record)
    } else {
      // 通知更新 页面 js 的 src 或者 css 的 href
      sse.send(hash, mime);
    }
    // 更新 record
    record[mime] = hash;
    // 更新 文件id
    fs.writeFileSync(JSON_PATH, JSON.stringify(record));
}

const update = (_) => ({ body, app }, response) => {
    response.send('ok');
    const sse = app.locals.see;
    const { type, content } = body;
    const { path: temp, mime, prefix } = kv[type];
    let record = {
      js: '',
      css: '',
      html: ''
    };
    if (fs.existsSync(JSON_PATH)) {
      record = JSON.parse(fs.readFileSync(JSON_PATH));
    }
    const id = record[mime];
    // 存在 对应的 旧文件
    if (id) {
      // 内容比较
      const old = fs.readFileSync(temp, { encoding: 'utf-8' });
      if (old !== content) {
        execFile({
          sse, path: temp, mime, data: content, record
        })
        // 移除旧文件
        fs.rmSync(generatorPath([id, mime]));
      }
    } else {
      // 初次使用，没有使用过 run 命令，直接 保存页面
      execFile({
        sse, path: temp, mime, data: content, record
      });
    }
}
module.exports = {
  update
}