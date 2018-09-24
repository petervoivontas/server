const express = require('express');
const app = express();

const PORT = 4000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Cache-control", "no-cache, no-store");
    next();
});

app.get('/test', (req, res, next) => {
    res.send('Hello world');
    console.log('Hello world');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})