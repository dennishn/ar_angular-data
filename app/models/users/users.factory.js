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
        function Users($resource, $cacheFactory, $q, _, logger, User) {

            var service = {
                // Return collection [cRud]
                query: query,
                // Return single model [cRud]
                get: get,
                // Save or Update single model [CrUd]
                save: save,
                // Delete single model
                remove: remove,
                // Client side collection (for caching, client-side storage etc.)
                collection: []
            };


            /*
                Each data-collection should have it's own cache entry.
                This makes it easier to adapt for non-memory caches (IndexDB, LocalStorage, Session).
                usage: $cacheFactory(id, number(LRU cache))
                docs: https://docs.angularjs.org/api/ng/service/$cacheFactory
             */
            var cache = $cacheFactory('Users');


            /*
                Angular <---> MongoLabs communication definition
                usage: $resource(url, default parameters, actions, options(dont bother with this) )
                docs: https://docs.angularjs.org/api/ngResource/service/$resource
             */
            var resource = $resource('https://api.mongolab.com/api/1/databases/sandbox/collections/users/:id',
                // MongoLabs requires an API key in ALL api communcation, we
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
                    },
                    'save': {
                        method: 'POST'
                    },
                    // Add PUT method since it's not available by default
                    'update': {
                        method: 'PUT',
                        params: {
                            id: '@id'
                        }
                    },
                    'remove': {
                        method: 'DELETE'
                    }
                }
            );

            /**
             * @ngdoc method
             * @name query
             * @requires $cacheFactory, $resource, lo-dash, $q, User
             * @param {object} params
             * @returns {Promise} The newly created promise
             *
             * @description
             * Queries a given endpoint defined in resource.
             * The endpoint must return an array of objects.
             *
             * When data is received, it is compared to the current collection.
             * If a match is found, the item is updates.
             * If a match is not found, a User is constructed with the User factory.
             * Lastly, the cache item gets put or created.
             */
            function query(params) {

                params = params || {};

                var deferred = $q.defer();

                resource.query(params).$promise.then(function(results) {

                    _.each(results, function(model) {

                        var existingModel = _.find(service.collection, function(item) {
                            return item._id.$oid == model._id.$oid;
                        });

                        if(existingModel) {

                            angular.extend(existingModel, model);

                            cache.put(existingModel._id.$oid, existingModel);

                        } else {

                            var newUser = new User(model);

                            service.collection.push(newUser);

                            cache.put(newUser._id.$oid, newUser);

                        }

                    });

                    deferred.resolve(service.collection);

                });

                return deferred.promise;

            }

            /**
             * @ngdoc method
             * @name get
             * @requires $cacheFactory, $resource, lo-dash, $q, User
             * @param {object} params
             * @returns {Promise} The newly created promise
             *
             * @description
             * Queries a given endpoint defined in resource.
             * The endpoint must return an object.
             *
             * When data is received, it is compared to the current collection
             * If an item already exists in the internal collection,
             * the item gets the returned data merged into it.
             * If the item does not exist, a User is constructed with the User factory.
             * Lastly, the cache item gets put or created.
             */
            function get(params) {

                params = (typeof params == 'string') ? {id: params} : params;

                var deferred = $q.defer();

                resource.get(params).$promise.then(function(model) {

                    var existingModel = _.find(service.collection, function(item) {
                        return item._id.$oid == model._id.$oid;
                    });

                    if(existingModel) {

                        angular.extend(existingModel, model);

                        cache.put(existingModel._id.$oid, existingModel);

                        deferred.resolve(existingModel);

                    } else {

                        var newUser = new User(model);

                        service.collection.push(newUser);

                        cache.put(newUser._id.$oid, newUser);

                        deferred.resolve(newUser);

                    }

                });

                return deferred.promise;

            }

            /**
             * @ngdoc method
             * @name save
             * @requires $cacheFactory, $resource, lo-dash, $q, User
             * @param {object} model
             * @returns {Promise} The newly created promise
             *
             * @description
             * If the model parameter contains the primary key: _id.$oid
             * the item is sent to the database by PUT.
             * If the model parameter does not container the primary key: _id.$oid
             * the item is sent to the database by POST.
             *
             * If the item already exists,
             * the response gets merged into this item and is added to the collection
             *
             * If the item does not exist, a User is constructed with the User factory,
             * and is merged with the response.
             * This is done because MongoLabs adds the primary key upon creation,
             * and this key is needed later on for updating and identifying this resource.
             * Lastly, the cache item gets put or created.
             */
            function save(model) {

                var deferred = $q.defer();

                if(model._id) {

                    if(!model._id.$oid) {

                        var error = {
                            message: 'Missing $oid!',
                            title: 'Model ID Error'
                        };

                        logger.error(error.message, null, error.title);

                        deferred.reject(error.message);

                    } else {

                        resource.update({id: model._id.$oid}).$promise.then(function(model) {

                            var item = _.find(service.collection, function(item) {
                                return item._id.$oid == model._id.$oid;
                            });

                            angular.extend(item, model);

                            cache.put(item._id.$oid, item);

                            deferred.resolve(item);

                        });

                    }

                } else {

                    resource.save(model).$promise.then(function(model) {

                        var newUser = new User(model);

                        service.collection.push(newUser);

                        cache.put(newUser._id.$oid, newUser);

                        deferred.resolve(newUser);

                    });

                }

                return deferred.promise;

            }

            /**
             * @ngdoc method
             * @name save
             * @requires $cacheFactory, $resource, lo-dash, $q, User
             * @param {object} model
             * @returns {Promise} The newly created promise
             *
             * @description
             * Deletes a given resource.
             *
             * When the item has been deleted remotely, it is removed from the cache
             * and from the internal collection.
             */
            function remove(id) {

                var deferred = $q.defer();

                if(!id) {

                    var error = {
                        message: 'Missing $oid!',
                        title: 'Model ID Error'
                    };

                    logger.error(error.message, null, error.title);

                    deferred.reject(error.message);

                } else {

                    resource.remove({id: id}).$promise.then(function() {

                        /*




                                SIDDER FAST HER :-)




                         */
                        _.remove(service.collection, function(_id) {
                            return _id == id;
                        });

                        cache.remove(id);

                        deferred.resolve(service.collection);

                    });

                }

                return deferred.promise;

            }

            return service;

        };

})();
