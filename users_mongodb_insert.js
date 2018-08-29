const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

exports.insertUsers = (newUser) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            throw err;
        }
        const dbo = db.db('nuntium');
        dbo.collection('users').insertOne(newUser, (err, res) => {
            if (err) {
                throw err;
            }
            console.log('1 user signed up', newUser);
            db.close;
        });
    });
}

