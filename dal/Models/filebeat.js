const mongoose = require('mongoose');

const filebeatSchema = new mongoose.Schema({
    lastSync: Date,
    host: String,
    serviceName: String,
    filename: String
});

const filebeatTable = mongoose.model('filebeat', filebeatSchema, 'filebeat');

module.exports = filebeatTable;