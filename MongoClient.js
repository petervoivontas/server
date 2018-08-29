var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/nuntium';

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('nuntium');
    dbo.createCollection('users', (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Collection created');
    });
});