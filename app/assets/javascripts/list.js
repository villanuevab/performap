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
};

// retrive event details
var getEventById = function(event_id) {
  for (var i = 0, len = gon.events.length; i < len; i++) {
    if (gon.events[i].id === event_id)
      return gon.events[i];
  }
}

// expand directory to show list of countries and tags
var showDirectory = function() {
  $('.directory-entries').slideDown('slow');
};

// hide directory of countries and tags
var hideDirectory = function() {
  $('.directory-entries').slideUp('slow');
};

// show latest column of most recently updated events
var showLatestColumn = function() {
  document.querySelector('.col-latest').classList.remove('hidden');
  document.querySelector('.latest-entries').style.display = '';
  $('.latest').slideDown('slow');
};

// hide latest column
var hideLatestColumn = function() {
  $('.latest').slideUp('slow', function() {
    document.querySelector('.col-latest').classList.add('hidden');
  });
};

// show details column
var showDetailsColumn = function() {
  document.querySelector('.col-details').classList.remove('hidden');
  $('.details').slideDown('slow');
}

// hide details column
var hideDetailsColumn = function() {
  $('.details').slideUp('slow', function() {
    document.querySelector('.col-details').classList.add('hidden');
  });
};

// update event details for details column
var updateDetailsColumn = function(event_id) {
  var event = getEventById(parseInt(event_id, 10));

  document.querySelector('.details').setAttribute('data-event-id', event_id);
  document.querySelector('.details-title').textContent = event.name;
  document.querySelector('.details-entry').textContent = event.description;
}

// restore page to original collapsed state by hiding columns
var resetColumns = function() {
  hideDirectory();
  hideLatestColumn();
  // hideCitiesColumn();
  hideDetailsColumn();

  // remove any selected cell highlighting
  var selected_cells = document.querySelectorAll('.selected');
  for (var i = 0, len = selected_cells.length; i < len; i++)
    selected_cells[i].classList.remove('selected');
};

// returns true if elem clicked is link to event from latest column
var isLatestEventLink = function(elem) {
  return elem.classList.contains('latest-entry') || elem.classList.contains('latest-entry-name') || elem.classList.contains('latest-entry-city');
}

// toggle and update details for event clicked from latest column
var handleLatestEventLink = function(elem) {
  var latest_entry = elem.classList.contains('latest-entry') ? elem : elem.parentElement;
  var event_id = latest_entry.dataset.eventId;

  // hide details if event clicked is already displayed
  if (document.querySelector('.details').dataset.eventId === event_id) {
    latest_entry.classList.remove('selected');
    hideDetailsColumn();
    return false;
  }

  // update styling for selected cell
  if (document.querySelector('.latest-entry.selected'))
    document.querySelector('.latest-entry.selected').classList.remove('selected');
  latest_entry.classList.add('selected');

  // update event details
  updateDetailsColumn(event_id);

  // show details column if hidden
  if (document.querySelector('.col-details').classList.contains('hidden'))
    showDetailsColumn();
}

var linkHandler = function (e) {
  var elem = e.target;
  console.log(e);

  // show details from event clicked from latest column
  if (isLatestEventLink(elem)) {
    handleLatestEventLink(elem);
  }
};

ready(function() {
  if (!supports)
    return;

  document.addEventListener('click', linkHandler, false);

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