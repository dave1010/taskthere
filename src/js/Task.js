
function Task(title) {
	this.title = title;
}

Task.prototype.getHtml = function() {
	var me = this;	
	var html = $('<a href="javascript:void(0)"> </a>')
		.text(this.title || 'No title')
		.wrap('<li />').parent()
		.click(function() {
			me.delete();
		});
	return html;
};

Task.prototype.delete = function() {
	placeManager.getCurrent().deleteTask(this);
	placeManager.update();
};
