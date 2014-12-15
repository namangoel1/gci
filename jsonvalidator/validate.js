var fs = require('fs');
var validate = require('./validator');

var file = process.argv[2];
var schema = process.argv[3];

console.log('');

if ( !schema || !file ) {
  console.log('Please enter a valid file and/or schema ');
  return false;
}

if ( !fs.existsSync(file) ) {
  console.log('Not a valid file');
  return false;
}

if ( !fs.existsSync(schema) ) {
  console.log('Not a valid schema');
  return false;
}

file = fs.readFileSync(file, "utf-8");
schema = fs.readFileSync(schema, "utf-8");


var result = validate(file, schema)

if ( result.errors.length ) {
  console.log('Errors:', result.errors.join('; '))
}

else {
  console.log('JSON is vaild!')
}