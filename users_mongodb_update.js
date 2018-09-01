const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/nuntium';

exports.updateName = (query, newValue) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            throw err;
        }
        const dbo = db.db('nuntium');
        dbo.collection('users').updateOne(query, newValue, (err, res) => {
            if (err) {
                exports.result = 'Update failed';
                throw err;
            }
            exports.result = {
                name: newValue.name
            }
        });
    });
}

exports.updateEmail = (query, newValue) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) =>  {
        if (err) {
            throw err;
        }
        const dbo = db.db('nuntium');
        dbo.collection('users').updateOne(query, newValue, (err ,res) => {
            if (err) {
                exports.result = 'Update failed'
                throw err;
            }
            exports.result = {
                email: newValue.$set.email
            }
        });
    });
}

exports.updatePassword = (query, newValue) => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            throw err;
        }
        const dbo = db.db('nuntium');
        dbo.collection('users').updateOne(query, newValue, (err, res) => {
            if (err) {
                exports.result = 'Update failed';
                throw err;
            }
            exports.result = {
                password: newValue.$set.password
            }
            console.log(exports.result);
        })
    })
}