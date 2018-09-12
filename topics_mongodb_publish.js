const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/nuntium';

exports.insertStory = newStory => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            throw err;
        }
        const dbo = db.db('nuntium');
        dbo.collection('topics').insertOne(newStory, (err, res) => {
            if (err) {
                throw err;
            }
            console.log('1 new story has been published');
            exports.published = true;
            console.log(exports.published);
        })
    })
}