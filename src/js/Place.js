
function Place(opts, tasks) {
	this.name = opts.name;
	this.lat = opts.lat;
	this.lng = opts.lng;
	this.tasks = tasks || [];
}

Place.prototype.addTask = function(task) {
	this.tasks.push(task);
}


Place.prototype.add = function() {
};

Place.prototype.startEdit = function() {
};

Place.prototype.save = function(opts) {
	this.name = opts.name;
	this.lat = opts.lat;
	this.lng = opts.lng;
};

Place.prototype.delete = function() {
};

Place.prototype.deleteTask = function(task) {
	for (var i in this.tasks) {
		if (this.tasks[i].title === task.title) {
			this.tasks.splice(i, 1);
			return;
		}
	}
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
	var escaped = this.name.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#039;').replace(/"/g, '&quot;');
	return '<option>' + this.name + '</option>';
};

Place.prototype.addTask = function(task) {
	this.tasks.push(task);
};

Place.prototype.distanceTo = function(position) {
	console.log(position.lat, position.lng);
	console.log(this.lat, this.lng);

	function toRad(deg) {
		return deg *(Math.PI/180);
	}

	var R = 6371; // km
	var d = Math.acos(
				Math.sin(toRad(position.lat)) * Math.sin(toRad(this.lat)) + 
	            Math.cos(toRad(position.lat)) * Math.cos(toRad(this.lat)) *
	            Math.cos(toRad(this.lng) - toRad(position.lng))
	        ) * R;
	console.log(d);
	return d;
};
