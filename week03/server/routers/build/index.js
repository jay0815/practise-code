const express = require('express');
const router = express.Router();
const { runWebPack } = require('../../utils/webpack-cmd.js');

router.post('/', ({ body, app }, response) => {
    response.send('ok');
    const { sse } = app.locals;
    const { type, content } = body;
    runWebPack(content, sse);
});

module.exports = router;
