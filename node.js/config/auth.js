// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1429152057359714', // your App ID
		'clientSecret' 	: '770a16e7dd17d1a08894188be347db26', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},
};