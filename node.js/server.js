var string = require("string");
var os = require("os");
var FB = require("fb");
var rest = require("node-rest-client");
// var noble = require('noble');
var log4js = require('log4js');
var morgan = require("morgan");
var format = require("string-format");
var express = require("express");
var favicon = require("serve-favicon");
// var serialPort = require('serialport');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var configDB = require('./config/database.js');

var app = express();

log4js.configure("config/logger.json");
logger = log4js.getLogger("MagicMirror");
logger.setLevel("DEBUG");

logger.debug("Starting MagicMirror app");

mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan("combined"));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
		secret: 'ilovescotchscotchyscotchscotch',  // session secret
		resave: false,
		saveUninitialized: true,
	}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
var port = 8081
app.listen(port);
logger.info("App listens on port " + port);














// // FB.setAccessToken("CAAUTzmS1fWIBABTazw6cSs4lgP9dZBuRBdYNgU6gqFYvwNbSlnjcR9uEEMId3fcMPxjU1dJUhrRa8KJ16EtGvfq90AcrkIaozlgxYVzVPHITonqNPHZAOofwE74O179gksOhKaDdAHZCraNSYnL1TRyS7Xk3VgZATdS9SfYhqpmDnCMpuyZAkoBKjqUKhn9wMv033eFmapubGm46C7JmH");
// FB.setAccessToken("CAAUTzmS1fWIBAAMYC9zp4CXrbBboxJEv2mMYZA32ZAGOJVpkbMH1CmNI79LuI9qOirupR0hI4cDfDWuULAknqZCxu9By9qBWOSPDy8qw41ap7IeeQSRSQRNBmq025lpyuw41RKCZCgy00tMTyJe5ZCXD6Xvb6y4UuSyVagNmJ5IwHytMYnWmdisOQkSMPWZCUZByayaPoT6ZAIOJCh9wv2xA");
// FB.api('/me/home', function (res) {
//   if(!res || res.error) {
//    logger.error(!res ? 'error occurred' : res.error);
//    return;
//   }
//   res.data.forEach(function(item){
//   	// var line;
//   	// if(item.name == undefined) {
//   	// 	line = item.from.name + ": " + item.message;
//   	// } else if(item.message == undefined) {
//   	// 		line = item.from.name + ": " + item.name;
//   	// 	} else if(string(item.name).contains("http")) {
//   	// 			line = item.from.name + ": " + item.message;
//   	// 		} else if(string(item.message).contains("http")) {
//   	// 				line = item.from.name + ": " + item.name;
//   	// 			} else if(item.name.length > item.message.length) {
//   	// 	 				line = item.from.name + ": " + item.name;
//   	// 				} else {
//   	// 	 					line = item.from.name + ": " + item.message;
//   	// 					}
//   	// logger.info(string(line).lines()[0]);
//   	// logger.debug(item);
//   	logger.debug("FROM        ### " + item.from.name);
//   	logger.debug("NAME        ### " + item.name);
//   	logger.debug("MESSAGE     ### " + item.message);
//   	logger.debug("DESCRIPTION ### " + item.description);
//   	logger.debug();
//   })
// });



// FB.api('/me/notifications', function (res) {
//   if(!res || res.error) {
//    logger.error(!res ? 'error occurred' : res.error);
//    return;
//   }
//   res.data.forEach(function(item){
// 	logger.debug(item);
//   })
// });









//SERIAL PORT

// serialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//     logger.debug(port)
//   });
// });

// var com = new serialPort.SerialPort("COM5", {
// 	baudrate: 115200,
// 	parser: serialPort.parsers.readline('\n')
// });

// com.on('open', function () {
// 	logger.debug("COM5 connected");
// 	com.write('Hi Mom!');
// });

// com.on('data', function (data) {
// 	logger.debug("Recieved: " + data)
// });
