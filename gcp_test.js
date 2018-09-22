const express = require('express');
const app = express();

const PORT = 4000;

app.get('/test', (req, res, next) => {
    res.send('Hello world');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})