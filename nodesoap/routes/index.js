var express = require('express');
var router = express.Router();

var soap = require('soap');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/call', function(req, res) {
  var url = 'http://wsf.cdyne.com/WeatherWS/Weather.asmx?wsdl';
  console.log(req.body.zip);
  var args = { ZIP: req.body.zip };
  soap.createClient(url, function(err, client) {

    client.GetCityForecastByZIP(args, function(err, result) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      if ( result.GetCityForecastByZIPResult.Success )
        res.send({ 
          "success": true, 
          "forecasts": result.GetCityForecastByZIPResult.ForecastResult,
          "city": result.GetCityForecastByZIPResult.City,
          "state": result.GetCityForecastByZIPResult.State
        });

      else 
        res.send({ "success": false })

    });
  });
})

module.exports = router;
