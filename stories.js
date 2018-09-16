const express = require('express');
const storiesMongo = require('./topics_mongodb');

const storiesRouter = express.Router();

storiesRouter.get('/getStories', (req, res, next) => {
    storiesMongo.getStories();
    setTimeout(() => {
        res.send(storiesMongo.result);
    }, 1000);
});

storiesRouter.post('/uploadStory', (req, res, next) => {
    const newStory = {
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    }
    storiesMongo.insertStory(newStory);
    setTimeout(() => {
        if (publish.published) {
            res.send(true);
        } else {
            res.send(false);
        }
    }, 1000);
});

module.exports = storiesRouter;