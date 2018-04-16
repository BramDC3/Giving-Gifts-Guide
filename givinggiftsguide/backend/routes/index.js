var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Gift = mongoose.model('Gift');
let Categorie = mongoose.model('Categorie');

let jwt = require('express-jwt');

let auth = jwt({secret: process.env.GIFT_BACKEND_SECRET});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('server works');
});

router.param('gift', function (req, res, next, id) {
  let query = Gift.findById(id).populate('categorieen');
  query.exec(function (err, gift) {
    if (err) { return next(err); }
    if (!gift) { return next(new Error('not found ' + id)); }
    req.gift = gift;
    return next();
  });
});

/* GET all gifts */
router.get('/API/gifts/', function (req, res, next) {
  let query = Gift.find().populate('categorieen');
  query.exec(function (err, gifts) {
    if (err) { return next(err); }
    res.json(gifts);
  });
});

/* GET gift with id */
router.get('/API/gift/:gift', function (req, res, next) {
  res.json(req.gift);
});

/* POST new gift */
router.post('/API/gifts/', function (req, res, next) {
  Categorie.create(req.body.categorieen, function (err, ctgn) {
    if (err) {
      return next(err);
    }
    let gift = new Gift({
      naam: req.body.naam,
      beschrijving: req.body.beschrijving,
      prijs: req.body.prijs
    });
    gift.categorieen = ctgn;
    gift.save(function (err, rec) {
      if (err) {
        Categorie.remove({ _id: { $in: gift.categorieen } });
        return next(err);
      }
      res.json(rec);
    });
  });
});

/* POST voeg categorie toe aan bestaande gift */
router.post('/API/gift/:gift/categorieen', auth, function (req, res, next) {
  let cat = new Categorie(req.body);

  cat.save(function (err, categorie) {
    if (err) return next(err);

    req.gift.categorieen.push(categorie);
    req.gift.save(function (err, rec) {
      if (err) {
        categorie.remove({ _id: { $in: gift.categorieen } });
        return next(err);
      }
      res.json(categorie);
    });
  });
});

/* DELETE gift with id */
router.delete('/API/gift/:gift', auth, function (req, res, next) {
  Categorie.remove({ _id: { $in: req.gift.categorieen } },
    function (err) {
      if (err) return next(err);
      req.gift.remove(function (err) {
        if (err) { return next(err); }
        res.json(req.gift);
      });
    });
});

module.exports = router;
