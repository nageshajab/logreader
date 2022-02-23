const configTable = require('./Models/config');
const mongoose = require('mongoose');
const logger = require('../logger');
const {
  config
} = require('winston');
var ObjectId = require('mongodb').ObjectID;

const list = async () => {
  try {
    const result = await configTable.find({}).exec();
    //  console.log(result);
    return result;
  } catch (error) {
    return error;
  }
}

const getbyId = async (id) => {
  console.log(`dal configManager: querying by id ${id}`);
  try {
    const result = await configTable.find({
      _id: mongoose.Types.ObjectId(`${id}`)
    });

    console.log(JSON.stringify(result));
    return result;

  } catch (error) {
    console.error(`dal configManager: ${error}`);
    return error;
  }
}

async function updateData(id, logfile, readUpto, serviceName, host) {

  const filter = {
    _id: id
  };
  const update = {
    logfile: logfile,
    ReadUpto: readUpto,
    host: host,
    servicename: serviceName
  };

  // `doc` is the document _before_ `update` was applied
  let result = await configTable.findOneAndUpdate(filter, update)

  console.log(result);
}

async function saveData(logfile, readUpto, serviceName, host) {
  //console.log(`config manager save data id is ${id}`);
  let data = new configTable({
    _id:  mongoose.Types.ObjectId(),
    logfile: logfile,
    ReadUpto: readUpto,
    host: host,
    servicename: serviceName
  });
  const result = await data.save();
  console.log(result);
}

const deleteById = async (id) => {
  try {

    configTable.deleteOne({
      _id: new mongoose.Types.ObjectId(id)
    }, (err, result) => {
      if (err) console.log(err);
      else console.log(result)
    })
  } catch (err) {
    console.log(err);
  }
};

const deleteAllData = async () => {
  try {
    await configTable.deleteMany();
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

//saveData('logfile',3,'service1','host1');
//list();

module.exports = {
  deleteAllData,
  saveData,
  list,
  deleteById,
  getbyId,
  updateData
};