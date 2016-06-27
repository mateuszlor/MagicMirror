var update = {
	updateInterval: 10000,
	intervalId: null,
	showingCount: 0
}

/**
 * Checks the version and refreshes the page if a new version has been pulled
 */
update.checkIfActive = function () {

	console.log("Checking distance")
	if(update.showingCount == 0) {

		console.log("showingCount == 0 - checking again")
	  	$.getJSON(config.update.distanceUrl)
		    .success(function(data) {
				if (data && data.distance < config.update.distance) {
					console.log("Somebody in range, distance = " + data.distance)
					config.update.show = false;
					update.showingCount = config.update.upTime - 1;

					var user = 0;
					$.getJSON(config.update.bluetoothUrl)
		    			.success(function(btData) {
		    				queryHelper.fetchQuery()
		    				console.log(queryHelper.queries);
		    				console.log(btData);
		    				var dev = btData[btData.length - 1]

		    				console.log(dev);

		    				switch(dev.address) {
		    					case "FA:75:46:03:37:1E": // Ulefone Power
		    						console.log("Found known device " + dev.address);
		    						user = 1;
		    						break;
		    					case "2C:54:CF:4A:82:E7": // Kamil G2},
		    						console.log("Found known device " + dev.address);
		    						user = 2;
		    						break;
		    					case "CC:07:AB:8B:EB:56": // S3-Trójka"
		    						console.log("Found known device " + dev.address);
		    						user = 3;
		    						break;
		    					default:
		    						console.log("Found unknown device " + dev.address);
		    				}

		    				var url = config.update.enableUrl + "?user=" + user;
							if(window.location.href != url)
							{
								window.location.href = url;
							}
		    			})
		    			.error(function() {
		    				var url = config.update.enableUrl + "?user=" + user;
							if(window.location.href != url)
							{
								window.location.href = url;
							}
		    			})
				}
				else {
					console.log("Nobody in range")
					config.update.show = false;
					// window.location.reload();
					if(window.location.href != config.update.disableUrl)
					{
						window.location.href = config.update.disableUrl;
					}
				}
		    });
	}
	else {
		console.log("showingCount == " + update.showingCount + " - not checking this time")
		update.showingCount--;
	}
}

update.init = function () {

	console.log("Initializing update module")

	console.log(config.update);

	this.intervalId = setInterval(function () {
		this.checkIfActive();
	}.bind(this), this.updateInterval);

}

console.log("Update module")