const express = require('express');
const SSE = require('./utils/sse');
const update = require('./routers/update/index');
const run = require('./routers/run/index');
const build = require('./routers/build/index');

const app = new express();
const sse = new SSE(['hello!']);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(limiter);
app.locals.sse = sse;

app.all('*', (req, res, next) => {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Content-Type");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});

app.use(express.static(__dirname + '/static', {
  setHeaders: (res, filePath) => {
    if (filePath.includes('html')) {
      res.header("Content-Type", "text/html");
    }
    if (filePath.includes('js')) {
      res.header("Content-Type", "application/javascript");
    }
    if (filePath.includes('css')) {
      res.header("Content-Type", "text/css");
    }
  }
}));
app.get('/stream', sse.init);

app.use('/update', update);
app.use('/run', run);
app.use('/build', build);

app.listen(8848, "127.0.0.1");
