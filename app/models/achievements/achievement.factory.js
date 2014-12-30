(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name arAngularDataApp.factory:Achievement
     * @description
     * # Achievement
     * Factory of the arAngularDataApp
     */
    angular
        .module('arAngularDataApp')
        .factory('Achievement', Achievement);

        /* @ngInject */
        function Achievement() {

            var Achievement = function(data) {

                // Default properties
                angular.extend(this, {
                    lastFetched: new Date()
                });

                // Merge with server-side data
                angular.extend(this, data);

                // Methods
                this.updateLastFetched = function() {
                    this.lastFetched = new Date();
                };

            };

            return Achievement;

        };

})();
