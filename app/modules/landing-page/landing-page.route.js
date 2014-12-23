'use strict';

/**
 * @ngdoc route
 * @name arAngularDataApp.route:landingPage
 * @function
 * @description
 * # landingPage
 * Route in the arAngularDataApp.
 */
angular.module('arAngularDataApp')
    /* @ngInject */
    .config(function ($stateProvider) {

        var landingPage = {
            name: 'parent.landing-page',
            url: '/',
            views: {
                'content@parent': {
                    templateUrl: 'modules/landing-page/landing-page.template.html',
                    controller: 'LandingPage',
                    controllerAs: 'landing-page'
                }
            }
        };

        $stateProvider.state(landingPage);
    });
