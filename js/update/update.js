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
					// window.location.reload();
					if(window.location.href != config.update.enableUrl)
					{
						window.location.href = config.update.enableUrl;
					}
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