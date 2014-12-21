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
        function Videos($resource) {

            var Videos = $resource('https://api.mongolab.com/api/1/databases/sandbox/collections/videos/:id', {

                // MongoLabs
                apiKey: 'ztditW8VtqvTMRyV6jdQzWb0i_8WBJgJ',
                id: '@_id.$oid'

            });

            return Videos;

        };

})();
