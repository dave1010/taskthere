
var elements = {
	placeSelect: $('#p'),
	taskContainer: $('#t'),
	taskInput: $('#new') 
};

var placeManager = {
	getCurrentPlaceName: function() {
		return elements.placeSelect.val();
	},	
	getCurrent: function() {
		var n = placeManager.getCurrentPlaceName();
		for (var i in placeManager.places) {
			if (placeManager.places[i].name == n) {
				return placeManager.places[i];
			}
		}
	},
	update: function() {
		// save the tasks/places & trigger a rebuild of the task list
		placeManager.saveToStorage();
		elements.placeSelect.change();
	},
	saveToStorage: function() {
		localStorage.places = JSON.stringify(placeManager.places); 
	},
	restoreFromStorage: function() {
		// TODO: make into Place objects
		// restore from last session if it exists
		var places = localStorage.places ? JSON.parse(localStorage.places) : [];
		for (var i in places) {
			placeManager.places.push(new Place(places[i]);
		}
	},
	startEditPlace: function() {
		$('#edit-place').show();
		$('#place-selector').hide();

		var p = placeManager.getCurrent();
		$('#place-name').val(p.name);
		$('#place-lat').val(p.lat);
		$('#place-lng').val(p.lng);
	},
	cancelEditPlace: function() {
		$('#edit-place').hide();
		$('#place-selector').show();
	},
	saveEditPlace: function() {
		alert('not implemented');
		placeManager.cancelEditPlace();
	},
	startNewPlace: function() {
		var place_name = prompt('Place name: ');
		if (!place_name) {
			alert('Please enter a place name');
			return;
		}

		// TODO: chgeck if place exists
		var opts = {
			name: place_name,
			lat = 53,
			lng = -1,
		}

		placeManager.places.push(new Place(opts, tasks));
		placeManager.saveToStorage();
		placeManager.buildSelect();
		elements.placeSelect.val(place_name);
		placeManager.update();
	},
	addTask: function(details) {
		if (!placeManager.getCurrentName()) {
			alert('Add a place before adding a task');
			return;
		}
		var t = new Task(details);
		var p = placeManager.getCurrent();
		p.addTask(t);
		placeManager.update();
		return false;
	},
	buildSelect: function() {
		// TODO: show task count and distance to current location
		// TODO: sort order: alphabetical or distance
		var options = '';
		var place;
		for (var i in placeManager.places) {
			place = placeManager.places[i];
			options += place.getOptionHtml();
		}
		options += '<option value="" id="new-place-option">New place&hellip;</option>';
		elements.placeSelect.html(options);
	},
	deleteTask: function() {
		places[current_place_name()].tasks.splice(i, 1);
		update();
	},
	registerEvents: function() {
		elements.placeSelect.change(on.placeSelectChange);
	},
	// array of place objects
	// places are in the form {name: place_name,lat: 53,lng: -1,tasks: []}
	places: []
};

// event handlers
var on = {
	addTask: function() {
		var details = $('#new').val();
		placeManager.addTask(details);
		$('#new').val('');
		return false;	
	},
	placeSelectChange: function() {
		if (elements.placeSelect.val() == '') {
			placeManager.startNewPlace();
			return;
		}
		var p = placeManager.getCurrent();
		p.select();
		elements.taskInput.focus();
	}
};


function Place(opts, tasks) {
	this.name = opts.name;
	this.lat = opts.lat;
	this.lng - opts.lng;
	this.tasks = tasks || [];
}

Place.prototype.addTask = function(task) {
	this.tasks.push(task);
}


Place.prototype.add = function() {
};

Place.prototype.startEdit = function() {
};

Place.prototype.save = function() {
};

Place.prototype.delete = function() {
};

Place.prototype.select = function() {
	var html = '';
	var tasks = this.tasks;
	var a, task;
	elements.taskContainer.html('');	
	for (var i in tasks) {
		task = tasks[i];
		elements.taskContainer.append(task.getHtml());
	}
};

Place.prototype.getOptionHtml = function() {
	// TODO: escape chars
	return '<option>' + this.name + '</option>';
};

Place.prototype.addTask = function(task) {
	this.tasks.push(task);
};



function Task(title) {
	this.title = title;
}

Task.prototype.getHtml = function() {
	var me = this;	
	return $('<a />')
		.text(this.title)
		.click(function() {
			me.delete();
		})
		.wrap('<li />');
};

Task.prototype.delete = function() {
	alert('deleting task ' + this.name);
	// TODO: delete task
};

placeManager.restoreFromStorage();
placeManager.buildSelect();
placeManager.registerEvents();
placeManager.update();

//alert('js ok');
