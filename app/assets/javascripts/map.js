var map;
function initMapModus() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(39.8097343, -98.5556199),
    mapTypeControl: false
  });

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