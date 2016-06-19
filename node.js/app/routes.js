// app/routes.js

var log4js = require("log4js");
var FB = require("fb");
var List = require("collections/list");
var string = require("string");
var xml = require("xml");
var util = require("util");
var builder = require('xmlbuilder');
var config = require("../config/facebook.js")

log4js.configure("config/logger.json");
logger = log4js.getLogger("Express router");
logger.setLevel("DEBUG");

logger.debug("Entering router");

module.exports = function(app, passport) {


    app.get('/json', isLoggedIn, function(req, res) {
        logger.debug("Entering /json");
        // FB.setAccessToken(req.user.facebook.token);
        FB.setAccessToken(config.userToken);
        // logger.debug("User FB token = " + req.user.facebook.token);
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
                    var text = item.from.name + ": " + item.name
                    var entry = {
                        title: text
                    }
                    data.add(entry);
                }
                if(item.message != undefined) {
                    var text = item.from.name + ": " + item.name
                    var entry = {
                        title: text
                    }
                    data.add(entry);
                }
                if(item.description != undefined) {
                    var text = item.from.name + ": " + item.description
                    var entry = {
                        title: text
                    }
                    data.add(entry);
                }
            });
            var result = {
                query: {
                    count: data.length,
                    results: {
                        item: data.toArray()
                    }
                }
            }
            res.json(result);
        });
    });

    // NOT WORKING YET
    app.get('/xml', isLoggedIn, function(req, res) {
        logger.debug("Entering /xml");
        // FB.setAccessToken(req.user.facebook.token);
        FB.setAccessToken(config.userToken);
        //logger.debug("User FB token = " + req.user.facebook.token);
        FB.api('/me/home', function(fb_res) {
            if (!fb_res || fb_res.error) {
                logger.error(!fb_res ? 'error occurred' : fb_res.error);
                res.status = 400;
                res.json(fb_res.error);
                return;
            }

            var xmlData = builder.create("rss")
                .ele("channel");

            xmlData.ele({ title: "Facebook newsfeed" });
            xmlData.ele({ link: "https://facebook.com" });

            var data = new List();
                     
            fb_res.data.forEach(function(item){
                if(item.name != undefined) {
                    var text = item.from.name + ": " + item.name
                    var entry = {
                        item: {
                            title: text
                        }
                    }
                    logger.debug(entry);
                    xmlData.ele("item").ele("title").text(text);
                    data.add(entry);
                }
                if(item.message != undefined) {
                    var text = item.from.name + ": " + item.message
                    var entry = {
                        item: {
                            title: text
                        }
                    }
                    logger.debug(entry);
                    xmlData.ele("item").ele("title").text(text);
                    data.add(entry);
                }
                if(item.description != undefined) {
                    var text = item.from.name + ": " + item.description
                    var entry = {
                        item: {
                            title: text
                        }
                    }
                    logger.debug(entry);
                    xmlData.ele("item").ele("title").text(text);
                    data.add(entry);
                }
            });

            logger.debug(xmlData.end({ pretty: true}));

            res.set('Content-Type', 'text/xml');
            res.send(xmlData.end({ pretty: true}));
        });
    });
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	//if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
