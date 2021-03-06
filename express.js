const bodyParser = require('body-parser');
const usersRouter = require('./users');
const storiesRouter = require('./stories');
const express = require('express');
const app = express();

const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Cache-control", "no-cache, no-store");
    next();
});

app.use('/users', usersRouter);
app.use('/stories', storiesRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});