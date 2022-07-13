window.onload = getMyLocation;

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + " , Longitude: " + longitude;
	div.innerHTML += " (with " + position.coords.accuracy + " meter accuracy) ";

	var km = computerDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
	if (map == null) {
		showMap(position.coords);
	}
}

function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position is not avilable",
		3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}

function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
}

function computerDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371;
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
				 Math.cos(startLatRads) * Math.cos(destLatRads) *
				 Math.cos(startLongRads-destLongRads)) * Radius;
	return distance;
}

var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
};

function getMyLocation() {
	if (navigator.geolocation) {
		var watchButton = document.getElementById("watch");
		watchButton.onclick = watchLocation;
		var clearWatchButton = document.getElementById("clearWatch");
		clearWatchButton.onclick = clearWatch;
	} else {
		alert("Oops, no geolocation support");
	}
}

var watchId = null;

function watchLocation() {
	watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch() {
	if (watchId) {
		navigator.geolocation.clearWatch(watchId);
		watchId = null;
	}
}

var map;

function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {
		zoom: 23,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	var title = "Your Location";
	var content = "You are here: " + coords.latitude + ", " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);
	
	var infoWindowOptions = {
		content: content,
		position: latlong
	};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
}
