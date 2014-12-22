(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:VideosCtrl
	 * @description
	 * # VideosCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('VideosCtrl', VideosCtrl);

    /* @ngInject */
	function VideosCtrl($modal) {
		/*jshint validthis: true */
        var vm = this;
        console.log('controller')
        /*
            Resolved data, provided by the route
        */
        //vm.videos = videos;

        // C in crud
        vm.create = create;
        // D in crud - 'delete' is reserved
        //vm.remove = remove;

        function create() {

            var modalInstance = $modal.open({
                templateUrl: 'modules/videos/create/create-video.template.html',
                controller: 'CreateVideo as dialog',
                windowClass: 'medium'
            });

            modalInstance.result.then(function(video) {
                //
            });

        }




	};

})();
