var express = require('express');
var router = express.Router();
var configManager = require('../dal/configManager');

/* GET home page. */
router.get('/', function (req, res, next) {

  const bindData = async () => {
    // console.log('config route : in bind data');
    await configManager.list().then((data) => {
      //      console.log('1:' + data);
      res.render("./config/list", {
        data: data
      });
    });

  }
  bindData();

});

router.get('/getbyId/:id', function (req, res, next) {
  console.log(`config route : in get by id ${req.params.id}`);
  const returnData = async () => {
    await configManager.getbyId(req.params.id).then((data) => {

      console.log('route config, data returned from db:' + data);
      res.send(data);
    });
  }
  returnData();

});

router.post('/createOrUpdate', function (req, res, next) {
  // console.log(`req body i ${req.body.id}`);
  // console.log('req body is ' + JSON.stringify(req.body));
  try {
    if (req.body.id !== undefined && req.body.id !== null && req.body.id.toString().length !== 0) {
      console.log('updating');
      configManager.updateData(req.body.id, req.body.logfile, req.body.ReadUpto, req.body.servicename, req.body.host).then(() => {
        req.flash("success", "updated...");
        res.redirect('/config');
      });

    } else {
      console.log('creating');
      configManager.saveData(req.body.logfile, req.body.ReadUpto, req.body.servicename, req.body.host).then(() => {
        req.flash("success", "created...");
        res.redirect('/config');
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/delete', function (req, res, next) {
  console.log('req body is ' + req.body.id);
  try {
    configManager.deleteById(req.body.id).then(() => {
      req.flash("success", "Deleted...");
      res.redirect('/config');
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;