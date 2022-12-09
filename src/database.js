const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = require('./config')
const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority&ssl=true`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Database is connected "))
    .catch(err => console.log(err))