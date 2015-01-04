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
        function Achievements($resource, $localForage, $q, _, logger, Achievement, $rootScope, breeze) {

            var host = 'https://api.mongolab.com/api/1/databases/sandbox/collections/';
			//
            var namingConvention = new breeze.NamingConvention({
                serverPropertyNameToClient: function(serverPropertyName) {
                    return serverPropertyName;
                },
                clientPropertyNameToServer: function(clientPropertyName) {
                    return clientPropertyName;
                }
            });

            var metadataStore = new breeze.MetadataStore({
                namingConvention: namingConvention
            });

            var dataService = new breeze.DataService({
                serviceName: host,
                hasServerMetadata: false
            });

            var queryOptions = new breeze.QueryOptions({
                fetchStrategy: breeze.FetchStrategy.FromServer,
                mergeStrategy: breeze.MergeStrategy.OverwriteChanges
            });

            var saveOptions = new breeze.SaveOptions({
                allowConcurrentSaves: false
            });

            var manager = new breeze.EntityManager({
                dataService: dataService,
                metadataStore: metadataStore,
                queryOptions: queryOptions,
                saveOptions: saveOptions
            });

            var defaultParams= {
                apiKey: 'ztditW8VtqvTMRyV6jdQzWb0i_8WBJgJ'
            };

            var service = {
                query: query
            };

            return service;

            function query() {

                console.log('query', manager);

                return breeze.EntityQuery.from('achievements')
                    .withParameters(defaultParams)
                    .using(manager).execute()
                    .then(success)
                    .catch(function(error) {
                        logger.error(error.message, null, error.title);
                    });

                function success(data) {
                    console.log(data);
                    return data.results;
                }
            }

            //var service = {
            //    // Return collection [cRud]
            //    query: query,
            //    // Return single model [cRud]
            //    get: get,
            //    // Save or Update single model [CrUd]
            //    save: save,
            //    // Delete single model
            //    remove: remove,
            //    // Client side collection (for caching, client-side storage etc.)
            //    collection: [],
            //    offlineCollection: []
            //};
			//
			//
            ///*
			//
            // */
            //var cache = $localForage.createInstance({
            //    name: 'Achievements'
            //});
			//
            //$rootScope.$on('navigatorOffline', function() {
            //    alert('hahaha from le factory');
            //});
			//
            //console.log($localForage.instance('Achievements'));
			//
			//
            ///*
            //    Angular <---> MongoLabs communication definition
            //    usage: $resource(url, default parameters, actions, options(dont bother with this) )
            //    docs: https://docs.angularjs.org/api/ngResource/service/$resource
            // */
            //var resource = $resource('https://api.mongolab.com/api/1/databases/sandbox/collections/achievements/:id',
            //    // MongoLabs requires an API key in ALL api communcation, we
            //    {
            //        apiKey: 'ztditW8VtqvTMRyV6jdQzWb0i_8WBJgJ'
            //    },
            //    {
            //        'query': {
            //            method: 'GET',
            //            //cache: cache,
            //            isArray: true
            //        },
            //        'get': {
            //            method: 'GET',
            //            //cache: cache
            //        },
            //        'save': {
            //            method: 'POST'
            //        },
            //        // Add PUT method since it's not available by default
            //        'update': {
            //            method: 'PUT',
            //            params: {
            //                id: '@id'
            //            }
            //        },
            //        'remove': {
            //            method: 'DELETE'
            //        }
            //    }
            //);
			//
            ///**
            // * @ngdoc method
            // * @name query
            // * @requires $cacheFactory, $resource, lo-dash, $q, Achievement
            // * @param {object} params
            // * @returns {Promise} The newly created promise
            // *
            // * @description
            // * Queries a given endpoint defined in resource.
            // * The endpoint must return an array of objects.
            // *
            // * When data is received, it is compared to the current collection.
            // * If a match is found, the item is updates.
            // * If a match is not found, a Achievement is constructed with the Achievement factory.
            // * Lastly, the cache item gets put or created.
            // */
            //function query(params) {
			//
            //    params = params || {};
			//
            //    var deferred = $q.defer();
			//
            //    if($rootScope.isOnline) {
			//
            //        resource.query(params).$promise.then(function(results) {
			//
            //            _.each(results, function(model) {
			//
            //                var existingModel = _.find(service.collection, function(item) {
            //                    return item._id.$oid == model._id.$oid;
            //                });
			//
            //                if(existingModel) {
			//
            //                    angular.extend(existingModel, model);
			//
            //                    cache.setItem(existingModel._id.$oid, model);
			//
            //                } else {
			//
            //                    var newAchievement = new Achievement(model);
			//
            //                    service.collection.push(newAchievement);
			//
            //                    cache.setItem(model._id.$oid, model);
			//
            //                }
			//
            //            });
			//
            //            deferred.resolve(service.collection);
			//
            //        });
			//
            //    } else {
			//
            //        cache.keys().then(function(achievements) {
			//
            //            var promises = achievements.map(function (item) {
			//
            //                return cache.getItem(item);
			//
            //            });
			//
            //            $q.all(promises).then(function(results) {
			//
            //                _.each(results, function(model) {
			//
            //                    var newAchievement = new Achievement(model);
			//
            //                    service.collection.push(newAchievement);
			//
            //                });
			//
            //                deferred.resolve(service.collection);
			//
            //            });
			//
            //        });
			//
            //    }
			//
            //    return deferred.promise;
			//
            //}
			//
            ///**
            // * @ngdoc method
            // * @name get
            // * @requires $cacheFactory, $resource, lo-dash, $q, Achievement
            // * @param {object} params
            // * @returns {Promise} The newly created promise
            // *
            // * @description
            // * Queries a given endpoint defined in resource.
            // * The endpoint must return an object.
            // *
            // * When data is received, it is compared to the current collection
            // * If an item already exists in the internal collection,
            // * the item gets the returned data merged into it.
            // * If the item does not exist, a Achievement is constructed with the Achievement factory.
            // * Lastly, the cache item gets put or created.
            // */
            //function get(params) {
			//
            //    params = (typeof params == 'string') ? {id: params} : params;
			//
            //    var deferred = $q.defer();
			//
            //    resource.get(params).$promise.then(function(model) {
			//
            //        var existingModel = _.find(service.collection, function(item) {
            //            return item._id.$oid == model._id.$oid;
            //        });
			//
            //        if(existingModel) {
			//
            //            angular.extend(existingModel, model);
			//
            //            //cache.put(existingModel._id.$oid, existingModel);
			//
            //            deferred.resolve(existingModel);
			//
            //        } else {
			//
            //            var newAchievement = new Achievement(model);
			//
            //            service.collection.push(newAchievement);
			//
            //            //cache.put(newAchievement._id.$oid, newAchievement);
			//
            //            deferred.resolve(newAchievement);
			//
            //        }
			//
            //    });
			//
            //    return deferred.promise;
			//
            //}
			//
            ///**
            // * @ngdoc method
            // * @name save
            // * @requires $cacheFactory, $resource, lo-dash, $q, Achievement
            // * @param {object} model
            // * @returns {Promise} The newly created promise
            // *
            // * @description
            // * If the model parameter contains the primary key: _id.$oid
            // * the item is sent to the database by PUT.
            // * If the model parameter does not container the primary key: _id.$oid
            // * the item is sent to the database by POST.
            // *
            // * If the item already exists,
            // * the response gets merged into this item and is added to the collection
            // *
            // * If the item does not exist, a Achievement is constructed with the Achievement factory,
            // * and is merged with the response.
            // * This is done because MongoLabs adds the primary key upon creation,
            // * and this key is needed later on for updating and identifying this resource.
            // * Lastly, the cache item gets put or created.
            // */
            //function save(model) {
			//
            //    var deferred = $q.defer();
			//
            //    if(model._id) {
			//
            //        if(!model._id.$oid) {
			//
            //            var error = {
            //                message: 'Missing $oid!',
            //                title: 'Model ID Error'
            //            };
			//
            //            logger.error(error.message, null, error.title);
			//
            //            deferred.reject(error.message);
			//
            //        } else {
			//
            //            if($rootScope.isOnline) {
			//
            //                resource.update({id: model._id.$oid}).$promise.then(function(model) {
			//
            //                    var item = _.find(service.collection, function(item) {
            //                        return item._id.$oid == model._id.$oid;
            //                    });
			//
            //                    angular.extend(item, model);
			//
            //                    //cache.put(item._id.$oid, item);
			//
            //                    deferred.resolve(item);
			//
            //                });
			//
            //            } else {
			//
			//
			//
            //            }
            //        }
			//
			//
			//
			//
            //    } else {
			//
            //        console.log($rootScope.isOnline);
			//
            //        if($rootScope.isOnline) {
			//
            //            resource.save(model).$promise.then(function(model) {
			//
            //                var newAchievement = new Achievement(model);
			//
            //                service.collection.push(newAchievement);
			//
            //                cache.setItem(model._id.$oid, model);
			//
            //                deferred.resolve(newAchievement);
			//
            //            });
			//
            //        } else {
			//
            //            cache.setItem(model._id.$oid, model).then(function() {
            //                service.offlineCollection.push(model);
            //                service.collection.push(model);
            //            });
			//
            //        }
			//
            //    }
			//
            //    return deferred.promise;
			//
            //}
			//
            ///**
            // * @ngdoc method
            // * @name save
            // * @requires $cacheFactory, $resource, lo-dash, $q, Achievement
            // * @param {object} model
            // * @returns {Promise} The newly created promise
            // *
            // * @description
            // * Deletes a given resource.
            // *
            // * When the item has been deleted remotely, it is removed from the cache
            // * and from the internal collection.
            // */
            //function remove(id) {
			//
            //    var deferred = $q.defer();
			//
            //    if(!id) {
			//
            //        var error = {
            //            message: 'Missing $oid!',
            //            title: 'Model ID Error'
            //        };
			//
            //        logger.error(error.message, null, error.title);
			//
            //        deferred.reject(error.message);
			//
            //    } else {
			//
            //        resource.remove({id: id}).$promise.then(function() {
			//
            //            _.remove(service.collection, function(_id) {
            //                return _id._id.$oid == id;
            //            });
			//
            //            //cache.remove(id);
			//
            //            deferred.resolve(service.collection);
			//
            //        });
			//
            //    }
			//
            //    return deferred.promise;
			//
            //}
			//
            //return service;

        };

})();
