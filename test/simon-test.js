var simon = require('..');

var assert = require('assert');

describe('some BDD tests', function() {
    describe('implicit world', function() {
        it('should execute functions in turn', function(done) {
            simon([
                prepareDatabase(),
                createUser('glen'),
                requestUserlist(),
                function(world) {
                    assert.deepEqual(world.response, ['glen'])
                }
            ], done)
        })
    })
    describe('explicit world', function() {
        var world;
        beforeEach(function(done) {
            simon(world = {}, [
                prepareDatabase(),
                createUser('glen')
            ], done)
        })
        it('can apply steps in chunks', function(done) {
            simon(world, [
                createUser('aisling'),
                requestUserlist(),
                function(world) {
                    assert.deepEqual(
                        world.response,
                        ['glen', 'aisling']
                    )
                }
            ], done)
        })
    })
})

// Some functions that pretend to interact with an application

function prepareDatabase() {
    return function(world, done) {
        world.db = {'users': []};
        process.nextTick(done);
    }
}
function createUser(username) {
    return function(world, done) {
        world.db.users.push(username);
        process.nextTick(done);
    }
}
function requestUserlist() {
    return function(world, done) {
        world.response = world.db.users.map(function(x){return x});
        process.nextTick(done);
    }
}
