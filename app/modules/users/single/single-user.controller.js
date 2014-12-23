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
	function User(user, Users) {
		/*jshint validthis: true */
        var vm = this;

        vm.user = user;
	};

})();
