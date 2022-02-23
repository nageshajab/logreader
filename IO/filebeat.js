const fs = require('fs');
const config = require('./config');
const processDate = require('./processDate');
const processLineByLine = require('./processlinebyline');
const filebeatManager = require('../dal/filebeatManager');

function listfiles() {
    console.log('in listfiles method');
    return new Promise((resolve, reject) => {
        config.forEach(item => {
            console.log(`processing service logs for ${item.servicename}`);
            processServiceLog(item.logfile, item.host, item.servicename, item.ReadUpto);
        });
    });
}

function processServiceLog(errorLogFolderPath, host, serviceName, readUpTo) {

    const testFolder = errorLogFolderPath;
    fs.readdir(testFolder, (err, files) => {

        if (err)
            console.log(err);

        let i = 0;
        files.forEach(file => {
            if (i !== 0)
                return;
            var fullfilepath = testFolder + "/" + file;

            var stats = fs.statSync(fullfilepath);
            var mtime = stats.mtime;
            var time = processDate.getTimeInMilliseconds(readUpTo);

            var lastSyncDatefromDb;
            const getLastSyncDateFromDbSync = async () => {
                lastSyncDatefromDb = await filebeatManager.getLastSyncDateFromDb(host, serviceName, fullfilepath);
            }
            getLastSyncDateFromDbSync().then(() => {
                console.log(`mtime is ${mtime}\n lastSyncDateFromDb is ${lastSyncDatefromDb}`);

                if (mtime === lastSyncDatefromDb) {
                    console.log(`${fullfilepath} already synced`);
                }

                if (mtime.getTime() > time && mtime != lastSyncDatefromDb) {
                    //console.log(file + " " + mtime);
                    const processlinebyline = async () => {
                        await processLineByLine(fullfilepath);
                    }
                    processlinebyline();
                }
                filebeatManager.saveData(mtime, host, serviceName, fullfilepath);
                i = i + 1;

            });
        });
    });
}
module.exports = listfiles;