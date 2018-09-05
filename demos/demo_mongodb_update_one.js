var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    var myquery = {
        firstName: 'Peter'
    };
    var newValues = {
        $set: {
            firstName: 'john',
            lastName: 'voivontas'
        }
    };
    dbo.collection('users').updateOne(myquery, newValues, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('1 docuument updated');
        db.close;
    });
});