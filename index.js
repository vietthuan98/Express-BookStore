require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect(process.env.DB_HOST , {useNewUrlParser: true, useUnifiedTopology: true});


const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

const users = require('./routes/user.routes');

app.use('/users', users);


app.get('/', (req, res) => res.send('Hello World!'))











app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))