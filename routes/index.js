var express = require('express');
var router = express();
var path = require('path');
const util = require('util');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.engine('html', require('ejs').renderFile);
router.set('view engine', 'html')

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/data', function(req, res, next) {
	var room = 0;
	var username = 'user1';
	var name = 'Nguyen Van A';
	var address = '::ffff:192.168.31.252';
  res.render(path.join(__dirname, '../', 'views', 'data.html'), {
  	'room': req.body.room,
  	'username': req.body.username,
  	'name': req.body.name,
  	'address': req.body.address
  });
});

module.exports.index = router;

module.exports.tmpl = function (req, res) {
  var name = req.params.name;
  res.render(path.join(__dirname, '../', 'views', name));
};

