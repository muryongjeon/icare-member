const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

app.listen(8080, function () {
    console.log('listening on 8080');
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/write', (req, res) => res.sendFile(__dirname + '/write.html'));

app.post('/add', (req, res) => console.log(req.body));
