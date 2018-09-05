const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/nuntium';

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) {
        throw err;
    }
    const dbo = db.db('nuntium');
    dbo.createCollection('users', (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Users collection created');
    });
});