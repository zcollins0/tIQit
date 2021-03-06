var express = require('express');
var router = express.Router();

var controller = require('../controllers/ticket');

/* GET users listing. */
router.get('/', function(req, res) {
    res.redirect('/ticket/view-all')
});
router.get('/create', controller.create);
router.get('/view', controller.view);
router.get('/view-all', controller.view_all);

//Post for update
router.post('/update', controller.update);

/* POST users listing. */
router.post('/submit', controller.submit);

module.exports = router;
