// retrieve event details
var getEventById = function(event_id) {
  for (var i = 0, len = gon.events.results.length; i < len; i++) {
    if (gon.events.results[i].id === event_id)
      return gon.events.results[i];
  }
}


// expand directory to show list of countries and tags
var showDirectory = function() {
  var directory_header = document.querySelector('.col-menu .directory-main .col-header-wrapper');
  directory_header.classList.remove('col-header-wrapper');
  directory_header.classList.add('col-open-header-wrapper');

  $('.directory-entries').slideDown('slow');
};

// hide directory of countries and tags
var hideDirectory = function() {
  $('.directory-entries').slideUp('slow', function() {
    var directory_header = document.querySelector('.col-menu .directory-main .col-open-header-wrapper');
    directory_header.classList.add('col-header-wrapper');
    directory_header.classList.remove('col-open-header-wrapper');
  });
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


// show cities column
var showCitiesColumn = function() {
  document.querySelector('.col-cities').classList.remove('hidden');
  $('.cities').slideDown('slow');
};

// hide cities column
var hideCitiesColumn = function() {
  document.querySelector('.cities').dataset.country = '';
  $('.cities').slideUp('slow', function() {
    document.querySelector('.col-cities').classList.add('hidden');
  });
};

// setup secondary table for city > events
var setupEventsTable = function() {
  var table = document.createElement('table');
  table.classList.add('secondary-table');
  table.classList.add('tablesorter');
  table.classList.add('city-events-table');

  var div = document.createElement('div');
  div.classList.add('secondary-table-wrapper');

  var td = document.createElement('td');

  var tr = document.createElement('tr');
  tr.classList.add('tablesorter-childRow');
  tr.classList.add('secondary-table-row');

  div.appendChild(table);
  td.appendChild(div);
  tr.appendChild(td);

  return tr;
};

// create thead for city > events table with name, venue, date
var createTheadForEventsTable = function() {
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  var column_titles = ["Name", "Venue", "Date", "Updated At"];
  for (var i = 0, len = column_titles.length; i < len; i++) {
    var th = document.createElement('th');
    th.textContent = column_titles[i];
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  return thead;
}

// create tr for event with name, venue, date
var createTrForEvent = function(event) {
  var tr = document.createElement('tr');
  tr.classList.add('event-entry');
  tr.classList.add('link-details');
  tr.dataset.eventId = event.id;

  var td_name = document.createElement('td');
  td_name.classList.add('event-entry-name');
  td_name.textContent = event.name;
  tr.appendChild(td_name);

  var td_venue = document.createElement('td');
  td_venue.classList.add('event-entry-venue');
  td_venue.classList.add('ellipsis-clip');
  td_venue.textContent = event.venue_names.join(', ');
  tr.appendChild(td_venue)

  var td_date = document.createElement('td');
  td_date.classList.add('event-entry-start-date');
  td_date.textContent = event.start_end_daterange;
  tr.appendChild(td_date);

  var td_updated_at = document.createElement('td');
  td_updated_at.classList.add('event-entry-updated-at');
  td_updated_at.textContent = event.updated_at;
  tr.appendChild(td_updated_at);

  return tr;
};

// generate tbody for city > events table
var createTbodyForEventsTable = function(city) {
  var tbody = document.createElement('tbody');

  var events_for_city = Array.prototype.filter.call(gon.events.results, function(event) {
    return event.cities.includes(city);
  });

  for (var i = 0, len = events_for_city.length; i < len; i++)
    tbody.appendChild(createTrForEvent(events_for_city[i]));

  return tbody;
};

// create secondary table of events for city
var createEventsTableForCity = function(city) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(setupEventsTable());
  fragment.querySelector('.secondary-table').appendChild(createTheadForEventsTable());
  fragment.querySelector('.secondary-table').appendChild(createTbodyForEventsTable(city));

  return fragment;
};

// create nested tr > td > a element for city entry in table
var createTrForCity = function(city) {
  var tr = document.createElement('tr');
  tr.classList.add('city-entry');
  var td = document.createElement('td');
  var a = document.createElement('a');
  a.setAttribute('href', '#');
  a.dataset.city = city;
  a.classList.add('toggle');
  a.textContent = city;

  td.appendChild(a);
  tr.appendChild(td);

  return tr;
};

// update table for cities and events
var updateCitiesColumn = function(country) {
  document.querySelector('.cities .col-header-title').textContent = country;
  document.querySelector('.cities').dataset.country = country;

  var fragment = document.createDocumentFragment();
  var tbody = document.createElement('tbody');

  // create secondary table of events for each city in new country
  var cities = gon.citiesByCountry[country];
  for (var i = 0, len = cities.length; i < len; i++) {
    tbody.appendChild(createTrForCity(cities[i]));
    tbody.appendChild(createEventsTableForCity(cities[i]));
  }

  fragment.appendChild(tbody);

  var original_tbody = document.querySelector('#cities-table tbody');
  document.querySelector('#cities-table').replaceChild(fragment, original_tbody);

  $('#cities-table').trigger('update');
  $('.tablesorter-childRow td .secondary-table-wrapper').hide();
  $('.tablesorter-childRow > td').hide();
}


// show details column
var showDetailsColumn = function() {
  document.querySelector('.col-details').classList.remove('hidden');
  $('.details').slideDown('slow');
};

// hide details column
var hideDetailsColumn = function() {
  document.querySelector('.details').dataset.eventId = -1;
  $('.details').slideUp('slow', function() {
    document.querySelector('.col-details').classList.add('hidden');
  });
};

// update event details for details column
var updateDetailsColumn = function(event_id) {
  var event = getEventById(parseInt(event_id, 10));

  document.querySelector('.details').setAttribute('data-event-id', event_id);
  document.querySelector('.details-title').textContent = event.name;

  var details_entry = document.querySelector('.details-entry');
  details_entry.textContent = "";

  var p_time_place = document.createElement('p');

  if (event.venue_names.length > 1 || event.venue_names[0]) {
    var span_venues = document.createElement('span');
    span_venues.textContent = event.venue_names.join(", ");
  }

  var span_dates = document.createElement('span');
  span_dates.textContent = event.start_end_daterange;

  var p_desc = document.createElement('p');
  p_desc.textContent = event.description;

  var div_links = document.createElement('div');
  div_links.textContent = "MORE DETAILS..."
  for (key in event["links"]) {
    if (event["links"][key] && event["links"][key].replace(/\s/g,'').length > 0) {
      var link = document.createElement('a');
      link.href = event["links"][key];
      link.textContent = key;
      div_links.appendChild(link);
    }
  }

  if (span_venues) {
    p_time_place.appendChild(span_venues);
    p_time_place.appendChild(document.createElement('br'));
  }
  p_time_place.appendChild(span_dates);
  details_entry.appendChild(p_time_place);
  details_entry.appendChild(p_desc);
  details_entry.appendChild(div_links);
}


// restore page to original collapsed state by hiding columns
var resetColumns = function() {
  hideDirectory();
  hideLatestColumn();
  hideCitiesColumn();
  hideDetailsColumn();

  // remove any selected cell highlighting
  var selected_cells = document.querySelectorAll('.selected');
  for (var i = 0, len = selected_cells.length; i < len; i++)
    selected_cells[i].classList.remove('selected');
};


var handleDirectoryLink = function(e) {
  e.preventDefault();
  if (document.querySelector('.col-latest').classList.contains('hidden')) {
    showLatestColumn();
    showDirectory();
  } else
    resetColumns();
};

var handleDirectoryCountryLink = function(elem) {
  var country = elem.dataset.country;

  // hide cities column if country is already displayed
  if (document.querySelector('.cities').dataset.country === country) {
    elem.classList.remove('selected');
    hideCitiesColumn();
    return false;
  }

  // update styling for selected cell
  if (document.querySelector('.link-country.selected'))
    document.querySelector('.link-country.selected').classList.remove('selected');
  elem.classList.add('selected');

  // update cities column
  updateCitiesColumn(country);

  // show cities column if hidden
  if (document.querySelector('.col-cities.hidden'))
    showCitiesColumn();
};


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

  // TODO: collapse cities column

  // show details column if hidden
  if (document.querySelector('.col-details').classList.contains('hidden'))
    showDetailsColumn();
};

