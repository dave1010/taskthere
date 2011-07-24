var current_place = 'Home';
// TODO: add to localStorage
// TODO: make OO
var places = {
  Home: {
    name: 'Home',
    lat: 52,
    lng: -1,
    tasks: ['Make a todo program', 'Tidy']
  },
  Work: {
    name: 'Work',
    lat: 53,
    lng: -1,
    tasks: ['Do some work', 'Code']
  }
};

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

function start_new_place() {
  alert('adding new place not implemented');
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

function place_change(el) {
  //window.current_place = 'Home";  
}

function delete_task(title) {
  // delete title from current_place
}

function place() {
    return $('#p').val();
}

function delete_task(i) {
  places[place()].tasks.splice(i, 1);
  update();
}

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
  });
}

function update() {
  localStorage.places = JSON.stringify(places);
  $('#p').change();
}

function init() {
  window.places = localStorage.places ? JSON.parse(localStorage.places) : {};
}

init();
build_select();
register_events();
update();
//alert('js ok');
