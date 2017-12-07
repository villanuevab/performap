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
    console.log('mc has ' + cluster.getSize() + ' markers');
    var markers = cluster.getMarkers();

    console.log('event ' + markers[0].eventId + ' at ' + markers[0].getPosition());
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
var getEventIdsFromMarkerCluster = function(cluster) {
  var event_ids = [];
  return event_ids;
}