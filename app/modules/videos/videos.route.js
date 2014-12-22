(function() {
    'use strict';

    /**
     * @ngdoc route
     * @name arAngularDataApp.route:videos
     * @function
     * @description
     * # videos
     * Route in the arAngularDataApp.
     */
    angular.module('arAngularDataApp')
        /* @ngInject */
        .config(function ($stateProvider) {

            var videos = {
                name: 'videos',
                url: '/videos',
                templateUrl: 'modules/videos/videos.template.html',
                controller: 'VideosCtrl',
                controllerAs: 'videos',
                resolve: {
                    videos: function(Videos) {

                        /*
                            We have two options here

                            1: Return just the promise and let the controllers handle the resolve (Loads view quicker, but no data on-load)

                         */
                        //var VideoPromise = Videos.query();
                        //return VideoPromise.$promise;

                        /*
                            2: Return the data from the resolved promise (Loads view more slowly, but has data on-load)
                        */
                        return Videos.findAll({}).then(function(result) {
                            return result;
                        });
                        //Videos.query().$promise.then(function(results) {
                        //    console.log(results);
                        //})
                        //return Videos.query().$promise.then(function(results) {
                        //    return results;
                        //});
                    }
                }
            };

            $stateProvider.state(videos);
        });
})();
