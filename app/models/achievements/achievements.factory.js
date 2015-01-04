(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name arAngularDataApp.factory:Achievements
     * @description
     * # Videos
     * Factory of the arAngularDataApp
     */
    angular
        .module('arAngularDataApp')
        .factory('Achievements', Achievements);

        /* @ngInject */
        function Achievements($resource, $localForage, $q, _, logger, Achievement, $rootScope) {

            var _inSync = false;
            var _expires = 10000;

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

             */
            var cache = $localForage.createInstance({
                name: 'achievements'
            });

            /*
                Angular <---> MongoLabs communication definition
                usage: $resource(url, default parameters, actions, options(dont bother with this) )
                docs: https://docs.angularjs.org/api/ngResource/service/$resource
             */
            var resource = $resource('https://api.mongolab.com/api/1/databases/sandbox/collections/achievements/:id',
                // MongoLabs requires an API key in ALL api communcation, we
                {
                    apiKey: 'ztditW8VtqvTMRyV6jdQzWb0i_8WBJgJ'
                },
                {
                    // Add PUT method since it's not available by default
                    'update': {
                        method: 'PUT',
                        params: {
                            id: '@id'
                        }
                    }
                }
            );

            function query(params) {

                params = params || {};

                var deferred = $q.defer();

                $q.when(cache.getItem('lastModified')).then(function(lastModified) {

                    if((Date.now() - lastModified) < _expires) {

                        var promises = [];

                        cache.getKeys().then(function(keys) {

                            _.each(keys, function(key) {
                                if(key != 'lastModified') {
                                    promises.push(cache.getItem(key));
                                }
                            });

                            $q.all(promises).then(function(results) {

                                service.collection = results;

                                deferred.resolve(service.collection);

                            });

                        })

                    } else {

                        resource.query(params).$promise.then(function(results) {

                            _.each(results, function(model) {

                                var existingModel = _.find(service.collection, function(item) {
                                    return item._id.$oid == model._id.$oid;
                                });

                                if(existingModel) {

                                    angular.extend(existingModel, model);

                                    cache.setItem(existingModel._id.$oid, model);

                                } else {

                                    var newAchievement = new Achievement(model);

                                    service.collection.push(newAchievement);

                                    cache.setItem(model._id.$oid, model);

                                }

                            });

                            cache.setItem('lastModified', Date.now()).then(function(result) {

                                deferred.resolve(service.collection);

                            });

                        });

                    }

                });



                return deferred.promise;

            }

            function get(params) {

                params = (typeof params == 'string') ? {id: params} : params;

                var deferred = $q.defer();

                $q.when(cache.getItem('lastModified')).then(function(lastModified) {

                    if((Date.now() - lastModified) < _expires) {

                        cache.getItem(params).then(function(model) {

                            var existingModel = _.find(service.collection, function(item) {
                                return item._id.$oid == model._id.$oid;
                            });

                            angular.extend(existingModel, model);

                            deferred.resolve(existingModel);

                        });

                    } else {

                        resource.get(params).$promise.then(function(model) {

                            var existingModel = _.find(service.collection, function(item) {
                                return item._id.$oid == model._id.$oid;
                            });

                            if(existingModel) {

                                angular.extend(existingModel, model);

                                cache.setItem(existingModel._id.$oid, model);

                                deferred.resolve(existingModel);

                            } else {

                                var newAchievement = new Achievement(model);

                                service.collection.push(newAchievement);

                                cache.setItem(model._id.$oid, model);

                                deferred.resolve(newAchievement);

                            }

                        });

                    }

                });

                return deferred.promise;

            }

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

                        resource.update(model).$promise.then(function(model) {

                            var existingModel = _.find(service.collection, function(item) {
                                return item._id.$oid == model._id.$oid;
                            });

                            angular.extend(existingModel, model);

                            cache.setItem(existingModel._id.$oid, model);

                            deferred.resolve(existingModel);

                        });

                    }

                } else {

                    resource.save(model).$promise.then(function(model) {

                        var newAchievement = new Achievement(model);

                        service.collection.push(newAchievement);

                        cache.setItem(model._id.$oid, model);

                        deferred.resolve(newAchievement);

                    });

                }

                return deferred.promise;

            }

            function remove(model) {

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

                        resource.remove({id: model._id.$oid}).$promise.then(function() {

                            _.remove(service.collection, function(item) {
                                return item._id.$oid == model._id.$oid;
                            });

                            cache.removeItem(model._id.$oid);

                            deferred.resolve(service.collection);

                        });

                    }

                }

                return deferred.promise;

            }

            return service;

        };

})();
