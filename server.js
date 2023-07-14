const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb+srv://amficare:amficare1234!@icare.krjhtnx.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (error, client) => {
    if (error) return console.log(error);

    db = client.db('icare-member');
    app.listen(8080, function () {
        console.log('listening on 8080');
    });
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/write', (req, res) => res.sendFile(__dirname + '/write.html'));

app.post('/join', (req, res) => {
    db.collection('counter').findOne({ name: 'totalMember' }, (error, result) => {
        var totalMember = result.totalMember;
        db.collection('member').insertOne({ _id: totalMember + 1 }, (error, result) => {
            db.collection('counter').updateOne({ name: 'totalMember' }, { $inc: { totalMember: 1 } }, (error, result) => {
                if (error) return console.log(error);
                res.json({ message: 'OK' });
            });
        });
    });
});

app.get('/list', (req, res) => {
    db.collection('member')
        .find()
        .toArray((error, result) => {
            res.json(result);
        });
});
