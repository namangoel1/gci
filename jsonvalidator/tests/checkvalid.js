var validator = require('../validator.js');
var fs = require('fs');
var assert = require('assert');

describe('Simple validation', function() {
  it('should validate a simple schema against a simple json object', function() {
    var result = validator(fs.readFileSync('test.json', 'utf-8'), fs.readFileSync('schema.json', 'utf-8'));
    assert.deepEqual(result.errors, []);
  });
});

describe('False-check validation', function() {
  it('should check against a false positive', function() {
    var result = validator('{"asd": "asd"}', fs.readFileSync('schema.json', 'utf-8'));
    assert.notDeepEqual(result.errors, [])
  });
});