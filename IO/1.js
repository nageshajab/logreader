const filebeat = require('./filebeat');
const logManager = require('../dal/logManager');
const filebeatManager = require('../dal/filebeatManager');

filebeat();
// logManager.deleteAllData();
// filebeatManager.deleteAllData();
