// A lot of this code is from the original feedToJson function that was included with this project
// The new code allows for multiple feeds to be used but a bunch of variables and such have literally been copied and pasted into this code and some help from here: http://jsfiddle.net/BDK46/
// The original version can be found here: http://airshp.com/2011/jquery-plugin-feed2-to-json/
var facebook = {
	feed2: config.facebook.feed2 || null,
	newsLocation: '.facebook',
	newsItems: [],
	seenNewsItem: [],
	_yqURL: 'https://query.yahooapis.com/v1/public/yql',
	_yqlQS: '?format=json&q=select%20*%20from%20rss%20where%20url%3D',
	_cacheBuster: Math.floor((new Date().getTime()) / 1200 / 1000),
	_failedAttempts: 0,
	fetchInterval: config.facebook.fetchInterval || 60000,
	updateInterval: config.facebook.interval || 5500,
	fadeInterval: 2000,
	intervalId: null,
	fetchNewsIntervalId: null
}

/**
 * Creates the query string that will be used to grab a converted RSS feed2 into a JSON object via Yahoo
 * @param  {string} feed2 The original location of the RSS feed2
 * @return {string}      The new location of the RSS feed2 provided by Yahoo
 */
facebook.buildQueryString = function (feed2) {

	return this._yqURL + this._yqlQS + '\'' + encodeURIComponent(feed2) + '\'';

}

/**
 * Fetches the facebook for each feed2 provided in the config file
 */
facebook.fetchNews = function () {

	// Reset the facebook feed2
	this.newsItems = [];

	this.feed2.forEach(function (_curr) {

		var _yqUrlString = this.buildQueryString(_curr);
		// this.fetchFeed(_yqUrlString);
		this.fetchFeed(_curr);

	}.bind(this));

}

/**
 * Runs a GET request to Yahoo's service
 * @param  {string} yqUrl The URL being used to grab the RSS feed2 (in JSON format)
 */
facebook.fetchFeed = function (yqUrl) {

	$.ajax({
		type: 'GET',
		datatype:'jsonp',
		url: yqUrl,
		success: function (data) {

			if (data.query.count > 0) {
				this.parseFeed(data.query.results.item);
			} else {
				console.error('No feed2 results for: ' + yqUrl);
			}

		}.bind(this),
		error: function () {
			// non-specific error message that should be updated
			console.error('No feed2 results for: ' + yqUrl);
		}
	});

}

/**
 * Parses each item in a single facebook feed2
 * @param  {Object} data The facebook feed2 that was returned by Yahoo
 * @return {boolean}      Confirms that the feed2 was parsed correctly
 */
facebook.parseFeed = function (data) {

	var _rssItems = [];

	for (var i = 0, count = data.length; i < count; i++) {

		_rssItems.push(data[i].title);

	}

	this.newsItems = this.newsItems.concat(_rssItems);

	return true;

}

/**
 * Loops through each available and unseen facebook feed2 after it has been retrieved from Yahoo and shows it on the screen
 * When all facebook titles have been exhausted, the list resets and randomly chooses from the original set of items
 * @return {boolean} Confirms that there is a list of facebook items to loop through and that one has been shown on the screen
 */
facebook.showNews = function () {

	// If all items have been seen, swap seen to unseen
	if (this.newsItems.length === 0 && this.seenNewsItem.length !== 0) {

		if (this._failedAttempts === 20) {
			console.error('Failed to show a facebook story 20 times, stopping any attempts');
			return false;
		}

		this._failedAttempts++;

		setTimeout(function () {
			this.showNews();
		}.bind(this), 3000);

	} else if (this.newsItems.length === 0 && this.seenNewsItem.length !== 0) {
		this.newsItems = this.seenNewsItem.splice(0);
	}

	var _location = Math.floor(Math.random() * this.newsItems.length);

	var _item = facebook.newsItems.splice(_location, 1)[0];

	this.seenNewsItem.push(_item);

	$(this.newsLocation).updateWithText(_item, this.fadeInterval);

	return true;

}

facebook.init = function () {

	if (this.feed2 === null || (this.feed2 instanceof Array === false && typeof this.feed2 !== 'string')) {
		return false;
	} else if (typeof this.feed2 === 'string') {
		this.feed2 = [this.feed2];
	}

	this.fetchNews();
	this.showNews();

	this.fetchNewsIntervalId = setInterval(function () {
		this.fetchNews()
	}.bind(this), this.fetchInterval)

	this.intervalId = setInterval(function () {
		this.showNews();
	}.bind(this), this.updateInterval);

}