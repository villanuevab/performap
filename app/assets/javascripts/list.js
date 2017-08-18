var supports = !!document.querySelector && !!window.addEventListener;

// wait until DOM is ready
var ready = function (fn) {
  // sanity check
  if (typeof fn !== 'function')
    return;

  // if document is already loaded, run method
  if (document.readyState === 'interactive' || document.readyState === 'complete')
    return fn();

  // otherwise, wait until document is loaded
  document.addEventListener('DOMContentLoaded', fn, false);
}

// expand directory to show list of countries and tags
var showDirectory = function() {
  $('.directory-entries').slideDown('slow');
}

// hide directory of countries and tags
var hideDirectory = function() {
  $('.directory-entries').slideUp('slow');
}

// show latest column of most recently updated events
var showLatestColumn = function() {
  document.querySelector('.col-latest').classList.remove('hidden');
  document.querySelector('.latest-entries').style.display = '';
  $('.latest').slideDown('slow');
}

// hide latest column
var hideLatestColumn = function() {
  $('.latest').slideUp('slow', function() {
    document.querySelector('.col-latest').classList.add('hidden');
  });
}

// restore page to original collapsed state by hiding columns
var resetColumns = function() {
  hideDirectory();
  hideLatestColumn();
  // hideCitiesColumn();
  // hideDetailsColumn();

  // remove any selected cell highlighting
  var selected_cells = document.querySelectorAll('.selected');
  for (var i = 0, len = selected_cells.length; i < len; i++)
    selected_cells[i].classList.remove('selected');
}

ready(function() {
  if (!supports)
    return;

  // toggle directory menu and latest column
  var directory_link = document.querySelector('a.link-latest');
  directory_link.addEventListener('click', function(e) {
    e.preventDefault();
    if (document.querySelector('.col-latest').classList.contains('hidden')) {
      showLatestColumn();
      showDirectory();
    } else {
      resetColumns();
    }
  });
});