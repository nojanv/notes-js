console.log('Starting server...');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://admin:admin@ds141406.mlab.com:41406/notes-app-quotes', (err, client) => {
  // ...start the server
  if (err) return console.log(err);

  db = client.db('notes-app-quotes');
  app.listen(3000, function() {
    console.log('listening on 3000');
  });
  app.get('/', (req, res) => {
    let cursor = db.collection('quotes').find();
    res.render(view, locals);
  });

});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', {quotes: result});
  });
  // res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});

app.put('/quotes', (req, res) => {
  console.log('Replacing Nouzhan\'s post');
  db.collection('quotes')
    .findOneAndUpdate({ name: 'Nouzhan' }, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
        sort: {_id:-1},
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});

app.delete('/quotes', (req, res) => {
  console.log('Deleting Sepehr\'s post');
  db.collection('quotes').findOneAndDelete({ name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({message: `Sepehr's first message was deleted.`});
    });
});
