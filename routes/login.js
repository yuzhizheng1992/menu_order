var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB


router.get('/', function(req, res, next) {
  var nickname= req.session.name;
  res.render('login.ejs', { title: '登入會員',nickname:nickname });
});

router.post('/',function(req,res){

  var userid= req.body.user_id;
  var pwd= req.body.password;
  var name;


 MongoClient.connect(url,function(err,db){
  var dbtest = db.db('test');
  
      if(err){
        console.log('連線資料庫錯誤:'+err);
        return;
      }
      //查找會員資料    
      dbtest.collection('test').find({'user_id':req.body.user_id,'password':req.body.password}).toArray(
      function(error,result){
        if (error) throw error;
        if(result.length>0){
            req.session.userid = userid;
            req.session.password = pwd;
            name = result[0].name;
            req.session.name = name;
            res.redirect('/pickmenu');
        }else{
              res.send("<script> alert('帳號密碼錯誤');location.href='/login' </script>");
        }
        db.close();
      });
 })
}) 
module.exports = router;

