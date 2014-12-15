var validator = require('../validator.js');
var fs = require('fs');
var assert = require('assert');

describe('Simple validation', function() {
  it('should validate a simple schema against a simple json object', function() {
    var result = validator(fs.readFileSync('./tests/test.json', 'utf-8'), fs.readFileSync('./tests/schema.json', 'utf-8'));
    assert.deepEqual(result.errors, []);
  });
});

describe('False-check validation', function() {
  it('should check against a false positive', function() {
    var result = validator('{"asd": "asd"}', fs.readFileSync('./tests/schema.json', 'utf-8'));
    assert.notDeepEqual(result.errors, [])
  });
});

describe('A complicated schema', function() {
  it('should validate against a complicated schema and data', function() {
    var result = validator(fs.readFileSync('./tests/complicated-data.json', 'utf-8'), fs.readFileSync('./tests/complicated-schema.json', 'utf-8'));
    assert.deepEqual(result.errors, []);
  });
});

describe('Real-life like data, complicated', function() {
  it('should validate against another complicated schema and data', function() {
    var result = validator(fs.readFileSync('./tests/catalog-data.json', 'utf-8'), fs.readFileSync('./tests/catalog-schema.json', 'utf-8'));
    assert.deepEqual(result.errors, []);
  });
});