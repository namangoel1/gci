var express = require('express');
var router = express.Router();
var translate = require('yandex-translate');
var apik = 'trnsl.1.1.20141211T050141Z.23757032cb4be759.d93bd18aa928642bdb724efb690f8204c9e15fb4'

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });


});

router.post('/', function(req, res) {
  var response = {}

  function respond (response) {
    res.send( response );
  }

  translate(req.body.text, { to: req.body.lang1, key: apik }, function(err, res) {
    if ( err ) console.log( err );
    response.text1 = res.text[0];

    translate(response.text1, { from: req.body.lang1, to: req.body.lang2, key: apik }, function(err, res) {
      if ( err ) console.log( err );
      response.text2 = res.text[0];

      translate(response.text2, { from: req.body.lang2, to: req.body.lang3, key: apik }, function(err, res) {
        if ( err ) console.log( err );
        response.text3 = res.text[0];

        translate(response.text3, { from: req.body.lang3, to: 'en', key: apik }, function(err, res) {
          if ( err ) console.log( err );
          response.eng = res.text[0];

          respond ( response );
        });
      });
    });
  });
});



module.exports = router;
