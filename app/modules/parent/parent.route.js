'use strict';

/**
 * @ngdoc route
 * @name arAngularDataApp.route:parent
 * @function
 * @description
 * # parent
 * Route in the arAngularDataApp.
 */
angular.module('arAngularDataApp')
    /* @ngInject */
    .config(function ($stateProvider) {

        var parent = {
            name: 'parent',
            url: '',
            abstract: true,
            views: {
                'main': {
                    templateUrl: 'modules/parent/parent.template.html',
                    controller: 'Parent',
                    controllerAs: 'parent'
                },
                'navigation': {
                    templateUrl: 'modules/navigation/navigation.template.html',
                    controller: 'Navigation',
                    controllerAs: 'navigation'
                }
            }
        };

        $stateProvider.state(parent);
    });
