const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/nuntium';

exports.getStories = () => {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            throw err;
        }
        const dbo = db.db('nuntium');
        dbo.collection('topics').find().toArray((err, res) => {
            if (err) {
                throw err;
            }
            console.log(res);
            exports.result = res;
        })
    });
}

// exports.resolveStories = () => {
//     return new Promise(() => {
//         MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
//             if (err) {
//                 throw err;
//             }
//             const dbo = db.db('nuntium');
//             dbo.collection('topics').find().toArray((err, res) => {
//                 if (err) {
//                     throw err;
//                 }
//                 console.log(res);
//                 exports.result = res;
//             })
//         });
//     })
// }