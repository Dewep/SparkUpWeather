(function () {

    angular.module('app').controller('HeaderCtrl', ['$scope', 'WeatherCoordinates', function($scope, WeatherCoordinates){

        $scope.city = null;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                WeatherCoordinates.get({
                    'lat': position.coords.latitude,
                    'lon': position.coords.longitude
                }, function(success, error) {
                    if (success) {
                        $scope.city = success;
                    }
                });
            });
        }

    }]);

})();
