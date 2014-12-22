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
        function Users(DS, DSCacheFactory, DSHttpAdapter) {

            var Users = DS.defineResource({
                name: 'Users',
                idAttribute: 'id',
                endpoint: '/users',
                baseUrl: 'https://api.mongolab.com/api/1/databases/sandbox/collections',
                maxAge: 600,
                cacheFlushInterval: 300,
                deleteOnExpire: 'aggressive',
                storageMode: 'localStorage'
            });

            return Users;

        };

})();
