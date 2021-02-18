var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var ejs = require('ejs');
var url = 'mongodb://127.0.0.1:27017/test' //表示DB的地址與連接'test'這個DB
var bodyParser = require('body-parser');
var flash = require('express-flash')
var validator = require('express-validator');
var session = require('express-session');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login =  require('./routes/login');
var logout =  require('./routes/logout');
var signup = require('./routes/signup');
var menu = require('./routes/menu');
var additem = require('./routes/additem');
var deleteitem = require('./routes/deleteitem');
var assignmenu = require('./routes/assignmenu');
var createMenu = require('./routes/createMenu');
var editMenu = require('./routes/editMenu');
var createMenuItem = require('./routes/createMenuItem');
var deleteMenuItem = require('./routes/deleteMenuItem');
var pickMenu = require('./routes/pickMenu');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1)



app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false,
            maxAge:600*1000,        
  }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());



//route
app.use('/',indexRouter);
app.use('/login', login);
app.use('/signup', signup);


//檢查是否已經登入會員
app.use(function(req,res,next){
  if(req.session.userid){
    return next();
  }
  res.redirect('/login')
})

app.use('/menu', menu);
app.use('/additem', additem);
app.use('/deleteitem', deleteitem);
app.use('/logout', logout);
app.use('/assignmenu', assignmenu);
app.use('/createMenu', createMenu);
app.use('/editMenu', editMenu);
app.use('/createMenuItem', createMenuItem);
app.use('/deleteMenuItem', deleteMenuItem);
app.use('/pickMenu', pickMenu);



//傳遞登入資訊
/*app.post('/login',function(req,res){
  var userid = req.body.userid;
  var password = req.body.password;

 MongoClient.connect(url,function(err,db){
  var dbtest = db.db('test');
  
      if(err){
        console.log('連線資料庫錯誤:'+err);
        return;
      }
      //查找會員資料    
      dbtest.collection('test').find({'user_id':req.body.user_id,'password':req.body.password}).toArray(  //由數據庫撈出有無資料
      function(error,result){
        if (error) throw error;
        if(result.length>0){
          console.log('登入成功')
        }else{
          res.send("<script> alert('帳號密碼錯誤');location.href='/login' </script>");
        }
        db.close();
      });
 })
}) */


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
