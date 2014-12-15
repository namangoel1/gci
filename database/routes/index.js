var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = require('../config/dbconfig');
var Entry = mongoose.model('Entry', db.Entry);
mongoose.connect("mongodb://localhost:27017/gci-test")
var datab = mongoose.connection;

datab.on('error', function(err) {
  console.log(err);
})

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Google Code-In Student Repository', message: req.flash('info') });
});

router.post('/', function(req, res) {
  var submission = new Entry(req.body);
  console.log(submission);

  // ERROR CHECKING
  var errors = [];

  for ( var key in req.body ) {
    if ( req.body.hasOwnProperty(key) ) {
      if ( req.body[key] != submission[key] ) {
        errors.push(key);
      }
    }
  }

  if ( errors.length ) {
    req.flash('info', 'Hmm, ' + errors.join(', ') + ' seems invalid.');
  } 
  else {
    // No errors found :D
    submission.save(function(err, data) {
      if ( err ) return console.error(err);
      console.log(data);
    });
    req.flash('info', 'Successfully saved, thank you!')
  }

  res.redirect('/')
});

router.get('/list', function(req, res) {
  Entry.find(function( err, submissions ) {
    if ( err ) return console.error(err);
    console.log( submissions );
  });
  res.redirect('/')
});

module.exports = router;
