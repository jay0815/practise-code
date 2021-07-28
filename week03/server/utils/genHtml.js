const fs = require('fs');
const md5File = require('md5-file');
const { genPath } = require('./filePath.js');
const {
  TEMP_HTML_PATH,
} = require('../constant/tpath');

const htmlSymbol = "<!-- enerator html replace place -->";
const jsSymbol = "<!-- enerator js replace place -->";
const cssSymbol = "<!-- enerator css replace place -->";
const script = `<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.5/vue.global.prod.js"
    integrity="sha512-DwQZgAL3KOpcBrFz/18rWfLUc1H5pIK/SdBmN4eq35WPaK5TWrvR8ak8CXfdDewUWCAiEf03rbSIyrRmH7gr7Q=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script>
      // 接受父页面发来的信息
      window.addEventListener("message", (event) => {
        const data = event.data;
        const old = document.getElementById('css');
        const link = document.createElement('link');
        link.id = "css";
        link.href = "" + data.src +  ".css";
        link.rel = "stylesheet";
        link.type = "text/css";
        const head = document.getElementsByTagName('head')[0];
        head.removeChild(old);
        head.appendChild(link);
      });
  </script>`
const template = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  ${script}
  ${cssSymbol}
</head>
<body>
${htmlSymbol}
${jsSymbol}
</body>
</html>
`;

const genHtml = ({ html, js, css }) => {
  let res = template;
  if (html) {
    res = res.replace(htmlSymbol, html);
  }
  if (js) {
    res = res.replace(jsSymbol, `<script src="./${js}.js" id="js"></script>`);
  }
  if (html) {
    res = res.replace(cssSymbol, `<link href="./${css}.css" id="css" rel="stylesheet" type="text/css"/>`);
  }
  return res;
}

const generatorHtml = (data, mime, record, sse) => {
    const res = genHtml({
      html: data,
      js: record.js || void 0,
      css: record.css || void 0,
    })
    fs.writeFileSync(TEMP_HTML_PATH, res, { encoding: 'utf-8' });
    const hash = md5File.sync(TEMP_HTML_PATH);
    fs.copyFileSync(TEMP_HTML_PATH, genPath(['index', hash, mime]));
    fs.rmSync(TEMP_HTML_PATH);
    sse.send(hash, mime);
}

module.exports = {
  generatorHtml
}