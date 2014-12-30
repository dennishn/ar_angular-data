'use strict';

/**
 * @ngdoc route
 * @name arAngularDataApp.route:achievements
 * @function
 * @description
 * # achievements
 * Route in the arAngularDataApp.
 */
angular.module('arAngularDataApp')
    /* @ngInject */
    .config(function ($stateProvider) {

        var achievements = {
            name: 'parent.achievements',
            url: '/achievements',
            abstract: true,
            views: {
                'content': {
                    templateUrl: 'modules/achievements/achievements.template.html',
                    controller: 'Achievements',
                    controllerAs: 'achievements'
                }
            }
        };

        var list = {
            name: 'parent.achievements.list',
            url: '',
            views: {
                'content@parent': {
                    templateUrl: 'modules/achievements/list/list-achievements.template.html',
                    controller: 'ListAchievements',
                    controllerAs: 'list'
                }
            },
            resolve: {
                achievements: function(Achievements) {
                    /*
                     Return the data from the resolved promise (Loads view more slowly, but has data on-load)
                     */
                    return Achievements.query().then(function(achievements) {
                        return achievements;
                    });
                }
            }
        }

        $stateProvider.state(achievements);
        $stateProvider.state(list);
    });
