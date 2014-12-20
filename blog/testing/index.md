# Mocking, Spying, and Stubbing

In test-driven development (TDD), mocking, spying, and stubbing are three important methods. Mocking allows checking functions without dependencies, increasing speed and reducing chances of error; spying allows to check the 'indirect output' of code; stubbing allows to simulate functions to reduce their complexity and increase speed for testing.

In the post, I'll be talking about testing through [Mocha](http://mochajs.org/) and [Sinon.JS](http://sinonjs.org/), both based on Node JS.

## The mailer

In this post we'll be discussing on running tests on a mailer function. This takes two arguments, `req` (request), and `res` (response). The function looks like this: 

    function rootPost(req, res) {
      var email =  {
        from: 'Fossasia <fossasia@fossasia.com>',
        to: req.body.to,
        subject: req.body.subject, 
        text: req.body.message,
      };
    
    
      mailer.send(email, function(error, info){
    
        if ( error ) {
            req.flash('info', error);
        } else {
            req.flash('info', 'Email sent sucessfully!');
        }
    
    
        res.render('index', { flash: req.flash('info') });
      });
    }

`req.body` contains all information of the email (subject, message, etc). 

The inner `mailer` function is what actually sends the email. It calls many dependencies, and we'll have to mock it for efficient testing. 

`req.flash()` gives useful information on if the mailer is sent or not. We'll need to spy on this method.

The function can be considered finished when it finally runs `res.render(...)`. We'll need to mock `res.render()` to check for that.

## Supplying arguments

The basic structure of our test will be as follows:

    var testRequest = {};
    
    testRequest.body =  {
      to: 'mail@namanyayg.com',
      subject: 'Test', 
      message: 'Test',
    };
    
    ...    
    
    testResponse = {
      render: function() {
        ...
      }
    }; 
    
    routes.rootPost(testRequest, testResponse); 
    // This is the rootPost function as above   

We'll be supplying `testRequest` and `testResponse` to the rootPost function. `testRequest.body` be an object with the email's info. 


## Spying 

Sinon.JS provides a `.spy()` method to create a test spy that records some basic information about the function it is spying on, how many times it's called, what arguments it was supplied with, etc. The `.spy()` method does not modify the function in question.

We'll be spying on an existing method, namely, the `req.flash()` method. At the end of the test, we'll need to check if the arguments passed to `req.flash()` contain 'Email Sent Successfully!' or not. If not, the the function has failed and there's some problem in the test.

Create a spy is simple - You simply use the `sinon.spy()` method. Since we need to spy on `req.flash()`, we'll do this:

    testRequest.flash = sinon.spy();

With this one-liner, we'll be able to check if the arguments passed to `testRequst.flash()` have 'Email sent successfully!' or not.

 