// TODO: consolidate into one function handleEventLink = function(elem, className)
// toggle and update details for event clicked from cities column
var handleCityEventLink = function(elem) {
  var event_entry = elem.classList.contains('event-entry') ? elem : elem.parentElement;
  var event_id = event_entry.dataset.eventId;

  // hide details if event clicked is already displayed
  if (document.querySelector('.details').dataset.eventId === event_id) {
    event_entry.classList.remove('selected');
    hideDetailsColumn();
    return false;
  }

  // update styling for selected cell
  if (document.querySelector('.event-entry.selected'))
    document.querySelector('.event-entry.selected').classList.remove('selected');
  event_entry.classList.add('selected');

  // update event details
  updateDetailsColumn(event_id);

  // TODO: collapse latest column

  // show details column if hidden
  if (document.querySelector('.col-details').classList.contains('hidden'))
    showDetailsColumn();
};


// toggle dropdown menu for sorting
var toggleSortDropdown = function(e) {
  e.preventDefault();

  var $dropdown = $('.sort-dropdown');

  if ($dropdown.hasClass('collapsed')) {
    // show sort criteria for events (Title, Start Date) if events table is open
    if (document.querySelector('.selected-city-events-table')) {
      document.querySelector('.sort-dropdown-events').classList.remove('hidden');
    } else {
      document.querySelector('.sort-dropdown-events').classList.add('hidden');
    }

    $('.sort-dropdown-collapsible').slideDown('fast');
    $dropdown.removeClass('collapsed');
  } else {
    closeSortDropdown();
  }
};

