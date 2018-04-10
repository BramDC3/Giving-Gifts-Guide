var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Gift = mongoose.model('Gift');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('server works');
});

/* GET all gifts */
router.get('API/gifts', function(req, res, next) {
  Gift.find(function(err, gifts) {
    if (err) { return next(err); }
    res.json(gifts);
  });
});

module.exports = router;
