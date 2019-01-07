var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'users-list.html'));
});

router.get('/new', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'users-new.html'));
});

router.get('/edit', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'users-new.html'));
});

module.exports = router;
