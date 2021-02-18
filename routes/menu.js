var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB
var mongo = require('mongodb')

var list = [];

router.get('/',function(req,res){
    var resName = req.query.Res;
    var menuDate = req.query.Date;
    var menuTime = req.query.Time;
    var nickname = req.session.name;

    MongoClient.connect(url,function(err,db){
      var resName = req.query.Res;
      var dbtest = db.db('test');
      var restarantIFO;      
      

      if(err){
        console.log('連線資料庫錯誤:'+err);
        return;
      }

      
      //查找餐廳資料   
      dbtest.collection('menu').find({'restaurant':resName}).toArray(  //由數據庫撈出資料
      function(error,result){
        if (error) throw error;
        if(result.length>0){          
          restarantIFO = result;          
          }else{
                console.log('無資料');
        }
      });
    
      
      //呈現已經點餐的資料  
      
      dbtest.collection('orderlist').find().toArray(  //由數據庫撈出資料
      function(error,result){
        list = result;  //將結果存到list 之後若要刪除可根據id刪除        
        //console.log(list[0]._id);
        if (error) throw error;
          res.render('menu.ejs',{
            title:'點餐',
            restarantName:resName,
            list: restarantIFO,
            orderlist:result,
            name: req.session.name,
            menuDate:menuDate,
            menuTime:menuTime,
            nickname:nickname            
          })
               
        db.close();
      });
}) 
})

//傳送刪除餐點

module.exports = router;