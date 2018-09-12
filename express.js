const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const signup = require('./users_mongodb_insert');
const login = require('./users_mongodb_get');
const update = require('./users_mongodb_update');
const publish = require('./topics_mongodb_publish');
const stories = require('./topics_mongodb_get');
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

app.get('/getStories', (req, res, next) => {
    stories.getStories();
    setTimeout(() => {
        res.send(stories.result);
    }, 1000);
})

app.post('/signup', (req, res, next) => {
    login.getUser(req.body.email);
    setTimeout(() => {
        if (login.result) {
            res.send('Account already exists. Log in instead.');
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                }
                signup.insertUsers(newUser);
                res.send(newUser);
            });
        }
    }, 2000);
});

app.post('/login', (req, res, next) => {
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
});

app.post('/updateName', (req, res, next) => {
    if (req.body.oldEmail && req.body.newName) {
        const query = {
            email: req.body.oldEmail
        }
        const newName = {
            $set: {
                name: req.body.newName
            }
        }
        update.updateName(query, newName);
        setTimeout(() => {
            res.send(update.result);
        }, 2000);
    }
});

app.post('/updateEmail', (req, res, next) => {
    if (req.body.oldEmail && req.body.newEmail) {
        const query = {
            email: req.body.oldEmail
        }
        const newEmail = {
            $set: {
                email: req.body.newEmail
            }
        }
        update.updateEmail(query, newEmail);
        setTimeout(() => {
            res.send(update.result);
        }, 2000);
    }
});

app.post('/updatePassword', (req, res, next) => {
    if (req.body.oldEmail && req.body.oldPassword && req.body.newPassword) {
        const query = {
            email: req.body.oldEmail,
        }
        bcrypt.compare(req.body.newPassword, req.body.oldPassword, (err, result) => {
            if (result) {
                res.send('Password is the same as before');
            } else {
                bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                    if (err) {
                        throw err;
                    } else {
                        const newPassword = {
                            $set: {
                                password: hash
                            }
                        }
                        update.updatePassword(query, newPassword);
                    }
                });
            }
        });
        setTimeout(() => {
            res.send(update.result);
        }, 2000);
    }
});

app.post('/uploadStory', (req, res, next) => {
    const newStory = {
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    }
    publish.insertStory(newStory);
    setTimeout(() => {
        if (publish.published) {
            res.send(true);
        } else {
            res.send(false);
        }
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});