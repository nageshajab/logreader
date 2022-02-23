const url = require('../config').mongoConnectionString;
const database = require('../config').database;
const filebeatTable = require('./Models/filebeat');
const mongoose = require('mongoose');

async function getLastSyncDateFromDb(host, serviceName, filename) {
  return new Promise((resolve,err) => {
   // console.log(`host: ${host}, servicename: ${serviceName}, filename: ${filename}`);
    const result = filebeatTable.find({
      $and: [{
          host: {
            $eq: host
          }
        },
        {
          serviceName: {
            $eq: serviceName
          }
        },
        {
          filename: {
            $eq: filename
          }
        }
      ]
    }).exec().then(() => {
      if (result !== null && result !== undefined && result.length > 0) {
        console.log('received last sync date as ' + result[0].lastSync);
        resolve(result);
      } else {
        console.log('file not earlier synced');
        resolve(undefined);
      }
    });
    // else {
    //       console.log(`returning undefined for params ${host}, ${serviceName},${filename}`);
    //       return undefined;
    //     }
  });

}

async function saveData(lastSync, host, serviceName, filename) {
  var lastSyncDatefromDb = await getLastSyncDateFromDb(host, serviceName, filename);
  // console.log(`last sync date from db ${lastSyncDatefromDb}`);
  // console.log(`last sync date of file ${lastSync}`);

  if (lastSyncDatefromDb === lastSync) {
    console.log(`${filename} already synced`)
    return;
  }

  let data = new filebeatTable({
    lastSync: lastSync,
    host: host,
    serviceName: serviceName,
    filename: filename
  });
  const result = await data.save();
  console.log(result);

}

const deleteAllData = async () => {
  try {
    await filebeatTable.deleteMany();
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

//saveData();
module.exports = {
  getLastSyncDateFromDb,
  deleteAllData,
  saveData
};