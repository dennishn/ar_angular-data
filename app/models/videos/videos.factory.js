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
        .factory('Videos', Videos);

        /* @ngInject */
        function Videos(DS, DSCacheFactory, DSHttpAdapter) {

            var Videos = DS.defineResource({
                name: 'Videos',
                idAttribute: '_id',
                endpoint: '/videos',
                baseUrl: 'https://api.mongolab.com/api/1/databases/sandbox/collections',

            });

            return Videos;

        };

})();
