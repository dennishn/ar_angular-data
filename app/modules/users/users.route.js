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
                name: 'users',
                url: '/users',
                abstract: true,
                views: {
                    'main': {
                        templateUrl: 'modules/users/users.template.html',
                        controller: 'UsersCtrl',
                        controllerAs: 'users'
                    }
                }
            };

            var list = {
                name: 'users.list',
                url: '',
                views: {
                    'content': {
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
                        return Users.findAll().then(function(users) {
                            return users;
                        });
                    }
                }
            };

            var create = {
                name: 'users.list.create',
                url: '/create',
                views: {
                    'sidebar-right@users': {
                        templateUrl: 'modules/users/create/create-user.template.html',
                        controller: 'CreateUser',
                        controllerAs: 'create'
                    }
                }
            };

            var single = {
                name: 'users.single',
                url: '/:id',
                views: {
                    'content': {
                        templateUrl: 'modules/users/single/single-user.template.html',
                        controller: 'User',
                        controllerAs: 'user'
                    }
                },
                resolve: {
                    user: function($stateParams, Users) {
                        /*
                         Return the data from the resolved promise (Loads view more slowly, but has data on-load)
                         */
                        return Users.find($stateParams.id).then(function(user) {
                            return user;
                        });

                    }
                }
            };

            $stateProvider.state(users);
            $stateProvider.state(list);
            $stateProvider.state(single);

            $stateProvider.state(create);

        });
})();
