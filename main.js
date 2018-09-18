let usc = new google.maps.LatLng(34.043514, -118.266210);

let map = new google.maps.Map(document.getElementById('map'), {
  center: usc,
  zoom: 13
});

let successHandler = function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  let mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  map.setCenter(mypos);
  let myposMarker = new google.maps.Marker({
    map: map,
    position: mypos,
  });

  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    location: mypos
  }, function(geocoderResults) {
    console.log(geocoderResults[0].formatted_address);
    let infoWindow = new google.maps.InfoWindow({
      position: mypos,
      content: geocoderResults[0].formatted_address,
    });
    google.maps.event.addListener(myposMarker, 'click', function() {
      infoWindow.open(map);
    });
  });
};
let errorHandler = function(error) {};
let options = {};
navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
