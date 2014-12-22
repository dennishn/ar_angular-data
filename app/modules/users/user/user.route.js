(function() {
  'use strict';

  /**
   * @ngdoc route
   * @name arAngularDataApp.route:video
   * @function
   * @description
   * # video
   * Route in the arAngularDataApp.
   */
  angular.module('arAngularDataApp')
    /* @ngInject */
    .config(function ($stateProvider) {

      var video = {
        name: 'video',
        url: '/video',
        templateUrl: 'modules/videos\video/video.template.html',
        controller: 'Video',
        controllerAs: 'video'
      };

      $stateProvider.state(video);
    });
})();
