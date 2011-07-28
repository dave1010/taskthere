/*
set gps checkbox to localStorage.gps on load
on gps checkbox change:
	save state to localstorage.gps
	show it as in progress (animation)
	start getting gps position
	setInterval for getting gps position 
	when gps position found
		save to localstorage (& restore)
		update select box & trigger change
*/

function GpsChecker(success) {
	this.lat = 0;
	this.lng = 0;
	this.active = null;
	
	// callback
	this.onSuccess = success;
	
	this.restoreState();
	var me = this;
	
	$('#gps').click(function() {
		if ($(this).val() === 'on') {
			me.setInterval();
		} else {
			if (me.interval) {
				clearInterval(me.interval);
			}
		}
	});
}

GpsChecker.prototype.interval = null;
GpsChecker.prototype.period = 1000 * 60 * 10; // 10 minutes


GpsChecker.prototype.restoreState = function() {
	this.active = localStorage.gps && localStorage.gps.active;
	this.lat = localStorage.gps && localStorage.gps.lat;
	this.lng = localStorage.gps && localStorage.gps.lng;
	
	if (this.active) {
		this.activate();
	}
};

GpsChecker.prototype.saveState = function() {
	localStorage.gps = localStorage.gps || {};
	localStorage.gps.Active = this.active;
	if (this.lat && this.lng) {
		localStorage.gps.lat = this.lat;
		localStorage.gps.lng = this.lat;
	}
};

GpsChecker.prototype.activate = function() {
	this.inProgress();
	this.getPosition();
};

GpsChecker.prototype.inProgress = function() {
	alert('looking for position');
	$('#gps').parent().css('background', '#ccc');
};

GpsChecker.prototype.finishedProgress = function() {
	alert('finished looking for position');
	$('#gps').parent().css('background', 'none');
};

GpsChecker.prototype.getPosition = function() {
	var me = this;
	navigator.geolocation.getCurrentPosition(function(position) {
		me.onSuccess(position);
	}, function(error) {
		this.onFail(error);
	});	
};

GpsChecker.prototype.setInterval = function() {
	var me = this;
	this.interval = setInterval(function() {
		me.activate();
	}, this.period);
};

GpsChecker.prototype.onSuccess = function(position) {
	alert(position.coords.latitude + ', ' + position.coords.longitude);
	this.finishedProgress();
};

GpsChecker.prototype.onFail = function(error) {
	alert('fail');
	this.finishedProgress();
};