// close dropdown menu for sorting
var closeSortDropdown = function() {
  $('.sort-dropdown-collapsible').slideUp('fast', function() {
    document.querySelector('.sort-dropdown').classList.add('collapsed');
  });
}

// sort table using external link
var handleSortTableLink = function(elem) {
  // sort larger city table
  if (elem.dataset['sortBy'] == "City") {
    $('#cities-table').trigger('sorton', [ $(elem).data('tablesorter') ]);
    return;
  }

  // for sorting by last updated, sort larger city table if events table is not open
  if (elem.dataset['sortBy'] == "Updated At" && !$('.selected-city-events-table').length) {
    $('#cities-table').trigger('sortReset');
    return;
  }

  // else, sort events table for given city
  $('.selected-city-events-table').trigger('sorton', [ $(elem).data('tablesorter') ]);
};


// set up same listeners on multiple elements
var linkHandler = function (e) {
  var elem = e.target;

  // close sort dropdown if click is outside dropdown menu
  if (!$(elem).parents('.sort-dropdown').length) {
    closeSortDropdown();
  }

  if (elem.classList.contains('link-country')) {
    // open cities column from clicking on country
    handleDirectoryCountryLink(elem);
  } else if (elem.classList.contains('link-sort')) {
    // sort open table
    e.preventDefault();
    handleSortTableLink(elem);
  } else if (elem.className.search(/^(latest-entry)/i) > -1) {
    // show details from event clicked from latest column
    handleLatestEventLink(elem);
  } else if (elem.className.search(/^(event-entry)/i) > -1) {
    handleCityEventLink(elem);
  }
};


$(document).ready(function() {
  // load this JS file only when on directory page
  if (!document.querySelector('.home.directory')) {
    return;
  }

  // initialize link handler
  document.addEventListener('click', linkHandler, false);

  // toggle directory menu and latest column
  document.querySelector('a.link-latest').addEventListener('click', handleDirectoryLink, false);

  // toggle sorting dropdown
  document.querySelector('a.sort-dropdown-toggle').addEventListener('click', toggleSortDropdown, false);

  // set up tablesorter
  $('#cities-table').tablesorter({
    cssChildRow: 'tablesorter-childRow'});
  $('.tablesorter').delegate('.toggle', 'click', function() {
    closeSortDropdown();

    var clicked_city = this;

    // hide previously opened table of events for a city if it exists
    var previous_city = document.querySelector('.selected-city a.toggle');

    if (previous_city) {
      previous_city.parentElement.classList.remove('selected');
      previous_city.parentElement.classList.remove('selected-city');
      $('.selected-city-events-table').removeClass('selected-city-events-table');
      $('.selected-city-events-table-wrapper').slideUp('slow', function() {
        this.classList.remove('selected-city-events-table-wrapper');
        return $(this).parent().hide();
      });

      // don't proceed to open the clicked city if it was just closed
      if (previous_city == clicked_city)
        return false;
    }

    // open child table of events for the clicked city if not previously open
    clicked_city.parentElement.classList.add('selected');
    clicked_city.parentElement.classList.add('selected-city');
    $(clicked_city).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').each(function() {
      if ($(this).children('td').css('display') === 'none') {
        $(this).children('td').show();
        $(this).find('td .secondary-table-wrapper').slideDown('slow', function() {
          this.classList.add('selected-city-events-table-wrapper');
        });

        var $table = $(this).find('table');
        $table.addClass('selected-city-events-table');
        return $table.tablesorter();
      }
    });

    return false;
  });
});