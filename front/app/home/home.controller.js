(function () {

    angular.module('app').controller('HomeCtrl', ['$scope', 'WeatherBbox', 'NgMap', '$timeout', function($scope, WeatherBbox, NgMap, $timeout){

        var promise_timeout = null;

        $scope.map = null;
        $scope.cities = [];
        $scope.city = null;

        /* Update weather of cities on the Map */
        var updateWeather = function() {
            if ($scope.map) {
                promise_timeout = null;
                var bounds = $scope.map.getBounds();
                var NE = bounds.getNorthEast();
                var SW = bounds.getSouthWest();
                WeatherBbox.get({
                    'NE_lat': NE.lat(),
                    'NE_lon': NE.lng(),
                    'SW_lat': SW.lat(),
                    'SW_lon': SW.lng(),
                    'zoom': $scope.map.getZoom()
                }, function(success, error) {
                    $scope.cities = [];
                    for (var i = 0; i < success.list.length; i++) {
                        var city = success.list[i];
                        $scope.cities.push({
                            "id": city.id,
                            "name": city.name,
                            "position": [city.coord.lat, city.coord.lon],
                            "icon": city.weather[0].icon,
                            "temp": city.main.temp
                        });
                    }
                });
            }
        };

        $scope.initMap = function(map) {
            $scope.map = map;
            updateWeather();
        };

        $scope.showDetail = function(e, city) {
            $scope.city = city;
            $scope.map.showInfoWindow.apply(this, [e, 'info-window']);
        };

        $scope.boundsChanged = function() {
            if ($scope.map) {
                if (promise_timeout) {
                    $timeout.cancel(promise_timeout);
                }
                promise_timeout = $timeout(updateWeather, 1000);
            }
        };

    }]);

})();
