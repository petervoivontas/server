var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    dbo.collection('users').find({}, { _id: 0, firstName: 1, lastName: 1 }).toArray((err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        db.close;
    });
});