(function () {

    /* Our modules */
    angular.module('app.services', []);

    /* Application module */
    angular.module('app', [
        /** AngularJS dependencies **/
        'ngResource',

        /** Librairies **/
        'ui.router',
        'ui.bootstrap',
        'ngMap',

        /** Our modules **/
        'app.services',
    ]);

    angular.module('app').config(['$resourceProvider', function ($resourceProvider) {
        /* Do not strip trailing slashes */
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

})();
