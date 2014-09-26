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
      'api_token': '272ed222-17ce-61a5-c928-6b61ced71e67'
    }
  }

  var callback = function(err, resp, body){
    res.end(body)
  }
  request(options, callback)
}

var sendYo = function(username, link){
  
var options = {
  url: 'http://api.justyo.co/yo/',
  method: 'POST',
  form: {
    'api_token': '272ed222-17ce-61a5-c928-6b61ced71e67',
    'username': username,
    'link': link }
  }
  var callback = function(err, resp, body){
    // res.end(body)
  }
  request(options, callback);
}

var getYoer = function(req, res){
  res.send(200);
  var username = req.query.username;
  yolocation(username, function(state) {
    var link = 'http://489d3686.ngrok.com/gmaps?lat=' + state.latitude + '&lon=' + state.longitude;
    sendYo(username, link);
  });
}

var yolocation = function(username, callback) {
  teslams.get_vid( { email: creds.username, password: creds.password }, function ( id ) {
    teslams.get_drive_state( id , callback);
  });
}

app.get('/', function(req, res){
  res.render('index')
})
app.post('/yoall', yoAll)
app.post('/yolocation', yolocation)
app.get('/getYoer', getYoer)
app.get('/tomtom', function(req, res){
  res.render('tomtom')
})
app.get('/gmaps', function(req, res){
  res.render('gmaps', {'lat': req.query.lat, 'lon': req.query.lon})
})


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
  })
