var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    var dbo = db.db('mydb');
    var myobj = [
        {
            firstName: 'Peter',
            lastName: "Voivontas"
        },
        {
            firstName: 'dsfos',
            lastName: 'sdaff'
        },
        {
            firstName: 'sdhigfepfrj',
            lastName: 'dsfsdyfu'
        }
    ];
    dbo.collection('users').insertMany(myobj, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('1 document inserted');
        db.close;
    });
});