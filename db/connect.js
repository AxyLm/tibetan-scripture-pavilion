//  连接数据库
var mongoose =require('mongoose')
var url = 'mongodb://w1:w1@localhost:27017/pavilion'
mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true})

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + url);
});

/**
* 连接异常
*/
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function (err) {
  console.log('Mongoose connection disconnected : ' + err);
})

module.exports = mongoose;
//连接数据库

// db.createUser({user:'magic',pwd:'magic161718',roles:['root']})
