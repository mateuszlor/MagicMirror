// app/routes.js

var log4js = require("log4js");
var FB = require("fb");
var List = require("collections/list");
var string = require("string");

log4js.configure("config/logger.json");
logger = log4js.getLogger("Express router");
logger.setLevel("DEBUG");

logger.debug("Entering router");

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/newsfeed', isLoggedIn, function(req, res) {
        logger.debug("Entering /profile");
        FB.setAccessToken(req.user.facebook.token);
        logger.debug("User FB token = " + req.user.facebook.token);
        FB.api('/me/home', function(fb_res) {
            if (!fb_res || fb_res.error) {
                logger.error(!fb_res ? 'error occurred' : fb_res.error);
                res.status = 400;
                res.json(fb_res.error);
                return;
            }
            res.render('newsfeed.ejs', {
                data: fb_res.data // get the user out of session and pass to template
            });
        });
    });

    app.get('/user/newsfeed', isLoggedIn, function(req, res) {
        logger.debug("Entering /user/newsfeed");
        FB.setAccessToken(req.user.facebook.token);
        logger.debug("User FB token = " + req.user.facebook.token);
        FB.api('/me/home', function(fb_res) {
            if (!fb_res || fb_res.error) {
                logger.error(!fb_res ? 'error occurred' : fb_res.error);
                res.status = 400;
                res.json(fb_res.error);
                return;
            }

            var data = new List();
           
            fb_res.data.forEach(function(item){
                if(item.name != undefined) {
                    var entry = new List();
                    entry.add(item.from.name);
                    entry.add(item.name);
                    data.add(entry);
                }
                if(item.message != undefined) {
                    var entry = new List();
                    entry.add(item.from.name);
                    entry.add(item.message);
                    data.add(entry);
                }
                if(item.description != undefined) {
                    var entry = new List();
                    entry.add(item.from.name);
                    entry.add(item.description);
                    data.add(entry);
                }
            });
            res.json(data.toJSON());
        });
    });
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
