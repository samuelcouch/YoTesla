var Yo = require('yoapi');
var config = require('../config.js')
var yo = new Yo('config.YOAPIKEY');

exports.index = function(req, res){
  res.render('index')
}

exports.postYo = function(req, res){
	y.yoAll(function(err, data){
	if(err){
		console.error(err);
	}else{
		console.info(data);
	}
	})
}
