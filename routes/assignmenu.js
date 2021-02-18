var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB

router.get('/', function (req, res) {
    var nickname= req.session.name;
    MongoClient.connect(url,function(err,db){
  
        var dbtest = db.db('test');
        var restaurantName=[];
  
        if(err){
          console.log('連線資料庫錯誤:'+err);
          return;
        }
        //查找餐廳名稱   
        dbtest.collection('menu').find({},{'restaurant':1}).toArray(  //由數據庫撈出餐廳資料 
        function(error,result){
          if (error) throw error;
          if(result.length>0){
            for(i=0;i<result.length;i++){
                restaurantName[i] = result[i].restaurant;
                //console.log(restarantName[i])
            }
            }else{
                  console.log('無資料');
          }
          var uniqueRestaurant = new Set (restaurantName) // 刪除重複的餐廳名稱
          var backtoRestaurantName = [...uniqueRestaurant]; // 回傳到array
          //console.log(restaurantName2)

          res.render('assignmenu',{title:'菜單指派',restaurantName:backtoRestaurantName, nickname:nickname})
        });

})

})


router.post('/', function (req, res) {
    
    var orderDate = req.body.date; //日期
    var orderTime = req.body.time; //時間
    var shopName = req.body.selectRestaurant  //指定的餐廳

    MongoClient.connect(url,function(err,db){
        var dbtest = db.db('test');        

        if(err){
          console.log('連線資料庫錯誤:'+err);
          return;
        }

        dbtest.collection('assignMenu').insertOne({'Status':0, 'Date':orderDate,'Time':orderTime, 'Restaurant': shopName})
    })
    res.redirect('pickmenu')


    
})



module.exports = router;
