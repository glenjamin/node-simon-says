node-simon-says
===============

A basic DSL for async control flow in BDD-style tests

[![build status](https://secure.travis-ci.org/glenjamin/node-simon-says.png)](http://travis-ci.org/glenjamin/node-simon-says)

Install
-------

    npm install --save-dev simon-says

Usage
-----

```javascript
var simon = require('simon-says');

// with mocha, other test runners are available
describe('my application', function() {
    var world;
    beforeEach(function(done) {
        simon(world = {}, [
            prepareDatabase(),
            createUser('jen', 'password'),
        ], done);
    })

    it('should let me log in', function(done) {
        simon(world, [
            openHomepage(),
            submitLoginForm('jen', 'password'),
            assertResponseOk(),
            assertResponseContains('Hello jen')
        ], done);
    })
})

// Make your "step" functions return functions to change the world
function prepareDatabase() {
    return function(world, done) {
        world.db = new Database('localhost');
        db.init(done);
    }
}
function createUser(name, pass) {
    return function(world, done) {
        world.db.insert('users', {name: name, pass: pass}, done)
    }
}
function openHomepage() {
    return function(world, done) {
        request(BASE_URL + '/', function(err, response) {
            world.response = response;
            done(err);
        })
    }
}
// World-changing functions can be non-async too, if you like
function assertResponseOk() {
    return function(world) {
        assert.equal(world.response.statusCode, 200);
    }
}
```
