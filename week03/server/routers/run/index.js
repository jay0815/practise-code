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

router.post('/', ({ body, app }, response) => {
    response.send('ok');
    const { sse } = app.locals;
    let record = {
      js: '',
      css: '',
      html: ''
    };
    if (fs.existsSync(JSON_PATH)) {
      record = JSON.parse(fs.readFileSync(JSON_PATH));
    }
    for(const { type, content } of body) {
        const { path: temp, mime } = kv[type];
        fs.writeFileSync(temp, content, { encoding: 'utf-8' });
        const hash = md5File.sync(temp);
        fs.copyFileSync(temp, genPath([hash, mime]));
        record[mime] = hash;
        if (type === "html") {
          generatorHtml(content, mime, record, sse);
        }
    }
    // 更新 文件id
    fs.writeFileSync(JSON_PATH, JSON.stringify(record));
});

module.exports = router;
