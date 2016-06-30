(function () {

    angular.module('app').controller('CityCtrl', ['$scope', '$stateParams', 'WeatherCoordinates', 'WeatherTwitter', function($scope, $stateParams, WeatherCoordinates, WeatherTwitter){

        $scope.city = null;
        $scope.twitter = null;

        WeatherCoordinates.get({
            'lat': $stateParams.lat,
            'lon': $stateParams.lon
        }, function(success, error) {
            if (success) {
                $scope.city = success;
            }
        });

        WeatherTwitter.get({
            'lat': $stateParams.lat,
            'lon': $stateParams.lon
        }, function(success, error) {
            if (success) {
                $scope.twitter = success;
                setTimeout(twttr.widgets.load, 100);
                //twttr.widgets.load();
            }
        });

    }]);

})();
