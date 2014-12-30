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
        .module('arAngularDataApp')
        .run(function($window, $rootScope) {

            $rootScope.isOnline = navigator.onLine;

            $window.addEventListener('offline', function() {
                $rootScope.$apply(function() {
                    $rootScope.$broadcast('navigatorOffline');
                    $rootScope.isOnline = false;
                });
            }, false);

            $window.addEventListener('online', function() {
                $rootScope.$apply(function() {
                    $rootScope.$broadcast('navigatorOnline');
                    $rootScope.isOnline = true;
                });
            }, false);

        });
})();
