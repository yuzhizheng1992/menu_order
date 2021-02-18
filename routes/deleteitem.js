var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB
var mongo = require('mongodb')


router.get('/',function(req,res){
  var id = req.query.id
  var resName = req.query.Res;
  var menuDate = req.query.Date;
  var menuTime = req.query.Time;
  MongoClient.connect(url, function(err,db){
    var dbtest = db.db('test');
    if(err){
        console.log('連線資料庫錯誤:'+err);
        return;
    }
    dbtest.collection('orderlist').deleteOne({_id:new mongo.ObjectID(id)})
    .then(function(){
      res.redirect('/menu?Res=' + resName+'&Date='+menuDate+'&Time='+menuTime);
    }
    )
  })
})

  module.exports = router;