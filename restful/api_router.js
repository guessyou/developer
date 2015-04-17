/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var config = require("../config");

var bookmark = require("./bookmark");
var category = require("./category");
var tag = require("./tag");
// var site = require("./site");
// var category = require("./category");
// var article = require("./article");
// var list = require("./list");
// var tag = require("./tag");

// var config = require('../config'),
//     crypto = require('crypto'),
//     passport = require('passport');

router.get('/api', function(req, res){
    res.send('Api is running');
});

/*
Get    (select/get)
Post   (create)
Put    (update)
Patch  (update)
Delete (delete)
*/
var pre_path = '/api/';

var routes = [{
        path: 'sites',
        deal: bookmark
    },
    {
        path: 'category',
        deal: category
    },
    {
        path: 'tags',
        deal: tag
    }
];

//书签管理-网址收藏
router.post(  pre_path + routes[0].path,          routes[0].deal.create);
router.get(   pre_path + routes[0].path,          routes[0].deal.getAll);
router.get(   pre_path + routes[0].path + '/:id', routes[0].deal.getOne);
router.put(   pre_path + routes[0].path + '/:id', routes[0].deal.update);
router.delete(pre_path + routes[0].path + '/:id', routes[0].deal.delete);

//分类管理
router.post(  pre_path + routes[1].path,          routes[1].deal.create);
router.get(   pre_path + routes[1].path,          routes[1].deal.getAll);
router.get(   pre_path + routes[1].path + '/:id', routes[1].deal.getOne);
router.put(   pre_path + routes[1].path + '/:id', routes[1].deal.update);
router.delete(pre_path + routes[1].path + '/:id', routes[1].deal.delete);

//标签管理
router.post(  pre_path + routes[2].path,          routes[2].deal.create);
router.get(   pre_path + routes[2].path,          routes[2].deal.getAll);
router.get(   pre_path + routes[2].path + '/:id', routes[2].deal.getOne);
router.put(   pre_path + routes[2].path + '/:id', routes[2].deal.update);
router.delete(pre_path + routes[2].path + '/:id', routes[2].deal.delete);


module.exports = router;
