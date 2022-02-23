const url = require('../config').mongoConnectionString;
const database = require('../config').database;
const logtable = require('./Models/log');
const mongoose = require('mongoose');

async function saveData(datetime, host, serviceName, level1, message, fullMsg) {
  const result = await logtable.find({
    fullMsg: fullMsg
  }).exec();
  console.log(result.length);
  if (result.length === 0) {
    let data = new logtable({
      datetime: datetime,
      host: host,
      serviceName: serviceName,
      level: level1,
      message: message,
      fullMsg: fullMsg
    });
    const result = await data.save();
    console.log(result);
  }
}

const deleteAllData = async () => {
  try {
    await logtable.deleteMany();
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

const getlogs = async (host, serviceName, filename, level) => {
  return new Promise((resolve, err1) => {
    host = host === undefined ? /^/ : host;
    serviceName = serviceName === undefined ? /^/ : serviceName;
    filename = filename === undefined ? /^/ : filename;
    level = level === undefined ? {
      $in: [0, 1, 2, 3, 4, 5, 6]
    } : level;

    var result = logtable.find({
      $and: [{
        host: host
      }, {
        serviceName: serviceName
      }, {
        level: level
      }]
    }, function (err, result) {
      if (err) {
        err1(err);
        return console.error(err);
      }
      console.log('getting records in logmanager.cs');
   //   console.log(result);
      //return result;
      resolve(result);
    });
  });
}
//getlogs();
module.exports = {
  saveData,
  deleteAllData,
  getlogs
};