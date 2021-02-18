var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB
const { body, validationResult } = require('express-validator');

router.post('/',[body('num','請輸入數量').isNumeric()],function(req,res){
    var userName = req.session.userid;
    var resName = req.query.Res;
    var menuDate = req.query.Date;
    var menuTime = req.query.Time;    
    var splitevalue = req.body.selected_item.split(',') //將select中的名稱與價格分開
    var item = splitevalue[0]; //名稱
    var price = splitevalue[1] //價格
    var itemNum = req.body.num; //數量
    
    

    // 以下檢查欄位正確性 //
    // 檢查有無選擇餐點 //
    if (item == '請選擇...'){
        return;
    }
    var checkError = validationResult(req);
    // 檢查數量有無填寫
    if (!checkError.isEmpty()) {   
        for(i=0;i<checkError.errors.length;i++){
            if(checkError.errors[i].msg == '請輸入數量'){
                return;
            }
        }
    }else{
    
            // 以下是新增餐點到資料庫 //
  
            MongoClient.connect(url,function(err,db){
            
            var dbtest = db.db('test');
            if(err){
            console.log('連線資料庫錯誤:'+err);
            return;
            }
            dbtest.collection('orderlist').insertOne({'user':userName,'restaurant':resName,'date':menuDate,'time':menuTime,'item':item,'num':itemNum, 'price':price*itemNum})
            .then(function(){                
                res.redirect('/menu?Res=' + resName+'&Date='+menuDate+'&Time='+menuTime);
            })
            .catch(function(e){
                console.log('Check:'+e);
            })
            ;
            })
        } 
      }
  )
  module.exports = router;