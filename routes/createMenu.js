var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB

router.get('/',function(req,res){
    var nickname= req.session.name;
    res.render('createMenu',{nickname:nickname});
})

router.post('/',function(req,res){
    var restauartName = req.body.rest_Name;
    res.redirect('createMenuItem?Name=' + restauartName);
})


module.exports = router;

