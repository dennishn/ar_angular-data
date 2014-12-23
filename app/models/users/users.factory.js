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
        function Users(DS, UUID) {

            var Users = DS.defineResource({
                name: 'Users',
                idAttribute: 'id',
                endpoint: '/users',
                baseUrl: 'https://api.mongolab.com/api/1/databases/sandbox/collections',
                /*
                Angular-data does not support "primary keys" in a nested object, so we return the value of this nested object
                and bind it to the resource idAttribute.
                 */
                computed: {
                    id: function(_id) {
                        return _id.$oid;
                    }
                },
                /*
                Example static method (We could probably also do this specific task in the computed properties
                 */
                methods: {
                    fullName: function() {
                        return this.first_name + ' ' + this.last_name;
                    }
                }

                //beforeValidate: function(resourceName, attrs, cb) {
                //    console.log('Before validate function, ', resourceName, attrs, cb);
                //    return;
                //},
                //validate: function(resourceName, attrs, cb) {
                //    console.log('Validate function, ', resourceName, attrs, cb);
                //    return;
                //},
                //afterValidate: function(resourceName, attrs, cb) {
                //    console.log('After validate function, ', resourceName, attrs, cb);
                //    return;
                //},
                //beforeCreate: function(resourceName, attrs, cb) {
                //    if(!attrs.id) {
                //        attrs.id = UUID.generate();
                //    }
                //
                //    cb(null, attrs);
                //},
                //afterCreate: function(resourceName, attrs, cb) {
                //    console.log('After create function, ', resourceName, attrs, cb);
                //    return;
                //},
                //beforeUpdate: function(resourceName, attrs, cb) {
                //    console.log('Before update function, ', resourceName, attrs, cb);
                //    return;
                //},
                //afterUpdate: function(resourceName, attrs, cb) {
                //    console.log('After update function, ', resourceName, attrs, cb);
                //    return;
                //},
                //beforeDestroy: function(resourceName, attrs, cb) {
                //    console.log('Before destroy function, ', resourceName, attrs, cb);
                //    return;
                //},
                //afterDestroy: function(resourceName, attrs, cb) {
                //    console.log('After destroy function, ', resourceName, attrs, cb);
                //    return;
                //},
                //beforeInject: function(resourceName, attrs) {
                //    console.log('Before inject function, ', resourceName, attrs);
                //    return;
                //},
                //afterInject: function(resourceName, attrs) {
                //    console.log('After inject function, ', resourceName, attrs);
                //    return;
                //}
            });

            return Users;

        };

})();
