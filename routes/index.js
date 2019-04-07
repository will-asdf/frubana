'use strict';
var express = require('express');
var router = express.Router();

var p1 = require('./../code/Problem1');
var p2 = require('./../code/Problem2');

router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/problem1', function (req, res) {
    res.render('problem1', { title: 'Problema 1' });
});

router.get('/problem2', function (req, res) {
    res.render('problem2', { title: 'Problema 2' });
});

router.post('/resolveproblem1', function (req, res) {
    var params = req.body;
    p1.resolve(res, params);
});

router.post('/resolveproblem2', function (req, res) {
    var params = req.body;
    p2.resolve(res, params);
});

module.exports = router;
