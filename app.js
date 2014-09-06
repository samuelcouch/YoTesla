var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , config = require('./config.js')
  , Yo = require('yoapi')
  , yo = new Yo({'api_token': config.YOAPIKEY })

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
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

var postYo = function(req, res){
  yo.yoAll(function(err, data){
  if(err){
    console.error(err);
  }else{
    console.info(data);
  }
  })
}

app.post('/yo', postYo)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
  })
