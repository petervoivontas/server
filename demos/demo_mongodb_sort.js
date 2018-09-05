var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

// Sort ascending
MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    var mysort = {
        firstName: 1
    };
    dbo.collection('users').find().sort(mysort).toArray((err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        db.close;
    });
});

// Sort descending
MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    var mysort = {
        firstName: -1
    };
    dbo.collection('users').find().sort(mysort).toArray((err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        db.close;
    });
});