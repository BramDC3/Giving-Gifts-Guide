var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Gift = mongoose.model('Gift');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('server works');
});

router.param('gift', function(req, res, next, id) {
  let query = Gift.findById(id);
  query.exec(function (err, gift){
    if (err) { return next(err); }
    if (!gift) { return next(new Error('not found ' + id)); }
    req.gift = gift;
    return next();
  });
});

/* GET all gifts */
router.get('/API/gifts/', function(req, res, next) {
  Gift.find(function(err, gifts) {
    if (err) { return next(err); }
    res.json(gifts);
  });
});

/* GET gift with id */
router.get('/API/gift/:gift', function(req, res, next) {
  res.json(req.gift);
});

/* POST new gift */
router.post('/API/gifts/', function(req, res, next) {
  let gift = new Gift(req.body);
  gift.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
});

/* DELETE gift with id */
router.delete('/API/gift/:gift', function(req, res, next) {
  req.gift.remove(function(err) {
    if (err) { return next(err); }   
    res.json("removed gift");
  });
})

module.exports = router;
