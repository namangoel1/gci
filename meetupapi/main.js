var fs = require('fs');
var request = require('request');

var meetup = function() {
  var key = fs.readFileSync('api_key.txt', 'utf-8');
  var url = "https://api.meetup.com";

  var composeURL = function(root, object) {
    return root + '?' + JSON.stringify(object).replace(/":"/g, '=').replace(/","/g, '&').slice(2, -2)
  }

  var getEvent = function(params, callback) {
    params.key = key;

    request.get(composeURL(url + '/2/open_events', params), function(err, res, body) {
      if ( err ) {
        console.error(err);
        return false;
      }


      callback(JSON.parse(body)['results']);
    })
  }


  var postEvent = function(details, callback) {
    details.key = key;

    /*if ( !details.group_id || !details.group_urlname || !details.name ) {
      console.error('The group_id, group_urlname, and name fields are mandatory.')
    }*/

    request.post({
      headers: { 'content-type' : 'application/x-www-form-urlencoded' },
      url: url + '/2/event',
      form: details
    }, function(err, res, body) {
      callback(body);
    })
  }

  var parseEvent = function(mEvent) {
    var name = mEvent['name'] || '';
    var desc = mEvent['desc'] || '';
    var url = mEvent['url'] || '';

    if ( mEvent['venue'] ) {
      var city = mEvent['venue']['city'] || '';
      var lat = mEvent['venue']['lat'] || '';
      var lon = mEvent['venue']['lon'] || '';
    }
    
    if ( mEvent['group'] )
      var group = mEvent['group']['name'] || '';

    var parsed = '';

    if ( name ) parsed += 'Name: ' + name + '\n';
    if ( desc ) parsed += 'Description: ' + desc + '\n';
    if ( url ) parsed += 'Url: ' + url + '\n';
    if ( city ) parsed += 'City: ' + city + '\n';
    if ( lat ) parsed += 'Latitude: ' + lat + '\n';
    if ( lon ) parsed += 'Longitude: ' + lon + '\n';
    if ( group ) parsed += 'Group: ' + group + '\n';

    return parsed;

  };

  var parseEvents = function(results) {
    console.log('a');
    for ( var i = 0; i < results.length; i++ ) {
      console.log( parseEvent(results[i]) );
    }
  }

  return {
    getEvent: getEvent,
    parseEvents: parseEvents,
    postEvent: postEvent
  }
}



meetup().getEvent({
  topic: 'photo',
  city: 'nyc'
}, function(results) {
  meetup().parseEvents(results);
});


meetup().postEvent({
  // group_id: 1,
  // group_urlname,
  name: 'Tomato'
}, function(result) {
  console.log(result);
})