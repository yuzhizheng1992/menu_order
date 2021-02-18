var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB

router.get('/', function(req, res, next) {
  var nickname= req.session.name;
  res.render('signup.ejs', { title: '註冊會員',nickname:nickname });
});

router.post('/', function (req, res) {
    var user_id = req.body.user_id;
    var pwd = req.body.password;
    var pwd2 =  req.body.password2;
    var username = req.body.username;

    MongoClient.connect(url,function(err,db){
    var dbtest = db.db('test');
      if(err){
          console.log('連線資料庫錯誤:'+err);
          return;
      }
    
    // 判斷帳號是否已經存在
    dbtest.collection('test').find({'user_id':user_id}).toArray(
        function(error,result){
            if (error) throw error;
            if(result.length>0){
            res.send("<script> alert('此帳號已經存在');location.href='/signup' </script>")
            }
        }     
    )
    
    
    // 判斷兩次密碼是否相同
    if(pwd != pwd2){
    res.send("<script> alert('密碼不相同');location.href='/signup' </script>")
    }

    // 名稱不得為空
    if(username == ''){
      res.send("<script> alert('請輸入名稱');location.href='/signup' </script>")
    }

    //新增會員至DB
    dbtest.collection('test').insertOne({'user_id':user_id,'password':pwd,'name':username})
    .then(function(){
      req.session.user_id = user_id;
      req.session.password = pwd;
      req.session.name = username;
      res.redirect('/menu');
    })
    db.close()
  })
})
module.exports = router;

