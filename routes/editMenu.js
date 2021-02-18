var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB

router.get('/',function(req,res){
    var nickname= req.session.name;
    MongoClient.connect(url, function(err,db){
        var dbtest = db.db('test');
        if(err){
            console.log('連線資料庫錯誤:'+err);
            return;
        }
        dbtest.collection('menu').find({}).toArray(function(error,result){
            if (error) throw error;
            if(result.length>0){
                var onlyName=[];
                for(i=0;i<result.length;i++){
                    onlyName[i] = result[i].restaurant
                    //console.log(onlyName[i])
                }
                var newName = new Set(onlyName);
                var NameBackToArray = [...newName]
                
                res.render('editMenu.ejs',{result:NameBackToArray,nickname:nickname})                 
            }else{
                console.log('測試'+result)
                res.send("<script> alert('請先新增菜單');location.href='/createMenu' </script>")
            }

        })
        
        
      })
    
})

router.post('/',function(req,res){
    var restauartName = req.body.rest_Name;
    res.redirect('createMenuItem?Name=' + restauartName);
})


module.exports = router;

