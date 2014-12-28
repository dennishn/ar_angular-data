(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name arAngularDataApp.factory:User
     * @description
     * # User
     * Factory of the arAngularDataApp
     */
    angular
        .module('arAngularDataApp')
        .factory('User', User);

        /* @ngInject */
        function User() {

            var User = function(data) {

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

                this.fullName = function() {
                    return this.first_name + ' ' + this.last_name;
                }

            };

            return User;

        };

})();
