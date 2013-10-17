module.exports = simon;

function simon(world, steps, callback) {
    // Optional first argument
    if (typeof steps === 'function') {
        callback = steps;
        steps = world;
        world = {};
    }
    var step;
    executeStep();
    function executeStep() {
        step = steps.shift();
        // No more steps, we're done
        if (!step) {
            return callback();
        }
        // sync step
        if (step.length == 1) {
            step(world);
            return executeStep();
        }
        // async step
        step(world, function(err) {
            if (err) return callback(err);
            executeStep();
        })
    }
}
