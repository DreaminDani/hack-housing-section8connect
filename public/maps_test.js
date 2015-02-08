"use strict";

var map;
var PROPERTY_SERVICE = "http://section8connect.herokuapp.com/properties";
var markerList = [];

window.onload = function() {
	/*var refreshButton = document.getElementById("refresh");
	refreshButton.onclick = refresh;*/

	document.getElementById("b0").onchange = refresh;
	document.getElementById("b1").onchange = refresh;
	document.getElementById("b2").onchange = refresh;
	document.getElementById("b3").onchange = refresh;
	document.getElementById("b4").onchange = refresh;
	document.getElementById("b5").onchange = refresh;
	document.getElementById("b6").onchange = refresh;

	document.getElementById("seattleHA").onchange = refresh;
	document.getElementById("kingHA").onchange = refresh;

	refresh();
};

function refresh() {
	// ----get input fields----
	//var numBeds = document.getElementById("numBeds").value;
	var numBaths = 0;//document.getElementById("numBaths").value;
	
	var seattleHA = 0;
	if (document.getElementById("seattleHA").checked) {
		seattleHA = 1
	}
	
	var kingHA = 0;
	if (document.getElementById("kingHA").checked) {
		kingHA = 1;
	}

	var amount = 0;//document.getElementById("amount").value;

	var numBeds = 0;
	if (document.getElementById("b0").checked) {
		numBeds = 0;
	} else if (document.getElementById("b1").checked) {
		numBeds = 1;
	} else if (document.getElementById("b2").checked) {
		numBeds = 2;
	} else if (document.getElementById("b3").checked) {
		numBeds = 3;
	} else if (document.getElementById("b4").checked) {
		numBeds = 4;
	} else if (document.getElementById("b5").checked) {
		numBeds = 5;
	} else if (document.getElementById("b6").checked) {
		numBeds = 6;
	}
	//-------------------------

	var propertyListRequest = new XMLHttpRequest();
	propertyListRequest.onload = function() {
		//populate google maps
		if (this.status == 200) {
			var propertyList = JSON.parse(this.responseText);
			for (var i = 0; i < propertyList.length; i++) {
				var property = propertyList[i];
				markerList[i] = new google.maps.Marker({
					position: new google.maps.LatLng(property.lat, property.long),
					map: map,
					title: property.name,
					icon: 'house_pointer.png'
				})
				markerList[i].propertyID = property.id;
				google.maps.event.addListener(markerList[i], 'click', popupWindow);
			}
		} else {
			console.log("ajax fail");
		}
	};
	propertyListRequest.open("GET", PROPERTY_SERVICE + ".json?numBeds=" + numBeds + "&numBaths=" + numBaths + "&seattleHA=" + seattleHA + "&kingHA=" + kingHA + "&amount=" + amount, true);
	propertyListRequest.send();
}

// pops up a window to show detailed info
function popupWindow() {
	window.location.href = "#locationInfoModal";
	var propertyInfoRequest = new XMLHttpRequest();
	propertyInfoRequest.onload = function() {
		if (this.status = 200) {
			var propInfo = JSON.parse(this.responseText);

			/*





			document.getElementById("limName").innerHTML = propInfo.name;
			document.getElementById("limAddress").innerHTML = propInfo.address;
			document.getElementById("limPrice").innerHTML = propInfo.price;
			document.getElementById("limBeds").innerHTML = propInfo.numBeds;
			document.getElementById("limBaths").innerHTML = propInfo.numBaths;
			document.getElementById("limHA").innerHTML = propInfo.housing_authority;
			document.getElementById("limLastUpdated").innerHTML = propInfo.updated_at;
			document.getElementById("limVacancies").innerHTML = propInfo.vacancies;*/
			var fieldArray = ["limName", "limAddress", "limPrice", "limBeds", "limBaths", "limHA", "limLastUpdated", "limVacancies"];
			var fieldArrayT = ["limNameT", "limAddressT", "limPriceT", "limBedsT", "limBathsT", "limHAT", "limLastUpdatedT", "limVacanciesT"];
			var propArray = [propInfo.name, propInfo.address, propInfo.price, propInfo.numBeds, propInfo.numBaths, propInfo.housing_authority, propInfo.updated_at, propInfo.vacancies];

			/*displayInfo(propInfo, "limName", "limNameT");
			displayInfo(propInfo, "limAddress", "limAddressT");
			displayInfo(propInfo, "limPrice", "limPriceT");
			displayInfo(propInfo, "limBeds", "limBedsT");
			displayInfo(propInfo, "limBaths", "limBathsT");
			displayInfo(propInfo, "limHA", "limHAT");
			displayInfo(propInfo, "limLastUpdated", "limLastUpdatedT");
			displayInfo(propInfo, "limVacancies", "limVacanciesT");*/

			for (var i = 0; i < fieldArray.length; i++) {
				if (!propArray[i] || propArray[i] == "") {
					document.getElementById(fieldArrayT[i]).classList.add("hidden");
				} else {
					document.getElementById(fieldArrayT[i]).classList.remove("hidden");
					document.getElementById(fieldArray[i]).innerHTML = propArray[i];
				}
			}
		} else {
			console.log("other ajax fail");
		}
	};
	propertyInfoRequest.open("GET", PROPERTY_SERVICE + "/" + this.propertyID + ".json");
	propertyInfoRequest.send();
}

// initializes the google maps api
function initialize() {
	var mapOptions = {
		center: { lat: 47.6097, lng: -122.3331},
		zoom: 10
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

// something
google.maps.event.addDomListener(window, 'load', initialize);