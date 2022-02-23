const url = require('../config').mongoConnectionString;
const database = require('../config').database;
const filebeatTable = require('./Models/filebeat');
const logTable = require('./Models/log');
const mongoose = require('mongoose');

async function getlogs(host, serviceName, filename) {
    return new Promise((resolve, err) => {
        //   logTable.find()
        // console.log(`host: ${host}, servicename: ${serviceName}, filename: ${filename}`);
        if (host === undefined)
            console.log('host is undefined');

        var ho = host === undefined ? /^/ : host;

        filebeatTable.find({
            host: ho
        }, function (err, adminLogins) {
            if (err) return console.error(err);
            resolve(adminLogins);
        });
        // const result = filebeatTable.find({}).exec().then(() => {
        //     if (result !== null && result != undefined && result.length > 0) {
        //         console.log('received last sync date as ' + result[0].lastSync);
        //         resolve(result);
        //     } else {
        //         console.log('file not earlier synced');
        //         resolve(undefined);
        //     }
        // });
        // else {
        //       console.log(`returning undefined for params ${host}, ${serviceName},${filename}`);
        //       return undefined;
        //     }
    });
}
getlogs();