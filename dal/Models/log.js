const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    datetime: Date,
    host: String,
    serviceName: String,
    level: Number,
    message: String,
    fullMsg: String
});

const logtable = mongoose.model('log', logSchema, 'logs');

module.exports = logtable;