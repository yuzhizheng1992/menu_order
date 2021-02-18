var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB

router.get('/',function(req,res){
  var restauartName = req.query.Name;
  var nickname= req.session.name;
    //res.render('createMenuItem', { title: '新增品項', Name:restauartName });

    MongoClient.connect(url,function(err,db){
        
        var dbtest = db.db('test');
        if(err){
        console.log('連線資料庫錯誤:'+err);
        return;
        }
    dbtest.collection('menu').find({'restaurant':restauartName}).toArray(
        function(error,result){
            if (error) throw error;
 
                res.render('createMenuItem', { title: '新增品項', Name:restauartName,'result':result,nickname:nickname });                                
            
        }     
    )
    })
})

router.post('/',function(req,res){
     
    var item1 = req.body.item1; //品名
    var price1 = req.body.price1; //價格
    var unit1 = req.body.unit1; //單位
    var num1 = req.body.num1; //數量
    var restauartName = req.body.restauartName;   

   
            // 以下是新增餐點到資料庫 //
  
            MongoClient.connect(url,function(err,db){
        
            var dbtest = db.db('test');
            if(err){
            console.log('連線資料庫錯誤:'+err);
            return;
            }

            // 判斷欄位是否空白
            if(item1.length==0 || num1.length==0 || unit1.length==0 || price1.length==0){
                var data ={
                    'success':false,                                
                    'message':'欄位不得為空白'                            
                }
                res.send(data)  
            }else{                
                // 判斷餐點是否已經存在
                dbtest.collection('menu').find({'restaurant':restauartName,'item':item1}).toArray(
                    function(error,result){
                        if (error) throw error;
                        if(result.length>0){                        
                            var data ={
                                'success':false,                                
                                'message':'相同品名已存在'                            
                            }
                            res.send(data)                         
                        }
                    }     
                )
                // 寫入資料庫 之後 傳送資料到前端
                dbtest.collection('menu').insertOne({'restaurant':restauartName,'item':item1, 'num':num1, 'unit':unit1, 'price':price1})
                .then(function(){
                    dbtest.collection('menu').find({'restaurant':restauartName}).toArray(
                        function(error,result){
                            if (error) throw error;
                            if(result.length>0){   
                                var data ={
                                    'success':true,
                                    'result':result,
                                    'message':'資料傳輸成功'                            
                                }
                                res.send(data)                                  
                            }
                        }     
                    )


                
                    //res.redirect('/createMenuItem?Name='+ restauartName);
                })
                .catch(function(e){
                    console.log('Check:'+e);
                })
            }
            
            }) 
        } 
      
  )

  

  module.exports = router;

