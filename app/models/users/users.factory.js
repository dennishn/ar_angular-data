(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name arAngularDataApp.factory:Videos
     * @description
     * # Videos
     * Factory of the arAngularDataApp
     */
    angular
        .module('arAngularDataApp')
        .factory('Users', Users);

        /* @ngInject */
        function Users($resource, $cacheFactory, $q) {

            var service = {
                query: query,
                get: get
            };

            var cache = $cacheFactory('Users');

            var resource = $resource('https://api.mongolab.com/api/1/databases/sandbox/collections/users/:id',
                {
                    apiKey: 'ztditW8VtqvTMRyV6jdQzWb0i_8WBJgJ'
                },
                {
                    'query': {
                        method: 'GET',
                        cache: cache,
                        isArray: true
                    },
                    'get': {
                        method: 'GET',
                        cache: cache
                    }
                }
            );

            var User = function(data) {

                // Default properties
                angular.extend(this, {
                    lastFetched: new Date()
                });

                // Merge with server-side data
                angular.extend(this, data);

                // Methods
                this.fullName = function() {
                    return this.first_name + ' ' + this.last_name;
                }

            };

            function query() {

                var deferred = $q.defer();

                resource.query().$promise.then(function(results) {

                    for(var i = 0; i < results.length; i++) {
                        results[i] = new User(results[i]);
                    }

                    deferred.resolve(results);

                });

                return deferred.promise;

            }

            function get(id) {

                console.log('getting', id);

                var deferred = $q.defer();

                resource.get({id: id}).$promise.then(function(result) {

                    result = new User(result);

                    deferred.resolve(result);

                });

                return deferred.promise;

            }

            return service;

        };

})();
