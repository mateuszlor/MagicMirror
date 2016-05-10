// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1429152057359714', // your App ID
		'clientSecret' 	: '205252d77c2423334a48c69e468c5752', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},
};