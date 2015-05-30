/// <reference path="/public/js/main.js" /> 

/*
 * Location and GPS script
 */

(function () {

    var locations;

    main.Locations = Object.inherit({

        initialize: function () {
            locations = this;
            this.radiusOfEarthInMiles = 6384;
        },

        startUpdating: function (callback) {
            locations.callback = callback;
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(locations.updateUIForPosition, locations.error, { timeout: 2500 });
            }
            else {
                locations.callback();
            }
        },

        distanceFromCompany: function (companyPosition) {
            var distance = locations.distanceInMiles(locations.myPosition, companyPosition);
            return Math.floor(distance);
        },

        updateUIForPosition: function (position) {
            locations.myPosition = position.coords;
            locations.callback();
        },

        getLatLong: function () {
            return locations.myPosition;
        },

        error: function (error) {
            // Can't determine location
            locations.myPosition = { latitude: 0, longitude: 0 };
            locations.callback();
        },

        radians: function (degrees) {
            return degrees * Math.PI / 180;
        },

        distanceInMiles: function (p1, p2) {

            // We had an error getting the GPS coordinates
            if (p1.latitude == 0 && p1.longitude == 0)
                return -1;

            var lat1 = p1.latitude; // inputs are in decimal degrees
            var lon1 = p1.longitude;
            var lat2 = p2.latitude;
            var lon2 = p2.longitude;

            var dLat = locations.radians(lat2 - lat1);
            var dLon = locations.radians(lon2 - lon1);
            lat1 = locations.radians(lat1);
            lat2 = locations.radians(lat2);

            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return locations.radiusOfEarthInMiles * c;
        }

    });

    var Locations = main.Locations;
    Locations.create();

})();

