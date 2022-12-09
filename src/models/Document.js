const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Document = new Schema({
    _id: String,
    title: String,
    email: String,
    data: Object
})

module.exports = mongoose.model('documents', Document);