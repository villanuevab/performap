var map, markerCluster;

function initMapModus() {
  // map styling
  var styledMapType = new google.maps.StyledMapType([
    {
      "elementType": "geometry.stroke",
      "stylers": [{"color": "#e9e9e9"}]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#f3ccfc"}]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#ffffff"}]
    },
    {
      "featureType": "poi",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#e9e9e9"}]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{"color": "#e9e9e9"}]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "transit",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "water",
      "stylers": [{"color": "#cce8f4"}]
    }
  ]);

  // styling for marker clustering
  var mcOptions = {
    zoomOnClick: false,
    imagePath: 'assets/images',
    minimumClusterSize: 1,
    styles: [{
      url: 'assets/images/circle.svg',
      height: 40,
      width: 40,
      fontFamily: '"Roboto", "Helvetica Neue", "Helvetica", Arial, sans-serif',
      fontWeight: 400,
      textColor: '#ffffff',
      textSize: 14
    }, {
      url: 'assets/images/circle.svg',
      height: 45,
      width: 45,
      fontFamily: '"Roboto", "Helvetica Neue", "Helvetica", Arial, sans-serif',
      fontWeight: 400,
      textColor: '#ffffff',
      textSize: 14
    }, {
      url: 'assets/images/circle.svg',
      height: 55,
      width: 55,
      fontFamily: '"Roboto", "Helvetica Neue", "Helvetica", Arial, sans-serif',
      fontWeight: 400,
      textColor: '#ffffff',
      textSize: 14
    }, {
      url: 'assets/images/circle.svg',
      height: 65,
      width: 65,
      fontFamily: '"Roboto", "Helvetica Neue", "Helvetica", Arial, sans-serif',
      fontWeight: 400,
      textColor: '#ffffff',
      textSize: 14
    }, {
      url: 'assets/images/circle.svg',
      height: 75,
      width: 75,
      fontFamily: '"Roboto", "Helvetica Neue", "Helvetica", Arial, sans-serif',
      fontWeight: 400,
      textColor: '#ffffff',
      textSize: 14
    }]
  };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    maxZoom: 14,
    center: new google.maps.LatLng(39.8097343, -98.5556199),
    mapTypeControl: false
  });

  // set map styling
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  var markers = createMarkers();

  markerCluster = new MarkerClusterer(map, markers, mcOptions);

  markerCluster.addListener('click', function(cluster) {
    var markers = cluster.getMarkers();

    if (cluster.getSize() > 1 && map.getZoom() < map.maxZoom) {
      hideDesc();
      zoomIntoCluster(cluster);

    } else {
      // Open description for events at given cluster.
      showDescForCluster(cluster);
    }
  });
}

/**
 * Returns an array of markers of all existing event-venue pairs.
 */
var createMarkers = function() {
  var markers = [];
  var events = gon.events.results;

  for (var i = 0; i < events.length; i++) {
    for (var j = 0; j < events[i].coordinates.length; j++) {
      var coords = events[i].coordinates[j];
      var latLng = new google.maps.LatLng(coords[0], coords[1]);
      var marker = new google.maps.Marker({
        position: latLng,
        eventId: events[i].id
      })

      markers.push(marker);
    }
  }

  return markers;
};

/**
 * Returns an array of events ids from a given cluster.
 */
var getEventIdsFromCluster = function(cluster) {
  var event_ids = new Set();

  var markers = cluster.getMarkers();
  for (var i = 0; i < markers.length; i++) {
    event_ids.add(markers[i].eventId);
  }

  return event_ids;
}

/**
 * Hide panel of descriptions for events.
 */
var hideDesc = function() {
  document.querySelector('#col-desc').classList.add('hidden');
}

/**
 * Display panel of descriptions for events in given cluster.
 */
var showDescForCluster = function(cluster) {
  var event_ids = getEventIdsFromCluster(cluster);

  document.querySelector('.desc').textContent = "";

  for (let event_id of event_ids) {
    var event = getEventById(event_id);

    var desc = document.querySelector('.desc');
    desc.setAttribute('data-event-id', event_id);

    var title = document.createElement('div');
    title.classList.add('desc-title');
    title.appendChild(document.createTextNode(event.name));

    var entry = document.createElement('div');
    entry.classList.add('desc-entry');
    entry.appendChild(document.createTextNode(event.description));

    desc.appendChild(title);
    desc.appendChild(entry);
  }

  document.querySelector('#col-desc').classList.remove('hidden');
}

/**
 * Zoom in on markers in cluster (taken from markerclusterer.js).
 */
var zoomIntoCluster = function(cluster) {
 var theBounds = cluster.getBounds();
 map.fitBounds(theBounds);
 setTimeout(function () {
   map.fitBounds(theBounds);
   // Don't zoom beyond the max zoom level
   if (map.getZoom() > map.maxZoom) {
     map.setZoom(map.maxZoom - 1);
   }
 }, 100);
}