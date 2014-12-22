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
	  	.controller('UsersCtrl', UsersCtrl);

    /* @ngInject */
	function UsersCtrl(users, $modal) {
		/*jshint validthis: true */
        var vm = this;
        console.log('controller')
        /*
            Resolved data, provided by the route
        */
        vm.users = users;

        // C in crud
        vm.create = create;
        // D in crud - 'delete' is reserved
        //vm.remove = remove;

        function create() {

            var modalInstance = $modal.open({
                templateUrl: 'modules/users/create/create-user.template.html',
                controller: 'CreateUser as dialog',
                windowClass: 'medium'
            });

            modalInstance.result.then(function(user) {
                //
            });

        }




	};

})();
