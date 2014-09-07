var express = require('express')
  , util = require('util')
  , open = require('open')
  , http    = require('http')
  , path    = require('path')
  , teslams = require('teslams')
  , body = require('body-parser')
  , request = require('request')
  , querystring = require('querystring');

var creds = require('./config.json');

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(body());
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

var yoAll = function(req, res){
  var options = {
    url: 'http://api.justyo.co/yoall/',
    method: 'POST',
    form: {
      'api_token': '78d1e8f7-e846-ad7a-d1fd-ec3b19e72365'
    }
  }

  var callback = function(err, resp, body){
    res.end(body)
  }
  request(options, callback)
}

var sendYo = function(req, res){
  
var options = {
  url: 'http://api.justyo.co/yo/',
  method: 'POST',
  form: {
    'api_token': '78d1e8f7-e846-ad7a-d1fd-ec3b19e72365',
    'username': req.body.username,
    'link': req.body.link }
  }
  var callback = function(err, resp, body){
    res.end(body)
  }
  console.log(options);
  request(options, callback);
}

var getYoer = function(req, res){
  
}

var yolocation = function(req, res){
  teslams.get_vid( { email: creds.username, password: creds.password }, function ( err, id ) {
  if (err)
    console.log(err);
  else
    console.log(id);
    teslams.get_drive_state( id , function(state){
      console.log(state)
    });
    res.send(200)
  });
}

app.post('/yoall', yoAll)
app.post('/yolocation', yolocation)
app.post('/yo', sendYo)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
  })
