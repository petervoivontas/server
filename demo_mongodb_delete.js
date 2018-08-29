var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

// Delete one document
MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    var myquery = {
        firstName: 'Peter'
    };
    dbo.collection('users').deleteOne(myquery, (err, obj) => {
        if (err) {
            throw err;
        }
        console.log('1 document deleted');
        db.close;
    });
});

// Delete many documents at once
MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    var myquery = {
        firstName: /^s/
    };
    dbo.collection('users').deleteMany(myquery, (err, obj) => {
        if (err) {
            throw err;
        }
        console.log(obj.result.n + ' document(s) deleted');
        db.close;
    });
});