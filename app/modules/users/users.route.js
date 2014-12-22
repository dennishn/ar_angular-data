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
                templateUrl: 'modules/users/users.template.html',
                controller: 'UsersCtrl',
                controllerAs: 'users',
                resolve: {
                    users: function(Users) {

                        /*
                            We have two options here

                            1: Return just the promise and let the controllers handle the resolve (Loads view quicker, but no data on-load)

                         */
                        //var VideoPromise = users.query();
                        //return VideoPromise.$promise;

                        /*
                            2: Return the data from the resolved promise (Loads view more slowly, but has data on-load)
                        */
                        return Users.findAll().then(function(users) {
                            return users;
                        });
                        //users.query().$promise.then(function(results) {
                        //    console.log(results);
                        //})
                        //return users.query().$promise.then(function(results) {
                        //    return results;
                        //});
                    }
                }
            };

            $stateProvider.state(users);
        });
})();
