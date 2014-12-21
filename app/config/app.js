(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name arAngularDataApp
     * @description
     * # arAngularDataApp
     *
     * Main module of the application.
     */
    angular
        .module('arAngularDataApp', [

            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngTouch',
            'ngRoute',
            'ui.router',
            'config',
            'core.exception',
            'core.logger',
            'angular-loading-bar',
            'cgBusy',
            'angulartics',
            'angulartics.google.analytics',
            'hj.gsapifyRouter',
            'mm.foundation',
            'ngMessages',
            'angular-data.DSCacheFactory'

        ])
        .run(['$http', 'DSCacheFactory', function($http, DSCacheFactory) {

            DSCacheFactory('defaultCache', {
                cacheFlushInterval: 600000,
                storageMode: 'localStorage'
            });

            $http.defaults.cache = DSCacheFactory.get('defaultCache');
        }]);
})();
