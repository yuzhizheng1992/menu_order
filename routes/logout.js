var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.userid='';
  req.session.name='';
  res.redirect('/login')
});

module.exports = router;
