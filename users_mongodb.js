const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/nuntium';

exports.getUser = email => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            throw err;
        }
        const dbo = db.db('nuntium');
        const query = {
            email: email
        }
        dbo.collection('users').find(query).toArray((err, result) => {
            if (err) {
                throw err;
            }
            console.log(result);
            exports.result = result[0];
            db.close();
            return result;
        });
    });
}

exports.insertUsers = newUser => {
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