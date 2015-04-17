/*!
 * bookmarks
 * 网址收藏夹，书签管理
 */

var util = require('util'),
    express = require('express'),
    mongoose = require('mongoose'),
    _ = require('underscore');

var Schema = mongoose.Schema;

//定义对象模型
var Keywords = new Schema({
    keyword: String
});
var Book = new Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [Keywords]
});
var BookModel = mongoose.model( 'Book', Book );

var error = function(err){
    return function(){
        if(err){
            console.log(err);
            return;
        }
    }
};

/*
getAll
create
getOne
update
delete
**/

exports.getAll = function(req, res){
    return BookModel.find(function(err,books){
        error(err);
        res.send(books);
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
    var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords
    });

    book.save(function(err){
        error(err);
        console.log('    created');
        
    });
    return res.send(book);
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
    return BookModel.findById(params, function(err,book){
        error(err);
        res.send(book);
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
    console.log('    Updating Book ' + req.body.title);
    var params = req.params.id;
    return BookModel.findById(params, function(err,book){
        book.title = req.body.title;
        book.author = req.body.author;
        book.releaseDate = req.body.releaseDate;
        book.keywords = req.body.keywords;

        return book.save(function(err){
            error(err);
            console.log('book updated');
            return res.send(book);
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
    console.log('    Deleting Book with id: ' + req.params.id);
    var params = req.params.id;
    return BookModel.findById(params, function(err,book){
        return book.remove(function(err){
            error(err);
            console.log('    Book removed');
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
