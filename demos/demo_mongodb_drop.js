var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var  dbo = db.db('mydb');
    dbo.collection('users').drop((err, delOK) => {
        if (err) {
            throw err;
        }
        if (delOK) {
            console.log('Collection deleted');
            db.close;
        }
    });
});

// The same can be achieved with the dropCollection() method
MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var  dbo = db.db('mydb');
    dbo.dropCollection('users', (err, delOK) => {
        if (err) {
            throw err;
        }
        if (delOK) {
            console.log('Collection deleted');
            db.close;
        }
    });
});