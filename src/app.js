const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
//---------------------------End imports-----------------------------//

//Initializacion
const { SECRET_CODE, ORIGIN_URL } = require('./config')
require('./database');
require('./passport/local-auth')

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ORIGIN_URL,
    credentials: true
}));
app.use(
    session({
        secret: SECRET_CODE,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/index'))

//models
const { findOrCreateDocument, findByIdAndUpdate } = require('./controller/controller');

//Socket.io
io.on('connection', socket => {
    socket.on('get-document', async data => {
        const documentId = data.documentId;
        const document = await findOrCreateDocument(documentId, data.email);
        socket.join(documentId);
        socket.emit('load-document', { data: document.data, title: document.title, email: document.email });

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })

        socket.on('new-title', title => {
            socket.broadcast.to(documentId).emit('change-title', title);
        })

        socket.on('save-document', async doc => {
            await findByIdAndUpdate(documentId, { data: doc.data, title: doc.title });
        })
    })
})

module.exports = server