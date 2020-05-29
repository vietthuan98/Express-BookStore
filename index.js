require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST , {useNewUrlParser: true});


const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

const users = require('./routes/user.routes');

app.use('/users', users);


app.get('/', (req, res) => res.send('Hello World!'))











app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))