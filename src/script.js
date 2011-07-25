// TODO: make OO & clean up lots

// object hash of place objects
// places are in the form {name: place_name,lat: 53,lng: -1,tasks: []}
// tasks are just strings
var places = {};

function start_edit_place() {
  $('#edit-place').show();
  $('#place-selector').hide();

  var p = places[place()];
  $('#place-name').val(p.name);
  $('#place-lat').val(p.lat);
  $('#place-lng').val(p.lng);
}

function cancel_edit_place() {
  $('#edit-place').hide();
  $('#place-selector').show();
}

function save_edit_place() {
  alert('not implemented');
  cancel_edit_place();
}

// start creating a new place
function start_new_place() {
  var place_name = prompt('Place name: ');
  if (!place_name) {
    alert('Please enter a place name');
    return;
  }
  if (places[place_name]) {
    alert(place_name + ' already exists');
  }
  places[place_name] = {
    name: place_name,
    lat: 53,
    lng: -1,
    tasks: []
  };

  localStorage.places = JSON.stringify(places);
  build_select();
  $('#p').val(place_name);
  update();
}

function add_task() {
  if (!place()) {
    alert('Add a place before adding a task');
    return;
  }
  places[place()].tasks.push($('#new').val());
  $('#new').val('');
  update();
  return false;
}

// build the HTML for the places select menu
function build_select() {
  // TODO: show task count and distance to current location
  // TODO: sort order: alphabetical or distance
  var options = '';
  for (var i in places) {
      options += '<option>' + places[i].name + '</option>';
  }
  options += '<option value="" id="new-place-option">New place&hellip;</option>';
  $('#p').html(options);
}

// get the currently selected place
function place() {
    return $('#p').val();
}

function delete_task(i) {
  places[place()].tasks.splice(i, 1);
  update();
}

// make so changing the place updates the tasks
function register_events() {
  $('#p').change(function(){
    if ($('#p').val() == '') {
      start_new_place();
      return;
    }
    var p = place();
    var html = '';
    var tasks = window.places[p].tasks;
    var a;
    for (var i in tasks) {
      a = $('<p />');
      a.text(tasks[i]);
      html += '<li><a href="javascript:void(delete_task(' + i + '))">' + a.text() + '</a></li>';
    }
    $('#t').html(html);
    $('#new').focus();
  });
}

// save the tasks/places & trigger a rebuild of the task list
function update() {
  localStorage.places = JSON.stringify(places);
  $('#p').change();
}

// restore from last session if it exists
function init() {
  window.places = localStorage.places ? JSON.parse(localStorage.places) : {};
}

init();
build_select();
register_events();
update();
//alert('js ok');
