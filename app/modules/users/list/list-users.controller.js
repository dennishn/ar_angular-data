(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:ListUserCtrl
	 * @description
	 * # ListUserCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('ListUsers', ListUsers);

    /* @ngInject */
	function ListUsers(Users, $modal, DS, $scope) {
		/*jshint validthis: true */
        var vm = this;

        /*
         Even though we resolve the Users data on the load, we should still make sure keep our view-model in "sync".
         We do this by watching the last modified attribute of the resource, and binding the Users collection to our view model.

         Watching attributes always requires injecting $scope in to the controller. This is intended behavior.
         */
        $scope.$watch(function() {
            return DS.lastModified('Users');
        }, function(value) {
            vm.users = DS.filter('Users');
        });


        // U in crud
        vm.update = update;
        // D in crud - 'delete' is reserved
        vm.destroy = destroy;

        function update(id) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/users/update/update-user.template.html',
                controller: 'UpdateUser as dialog',
                windowClass: 'medium',
                resolve: {
                    user: function(Users) {
                        return Users.get(id);
                    }
                }
            });

            modalInstance.result.then(function(user) {
                //
            });

        }

        function destroy(id) {

            var modalInstance = $modal.open({
                templateUrl: 'common/ui/dialog/confirm/confirm.template.html',
                controller: 'Confirm as dialog',
                windowClass: 'medium',
                resolve: {
                    message: function() {
                        return {
                            context: 'alert',
                            header: 'Are you sure?',
                            body: 'You are about to delete a resource'
                        }
                    }
                }
            });

            modalInstance.result.then(function() {
                Users.destroy(id);
            });
        }

	};

})();
