var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    dbo.collection('users').findOne({}, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.firstName);
        db.close();
    });
});