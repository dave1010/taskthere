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

	// get from localStorage
	this.restoreState();

	this.registerEvents();
}

GpsChecker.prototype.interval = null;
GpsChecker.prototype.period = 1000 * 6 * 10; // 10 minutes

GpsChecker.prototype.registerEvents = function() {
	var me = this;

	$('#gps').click(function() {
		if ($(this).attr('checked')) {
			me.active = true;
			me.saveState();
			me.setInterval();
		} else {
			me.active = false;
			me.saveState();
			if (me.interval) {
				clearInterval(me.interval);
			}
		}
	});	
};

GpsChecker.prototype.restoreState = function() {
	var props = localStorage.gps ? JSON.parse(localStorage.gps) : {
		active: false,
		lat: 0,
		lng: 0
	};

	this.active = props.active;
	this.lat = props.lat;
	this.lng = props.lng;

	if (this.lat && this.lng) {
		var me = this;
		// use the lat lat/lng for now
		setTimeout(function() {
			placeManager.gpsSuccess(me);
		}, 1);
	}

	if (this.active) {
		$('#gps').attr('checked', 'checked');
		this.activate();
	} else {
		$('#gps').removeAttr('checked', false);	
	}
};

GpsChecker.prototype.saveState = function() {
	localStorage.gps = JSON.stringify(this);
};

GpsChecker.prototype.activate = function() {
	this.inProgress();
	this.getPosition();
};

GpsChecker.prototype.inProgress = function() {
	//console.log('looking for position');
	$('#gps').parent().css('background', '#ccc');
};

GpsChecker.prototype.finishedProgress = function() {
	//console.log('finished looking for position');
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
	//console.log('set interval', this);
	var me = this;
	this.activate();
	this.interval = setInterval(function() {
		me.activate();
	}, this.period);
};

GpsChecker.prototype.onSuccess = function(position) {
	this.lat = position.coords.latitude;
	this.lng = position.coords.longitude;

	this.finishedProgress();

	var me = this;
	setTimeout(function() {
		placeManager.gpsSuccess(me);
	}, 1);
};

GpsChecker.prototype.onFail = function(error) {
	//console.log('fail');
	this.finishedProgress();
};


