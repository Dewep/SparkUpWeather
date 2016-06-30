(function () {

    /* Weather endpoints */

    angular.module('app.services').factory('WeatherCity', function($resource) {
        return $resource('/api/weather/city/:name/');
    });

    angular.module('app.services').factory('WeatherCoordinates', function($resource) {
        return $resource('/api/weather/coordinates/:lat,:lon/');
    });

    angular.module('app.services').factory('WeatherBbox', function($resource) {
        return $resource('/api/weather/bbox/:NE_lat,:NE_lon,:SW_lat,:SW_lon,:zoom/');
    });

})();
