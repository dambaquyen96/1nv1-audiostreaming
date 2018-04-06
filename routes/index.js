var express = require('express');
var router = express.Router();
var path = require('path');
const util = require('util');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

module.exports.index = router;

module.exports.tmpl = function (req, res) {
  var name = req.params.name;
  res.sendFile(path.join(__dirname, '../', 'views', name));
};

