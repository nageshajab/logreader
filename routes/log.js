var express = require('express');
var router = express.Router();
var logManager = require('../dal/logManager');

/* GET home page. */
router.get('/', function (req, res, next) {

  const bindData = async () => {
    console.log('log route: in bind data');
    await logManager.getlogs().then((data) => {
    //  console.log('1:' + data);
      res.render("./log/list", {
        data: data
      });
    });

  }
  bindData();

});
module.exports = router;