var Yo = require('yoapi');
var config = require('../config.js')
var yo = new Yo(config.YOAPIKEY);

exports.postYo = function(req, res){
	yo.yoAll(function(err, data){
	if(err){
		console.error(err);
	}else{
		console.info(data);
	}
	})
}
