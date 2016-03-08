window.onload = getMyLocation;
var watchId = null;

function getMyLocation() {
    if(navigator.geolocation) {
      //navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchLocation = document.getElementById("clearWatch");
        clearWatchLocation.onclick = clearWatch;
    }else {
        alert("Oops, No geolocation support");
    }
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch() {
    if(watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function displayLocation(position) {
    var ourCoords = {
        latitude : 47.624851,
        longitude : -122.52099
    }
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at latitude: "+ latitude + ", Longitude: "+longitude;
    div.innerHTML += " (with "+position.coords.accuracy+" meters accuracy)";
    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + "km from the WickedlySmart HQ";

    if(map === null) {
        showMap(position.coords);    
    }
}

function displayError(error) {
    var errorType = {
        0 : "Unknown error",
        1 : "Permission denied by user",
        2 : "Position is not available",
        3 : "Request time out"
    };
    var errorMessage = errorType[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMesage = errorMssage + " " + error.message;
    }

    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, endCoords) {
    var startLaRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);

    var destLaRads = degreesToRadians(endCoords.latitude);
    var destLongRads = degreesToRadians(endCoords.longitude);

    var Radius = 6371;

    var distance = Math.acos(Math.sin(startLaRads) * Math.sin(destLaRads) +
                             Math.cos(startLaRads) * Math.cos(destLaRads) *
                             Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
}

var map;

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom : 18,
        center : googleLatAndLong,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    }

    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);

    var title = "My Location";
    var content = "My Location is: "+coords.latitude + ", " +coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content){
    var markerOptions = {
        position : latlong,
        map : map,
        title : title,
        clickable : true
    }

    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content : content,
        position : latlong
    }

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, "click", function(){
       infoWindow.open(map);
    });
}
