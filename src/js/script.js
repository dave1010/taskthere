
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
		throw 'No current place';
	},
	update: function() {
		// save the tasks/places & trigger a rebuild of the task list
		placeManager.saveToStorage();
		elements.placeSelect.change();
	},
	saveToStorage: function() {
		localStorage.places = JSON.stringify(placeManager.places); 
	},
	taskArrayToObjects: function(tasks_array) {
		var tasks = [];
		for (var i in tasks_array) {
				tasks.push(new Task(tasks_array[i].title));
		}		
		return tasks;
	},
	restoreFromStorage: function() {
		// restore from last session if it exists
		var places = localStorage.places ? JSON.parse(localStorage.places) : [];
		var tasks;
		for (var i in places) {
			tasks = placeManager.taskArrayToObjects(places[i].tasks);
			placeManager.places.push(new Place(places[i], tasks));
		}
	},
	startNewPlace: function() {
		var place_name = prompt('Enter new place name: ');
		if (!place_name) {
			alert('Please enter a place name');
			return;
		}

		// TODO: check if place exists
		// TODO: geolocation
		var opts = {
			name: place_name,
			lat: 0,
			lng: 0,
		};

		var tasks = [];
		var place = new Place(opts, tasks);
		
		navigator.geolocation.getCurrentPosition(function(position) {
			opts.lat = position.coords.latitude;
			opts.lng = position.coords.longitude;
			place.save(opts);
		}, function(error) {
			alert(error.message);	
		});

		placeManager.places.push(place);
		placeManager.saveToStorage();
		placeManager.buildSelect();
		elements.placeSelect.val(place_name);
		placeManager.update();
	},
	deletePlace: function(place) {
		for (var i in placeManager.places) {
			if (placeManager.places[i].name === place.name) {
				// this will delete the 1st place with the same name
				placeManager.places.splice(i, 1);
				return;
			}
		}
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
	registerEvents: function() {
		elements.placeSelect.change(on.placeSelectChange);
	},
	// array of place objects
	places: []
};

// event handlers
var on = {
	addTask: function() {
		var title = $('#new').val();
		if (!title) {
			alert('Enter details for task');
			return false;
		}
		if (!placeManager.getCurrentPlaceName()) {
			alert('Add a place before adding a task');
			return false;
		}
		var t = new Task(title);
		var p = placeManager.getCurrent();
		p.addTask(t);
		placeManager.update();
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
		var opts = {
			name: $('#place-name').val(),
			lat: $('#place-lat').val(),
			lng: $('#place-lng').val()
		};
		placeManager.getCurrent().save(opts);
		placeManager.saveToStorage();
		placeManager.buildSelect();
		elements.placeSelect.val(opts.name);
		placeManager.update();
		on.cancelEditPlace();
	},
	deleteEditPlace: function() {
		if (!confirm("Are you sure you want to delete this place and all it's tasks?")) {
			on.cancelEditPlace();
			return;
		}
		placeManager.deletePlace(placeManager.getCurrent());
		placeManager.saveToStorage();
		placeManager.buildSelect();
		//elements.placeSelect.val(opts.name);
		placeManager.update();
		on.cancelEditPlace();
	},
	hereEditPlace: function() {
		// set the current place the current geolocation
		// then close & save the edit, or just set the input fields
	}
};

function load_page() {
	placeManager.restoreFromStorage();
	placeManager.buildSelect();
	placeManager.registerEvents();
	placeManager.update();
}

load_page();
//alert('js ok');
