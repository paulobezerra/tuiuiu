// server.js

// BASE SETUP
// =============================================================================



// call the packages we need
var express    = require('express'),
    load       = require('express-load'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');


var app        = express();
var router     = express.Router(); // get an instance of the express Router

//connect in database
mongoose.connect('mongodb://localhost/tuiuiu');

//load all files in app/moduls, app/controllers and app/routers
load('models', {cwd:'app'}).into(app);
load('controllers', {cwd:'app'}).into(app);
load('routes', {cwd:'app'}).into(app);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.use(app.routes.post);

// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
