const Mongoclient = require('mongodb').MongoClient;
const url = 'mongodb+srv://peter:203050@nuntiumdb-ox3rt.gcp.mongodb.net/test?retryWrites=true';

Mongoclient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) {
        throw err;
    }
    const dbo = db.db('nuntium');
    dbo.collection('users').insertOne({name: 'peter'}, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('1 document added');
        db.close;
    })
})