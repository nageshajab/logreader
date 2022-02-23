const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    logfile: String,
    ReadUpto: Number,
    host: String,
    servicename: String
});

const configTable = mongoose.model('config', configSchema, 'config');

module.exports = configTable;