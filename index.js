require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.DB_HOST , {useNewUrlParser: true, useUnifiedTopology: true});
//check connect
const db = mongoose.connection;
db.on('err', (err) => console.log(err));
db.once('open', () => console.log('Connected to Mongodb'));

const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

const users = require('./routes/user.routes');

// User route
app.use('/users', users);


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Book Store'
  })
});











app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))