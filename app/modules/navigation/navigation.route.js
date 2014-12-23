'use strict';

/**
 * @ngdoc route
 * @name arAngularDataApp.route:navigation
 * @function
 * @description
 * # navigation
 * Route in the arAngularDataApp.
 */
angular.module('arAngularDataApp')
    /* @ngInject */
    .config(function ($stateProvider) {

        var navigation = {
            name: 'parent.navigation',
            abstract: true,
            views: {
                'navigation': {
                    templateUrl: 'modules/navigation/navigation.template.html',
                    controller: 'Navigation',
                    controllerAs: 'navigation'
                },
                'navigation@parent': {
                    templateUrl: 'modules/navigation/navigation.template.html',
                    controller: 'Navigation',
                    controllerAs: 'navigation'
                },
                'navigation@': {
                    templateUrl: 'modules/navigation/navigation.template.html',
                    controller: 'Navigation',
                    controllerAs: 'navigation'
                }
            }
        };

        $stateProvider.state(navigation);
    });
