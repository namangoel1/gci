var express = require('express');
var router = express.Router();
var whois = require('node-whois');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  whois.lookup(req.body.address, function(err, data ) {
    if ( err ) return false
    res.send({ lookupData: data });
  })
});

module.exports = router;
