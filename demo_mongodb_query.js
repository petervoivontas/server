var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    var query = {
        firstName: /^P/
    };
    dbo.collection('users').find(query).toArray((err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        db.close;
    });
});