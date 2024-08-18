const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = require('./config')
let MONGODB_URI = ""

if (process.env.PRODUCTION) {
    MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority&ssl=true`;
} else {
    MONGODB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Database is connected"))
    .catch(err => console.log(err))