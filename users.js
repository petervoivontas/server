const express = require('express');
const bcrypt = require('bcrypt');
const usersMongo = require('./users_mongodb');

const usersRouter = express.Router();

usersRouter.post('/signup', (req, res, next) => {
    usersMongo.getUser(req.body.email);
    setTimeout(() => {
        if (usersMongo.result) {
            res.send('Account already exists. Log in instead.');
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                }
                usersMongo.insertUsers(newUser);
                res.send(newUser);
            });
        }
    }, 2000);
});

usersRouter.post('/login', (req, res, next) => {
    usersMongo.getUser(req.body.email);
    setTimeout(() => {
        if (usersMongo.result) {
            bcrypt.compare(req.body.password, usersMongo.result.password, (err, comparisonResult) => {
                if (comparisonResult) {
                    res.send(usersMongo.result);
                } else {
                    res.status(404).send('Email and password do not match');
                }
            });
        } else {
            res.status(404).send('Email and password do not match');
        }
    }, 2000);
});

module.exports = usersRouter;