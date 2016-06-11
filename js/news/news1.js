// A lot of this code is from the original feedToJson function that was included with this project
// The new code allows for multiple feeds to be used but a bunch of variables and such have literally been copied and pasted into this code and some help from here: http://jsfiddle.net/BDK46/
// The original version can be found here: http://airshp.com/2011/jquery-plugin-feed1-to-json/
var news1 = {
	feed1: config.news1.feed1 || null,
	newsLocation: '.news1',
	newsItems: [],
	seenNewsItem: [],
	_yqURL: 'https://query.yahooapis.com/v1/public/yql',
	_yqlQS: '?format=json&q=select%20*%20from%20rss%20where%20url%3D',
	_cacheBuster: Math.floor((new Date().getTime()) / 1200 / 1000),
	_failedAttempts: 0,
	fetchInterval: config.news1.fetchInterval || 60000,
	updateInterval: config.news1.interval || 5500,
	fadeInterval: 2000,
	intervalId: null,
	fetchNewsIntervalId: null
}

/**
 * Creates the query string that will be used to grab a converted RSS feed1 into a JSON object via Yahoo
 * @param  {string} feed1 The original location of the RSS feed1
 * @return {string}      The new location of the RSS feed1 provided by Yahoo
 */
news1.buildQueryString = function (feed1) {

	return this._yqURL + this._yqlQS + '\'' + encodeURIComponent(feed1) + '\'';

}

/**
 * Fetches the news1 for each feed1 provided in the config file
 */
news1.fetchNews = function () {

	// Reset the news1 feed1
	this.newsItems = [];

	this.feed1.forEach(function (_curr) {

		var _yqUrlString = this.buildQueryString(_curr);
		this.fetchFeed(_yqUrlString);

	}.bind(this));

}

/**
 * Runs a GET request to Yahoo's service
 * @param  {string} yqUrl The URL being used to grab the RSS feed1 (in JSON format)
 */
news1.fetchFeed = function (yqUrl) {

	$.ajax({
		type: 'GET',
		datatype:'jsonp',
		url: yqUrl,
		success: function (data) {

			if (data.query.count > 0) {
				this.parseFeed(data.query.results.item);
			} else {
				console.error('No feed1 results for: ' + yqUrl);
			}

		}.bind(this),
		error: function () {
			// non-specific error message that should be updated
			console.error('No feed1 results for: ' + yqUrl);
		}
	});

}

/**
 * Parses each item in a single news1 feed1
 * @param  {Object} data The news1 feed1 that was returned by Yahoo
 * @return {boolean}      Confirms that the feed1 was parsed correctly
 */
news1.parseFeed = function (data) {

	var _rssItems = [];

	for (var i = 0, count = data.length; i < count; i++) {

		_rssItems.push(data[i].title);

	}

	this.newsItems = this.newsItems.concat(_rssItems);

	return true;

}

/**
 * Loops through each available and unseen news1 feed1 after it has been retrieved from Yahoo and shows it on the screen
 * When all news1 titles have been exhausted, the list resets and randomly chooses from the original set of items
 * @return {boolean} Confirms that there is a list of news1 items to loop through and that one has been shown on the screen
 */
news1.showNews = function () {

	// If all items have been seen, swap seen to unseen
	if (this.newsItems.length === 0 && this.seenNewsItem.length !== 0) {

		if (this._failedAttempts === 20) {
			console.error('Failed to show a news1 story 20 times, stopping any attempts');
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

	var _item = news1.newsItems.splice(_location, 1)[0];

	this.seenNewsItem.push(_item);

	$(this.newsLocation).updateWithText(_item, this.fadeInterval);

	return true;

}

news1.init = function () {

	if (this.feed1 === null || (this.feed1 instanceof Array === false && typeof this.feed1 !== 'string')) {
		return false;
	} else if (typeof this.feed1 === 'string') {
		this.feed1 = [this.feed1];
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