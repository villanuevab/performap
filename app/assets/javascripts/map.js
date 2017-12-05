var map;
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
      "stylers": [{"color": "#cce8f6"}]
    }
  ]);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(39.8097343, -98.5556199),
    mapTypeControl: false
  });

  // set map styling
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  createMarkers();
}

var createMarkers = function() {
  console.log("creating markers...");
  var events = gon.events.results;
  for (var i = 0; i < events.length; i++) {
    for (var j = 0; j < events[i].coordinates.length; j++) {
      var coords = events[i].coordinates[j];
      console.log(coords);
      var latLng = new google.maps.LatLng(coords[0], coords[1]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      })
    }
  }
};