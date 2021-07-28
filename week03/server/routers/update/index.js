const express = require('express');
const router = express.Router();
const fs = require('fs');
const { generatorHtml } = require('../../utils/genHtml.js');
const { genPath } = require('../../utils/filePath.js');
const kv = require('../../constant/kv');
const {
  JSON_PATH,
} = require('../../constant/tpath');
const md5File = require('md5-file');

const execFile = ({ sse, path, mime, data, record }) => {
    // 重写 index.css | index.js 文件
    fs.writeFileSync(path, data, { encoding: 'utf-8' });
    const hash = md5File.sync(path);
    // 生成待提供的 可更新 文件
    fs.copyFileSync(path, genPath([hash, mime]));
    console.log('update', hash, mime);
    // 更新 record
    record[mime] = hash;
    // 更新 文件id
    fs.writeFileSync(JSON_PATH, JSON.stringify(record));
    console.log('record', record);
    if (mime === 'html') {
      generatorHtml(data, mime, record, sse)
    } else if (mime === 'js'){
      const content = fs.readFileSync(genPath([record.html,'html']), { encoding: 'utf-8' });
      generatorHtml(content, 'html', record, sse)
    } else {
      // 通知更新 页面 css 的 href
      console.log('record', hash);
      sse.send(hash, mime);
    }
}

router.post('/', ({ body, app }, response) => {
    response.send('ok');
    const { sse } = app.locals;
    const { type, content } = body;
    const { path: temp, mime } = kv[type];
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
        fs.rmSync(genPath([id, mime]));
      }
    } else {
      // 初次使用，没有使用过 run 命令，直接 保存页面
      execFile({
        sse, path: temp, mime, data: content, record
      });
    }
})

module.exports = router;