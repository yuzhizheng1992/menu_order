var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB
var mongo = require('mongodb')


router.post('/',function(req,res){
     
    var restauartName = req.body.restauartName; 
    var id = req.body.id;
    
            // 以下是刪除餐點 //
  
            MongoClient.connect(url,function(err,db){
        
            var dbtest = db.db('test');
            if(err){
            console.log('連線資料庫錯誤:'+err);
            return;
            }

            dbtest.collection('menu').deleteOne({'_id':new mongo.ObjectID(id)})
            .then(function(){
                    dbtest.collection('menu').find({'restaurant':restauartName}).toArray(
                        function(error,result){                            
                            if (error) throw error;
                            if(result.length>0){   
                                var data ={
                                    'success':true,
                                    'result':result,
                                    'message':'資料刪除成功'                            
                                }
                                res.send(data)                                  
                            }
                            if(result.length==0){
                                var data ={
                                    'success':true,
                                    'result':result,
                                    'message':'請新增品名'                            
                                }
                                res.send(data)  
                            }
                        }     
                    )
                })
                .catch(function(e){
                    console.log('Check:'+e);
                })
            }
            
            )
        }) 

  module.exports = router;

