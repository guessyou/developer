var mongoose = require('mongoose');

//数据库地址
var db_url = require("../config").db;

exports.connect = function(callback) {
    mongoose.connect(db_url);
}

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}