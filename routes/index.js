var express = require('express');
var router = express.Router();

var ticket = require('./ticket');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/ticket', ticket)

module.exports = router;
