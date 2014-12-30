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
            'lodashAngularWrapper',
            'angular-loading-bar',
            'cgBusy',
            'angulartics',
            'angulartics.google.analytics',
            'hj.gsapifyRouter',
            'mm.foundation',
            'ngMessages',

            // Data Stores & Caching
            'LocalForageModule'
        ]);
})();
