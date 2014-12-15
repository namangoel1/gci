var jsonvalidate = require('jsonschema').validate;

module.exports = function(file, schema) {
  var file = JSON.parse(file);
  var schema = JSON.parse(schema);

  return jsonvalidate( file, schema );
};

