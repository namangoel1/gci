var sinon = require('sinon');
var routes = require('../routes/index');
var mocha = require('mocha');

describe('/ request (post)', function(){
  this.timeout(100000);
  it('should return successfully', function(done){
    var testRequest = {};

    testRequest.body =  {
      to: 'mail@namanyayg.com',
      subject: 'Test', 
      text: 'Test',
    };

    testRequest.flash = sinon.spy();

    testResponse = {
      render: sinon.spy() //can fill this with spies to test
    }; 

    routes.rootPost(testRequest, testResponse);

    console.log( testRequest.flash.args  );

    if ( testResponse.render.called || testRequest.flash.called )
      done();
  });
});
