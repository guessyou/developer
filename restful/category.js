/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

var util = require('util'),
    express = require('express'),
    mongoose = require('mongoose'),
    _ = require('underscore');

var Schema = mongoose.Schema;

//定义对象模型
var Aliases = new Schema({
    alias: String
});
var CategoryScheme = new Schema({
    //key: String,
    name: String,
    alias: [Aliases],   //别名
    slug: String,       //分类可用于路由
    icon: String,
    quality: Number,    //该分类下url数量
    rank: Number,       //排序/权重
    //_parent_id:  Schema.Types.ObjectId,
    
    add_time: Date,
    last_modified: Date,
});
var CategoryModel = mongoose.model('category', CategoryScheme);

var error = function(err){
    return function(){
        if(err){
            console.log(err);
            return;
        }
    }
};

/*
create
getAll
getOne
update
delete
**/

exports.getAll = function(req, res){
    return CategoryModel.find(function(err,category){
        error(err);
        res.send(category);
    });
};

/* test
jQuery.get('/api/books/',function(data, textStatus, jqXHR){
    console.log('Get response:');
    console.dir(data);
    console.log(textStatus);
    console.log(jqXHR);
})
**/


exports.create = function(req, res){
    var category = new CategoryModel({
        name: req.body.name,
        alias: req.body.alias,      //别名
        slug: req.body.slug,        //分类可用于路由
        icon: req.body.icon,
        quality: req.body.quality,  //该分类下url数量
        rank: req.body.rank,        //排序/权重
        //_parent_id:  Schema.Types.ObjectId,
        
        add_time: new Date().getTime(),
        last_modified: new Date().getTime(),
    });

    category.save(function(err){
        error(err);
        console.log('    category created');
        
    });
    return res.send(category);
};

/* test
jQuery.post('/api/books/', {
        'title': 'Javascript',
        'author': 'Douglas',
        'releaseDate': new Date(2008,4,1).getTime()
    }, function(data, textStatus, jqXHR){
    console.log('Post response:');
    console.dir(data);
    console.log(textStatus);
    console.log(jqXHR);
});
jQuery.post('/api/books/', {
        'title': 'Javascript',
        'author': 'Douglas',
        'releaseDate': new Date(2008,4,1).getTime(),
        'keywords': [
            {'keyword': 'Javascript'},
            {'keyword': 'Reference'}
        ]
    }, function(data, textStatus, jqXHR){
    console.log('Post response:');
    console.dir(data);
    console.log(textStatus);
    console.log(jqXHR);
})
**/


exports.getOne = function(req, res){
    var params = req.params.id;
    return CategoryModel.findById(params, function(err,category){
        error(err);
        res.send(category);
    })
};
/* test
jQuery.get('/api/books/552c86d4a94bf75016810aea',function(data, textStatus, jqXHR){
    console.log('Get response:');
    console.dir(data);
    console.log(textStatus);
    console.log(jqXHR);
})
**/


exports.update =  function(req, res){
    console.log('    Updating category ' + req.body.title);
    var params = req.params.id;
    return CategoryModel.findById(params, function(err,category){
        category.name = req.body.name,
        category.alias = req.body.alias,      //别名
        category.slug = req.body.slug,        //分类可用于路由
        category.icon = req.body.icon,
        //category.quality = req.body.quality,  //该分类下url数量
        category.rank = req.body.rank,        //排序/权重
        //_parent_id:  Schema.Types.ObjectId,
        
        //category.add_time = new Date().getTime(),
        category.last_modified = new Date().getTime(),

        return category.save(function(err){
            error(err);
            console.log('category updated');
            return res.send(category);
        })
        
    })
};
/* test
jQuery.ajax({
    url: '/api/books/552c86d4a94bf75016810aea',
    type: 'PUT',
    data: {
        'title': 'Javascript 111',
        'author': 'Douglas',
        'releaseDate': new Date(2008,4,1).getTime()
    },
    success: function(data, textStatus, jqXHR){
        console.log('Post response:');
        console.dir(data);
        console.log(textStatus);
        console.log(jqXHR);
    }
});
**/


exports.delete = function(req, res){
    console.log('    Deleting category with id: ' + req.params.id);
    var params = req.params.id;
    return CategoryModel.findById(params, function(err,category){
        return category.remove(function(err){
            error(err);
            console.log('    category removed');
            return res.send('');
        })
    })
};
/* test
jQuery.ajax({
    url: '/api/books/552c86d4a94bf75016810aea',
    type: 'DELETE',
    success: function(data, textStatus, jqXHR){
        console.log('Post response:');
        console.dir(data);
        console.log(textStatus);
        console.log(jqXHR);
    }
});
**/

// router.get('/help', staticController.help);
// router.get('/news', staticController.news);
// router.get('/about', staticController.about);



//module.exports = router;