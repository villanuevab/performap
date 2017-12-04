var map;
function initMapModus() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(37.4274745,-122.1719077),
    mapTypeControl: false
  });

  createMarkers();
}

var createMarkers = function() {
  console.log("creating markers...");
  var events = gon.events.results;
  for (var i = 0; i < events.length; i++) {
    console.log(events[i].coordinates);
  }
};