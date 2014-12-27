(function() {
    'use strict';

    /**
     * @ngdoc route
     * @name arAngularDataApp.route:users
     * @function
     * @description
     * # users
     * Route in the arAngularDataApp.
     */
    angular.module('arAngularDataApp')
        /* @ngInject */
        .config(function ($stateProvider) {

            var users = {
                name: 'parent.users',
                url: '/users',
                abstract: true,
                views: {
                    'content': {
                        templateUrl: 'modules/users/users.template.html',
                        controller: 'UsersCtrl',
                        controllerAs: 'users'
                    }
                }
            };

            var list = {
                name: 'parent.users.list',
                url: '',
                views: {
                    'content@parent': {
                        templateUrl: 'modules/users/list/list-users.template.html',
                        controller: 'ListUsers',
                        controllerAs: 'list'
                    }
                },
                resolve: {
                    users: function(Users) {
                        /*
                         Return the data from the resolved promise (Loads view more slowly, but has data on-load)
                         */
                        return Users.query().then(function(users) {
                            return users;
                        });
                    }
                }
            };

            var create = {
                name: 'parent.users.list.create',
                url: '/create',
                views: {
                    'sidebar-right@parent': {
                        templateUrl: 'modules/users/create/create-user.template.html',
                        controller: 'CreateUser',
                        controllerAs: 'create'
                    }
                }
            };

            var single = {
                name: 'parent.users.single',
                url: '/:id',
                views: {
                    'content@parent': {
                        templateUrl: 'modules/users/single/single-user.template.html',
                        controller: 'User',
                        controllerAs: 'user'
                    }
                },
                resolve: {
                    /*
                     In order to show an example of loading, following code is disabled.
                     Refer to singe-user.controller.js instead.
                     */
                    //user: function($stateParams, Users) {
                    //    return Users.get($stateParams.id).then(function(user) {
                    //        return user;
                    //    });
                    //}
                }
            };

            $stateProvider.state(users);
            $stateProvider.state(list);
            $stateProvider.state(single);

            $stateProvider.state(create);

        });
})();
