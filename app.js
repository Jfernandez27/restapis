const express = require('express');
const routes = require('./routes/routes');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');

//Connect Mongo
mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost/restapis', {})
    .then(() => {
        console.log('Connected to the Database');
    })
    .catch((err) => {
        console.log('Error! Not connected to the Database', err);
    });

//Create Server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Routes
app.use('/', routes());

// port
app.listen(5000);
