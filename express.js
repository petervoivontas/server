const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const signup = require('./users_mongodb_insert');
const login = require('./users_mongodb_get');
const express = require('express');
const app = express();

const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/signup', (req, res, next) => {
    if (req.body.name && req.body.email && req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
            signup.insertUsers(newUser);
            res.send(newUser);
        });
    } else if (req.body.name === '') {
        res.status(404).send('Name cannot be empty');
    } else if (req.body.email === '') {
        res.status(404).send('Email cannot be empty');
    } else if (req.body.password === '') {
        res.status(404).send('Password cannot be empty');
    }
});

app.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        login.getUser(req.body.email);
        setTimeout(() => {
            if (login.result) {
                bcrypt.compare(req.body.password, login.result.password, (err, comparisonResult) => {
                    if (comparisonResult) {
                        res.send(login.result);
                    } else {
                        res.status(404).send('Email and password do not match');
                    }
                });
            } else {
                res.status(404).send('Email and password do not match');
            }
        }, 2000);
    } else if (req.body.email === '' && req.body.password === '') {
        res.send('Enter your account information');
    } else if (req.body.email === '') {
        res.send('Email cannot be blank');
    } else {
        res.send('Password cannot be blank');
    }
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});