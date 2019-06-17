var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require("./db.json");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Для нормальной работы парсера
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// adress: localhost:3012/getpoll
//Возвращает опрос по id
app.get('/getpoll', function(req, res){
   var poll_id = req.query.id;
   for(var i = 0; i !== db.length; i++){
      if (db[i].id == poll_id){
         res.send(db[i]);
         return;
      }
   }
   res.send({ok: false});
});

// adress: localhost:3012/addanswer
//Имитирует отправку ответов в бд
app.put('/addanswer', function(req, res){
   console.log(req.body);
   res.send({ok: true});
});

//Запуск сервера на 3012 порту
app.listen(3012, function(){
   console.log("Server started on 3012 port");
});
