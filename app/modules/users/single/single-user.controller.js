(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:UserCtrl
	 * @description
	 * # UserCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('User', User);

    /* @ngInject */
	function User(Users, $stateParams, $timeout) {
		/*jshint validthis: true */
        var vm = this;

        /*
        To help simulate long loading time, we force the resource to bypass fetching from the cache,
        and force it not to store the response in the cache.
        We also tell our "global loading bar" not to track this API call (2 loading indicators is ugh!)
         */
        vm.loadingPromise = Users.find($stateParams.id, {
            bypassCache: true,
            cacheResponse: false,
            ignoreLoadingBar: true
        });

        vm.loadingPromise.then(function(user) {
            vm.user = user;
        });

        //vm.user = user;

        // U in crud
        vm.update = update;

        // Interaction helpers
        vm.interacted = interacted;
        vm.hasError = hasError;
        vm.cancel = cancel;

        // validation flag
        vm.formSubmitted = false;

        function update() {
            vm.formSubmitted = true;

            if(vm.userForm.$invalid) return;

            /*
             Create the instance, then update the view reflecting the remote resource
             */
            vm.userForm.$pending = true;

            Users.update(vm.user._id.$oid, vm.user).then(function(user) {
                vm.user = user;
                vm.userForm.$pending = false;
            });

        }

        function interacted(field) {
            if(field) {
                return vm.formSubmitted || field.$dirty;
            }
        }

        function hasError(field) {
            if(field) {
                return field.$invalid && vm.interacted(field);
            }
        }

        function cancel() {
            $state.go('users.list');
        }
	};

})();
