var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var nickname= req.session.name;
  res.render('index', { title: 'Express',nickname:nickname });
});

module.exports = router;
