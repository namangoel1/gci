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
    
    
        mailer.send(email, function(error, info) {
    
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



## Mocking and stubbing

In Sinon, one way to mock a function is to create a stub. A stub is like a glorified spy, it can do everything that a spy can *and* it is able to modify the function itself.

The syntax to create a stub is:

    var stubFoo = sinon.stub(parentObject, 'childFunction', function() {
        // This holds what parentObject.childFunction() is replaced with
    });

We'll be stubbing the `mailer.send()` function, since we don't want it to *actually* send an email, but just check if it *can* send an email and if it has correct parameters. In the mock, we'll check if the arguments we receive match the arguments we supplied, if yes, we'll run the anonymous function that `mailer.send()` accepts as it's second argument.

    var mailerSpy = sinon.stub(mailer, 'send', function(arguments, callback) {
        // Compares test request body and actual body
        assert.equal( arguments.to, testRequest.body.to, 'To field does not match' );
        assert.equal( arguments.subject, testRequest.body.subject, 'Subject does not match' );
        assert.equal( arguments.text, testRequest.body.message, 'Message body does not match' );
        console.log('      - Given arguments match used arguments')
        
        // Runs the function we supply as the second argument in mailer.send();
        callback();
        
        return false;
    });


## Modifying

At the end of the callback, `res.render()` is called. We already have spied on `req.flash()` and we can check inside `res.render()`'s mock if it's value matches to 'Email sent successfully!'.

At the start, we supplied `testResponse` to `routers.rootPost()` in place of `res`. Hence, we need to create `testResponse.render()` in our test to mock `res.render()`. 

We create a new method in `testResponse`, `render`. Here we'll output the value of the second argument we found from our `testRequest.flash()` spy. It will either be an error or 'Email sent successfully'. We will check if it the latter, if so, the test is considered to have passed.

    testResponse = {
        render: function() {
            console.log( '      -', testRequest.flash.args[0][1] )
    
            assert.equal(testRequest.flash.args[0][1], 'Email sent sucessfully!')
            done();
        }
    }; 

## Wrapping it up

We run our test through Mocha, and if we seen a green ~~square root symbol~~ check mark that means the test passed. We successfully mocked two functions and spied on one. 