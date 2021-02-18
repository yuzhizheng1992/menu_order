var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB

router.get('/', function (req, res) {
    var nickname= req.session.name;
    MongoClient.connect(url,function(err,db){
  
        var dbtest = db.db('test');
      
  
        if(err){
          console.log('連線資料庫錯誤:'+err);
          return;
        }
        //查找餐廳名稱   
        dbtest.collection('assignMenu').find({},{'status':1}).toArray(  //由數據庫撈出資料 狀態0
        function(error,result){
          if (error) throw error;               
            res.render('pickMenu',{title:'挑選點餐時段', result:result,nickname:nickname})            
        })
      })
    })
  


module.exports = router;
