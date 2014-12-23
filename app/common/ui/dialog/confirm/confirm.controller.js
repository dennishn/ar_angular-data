(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:ConfirmCtrl
	 * @description
	 * # ConfirmCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('Confirm', Confirm);

    /* @ngInject */
	function Confirm($modalInstance, message) {
		/*jshint validthis: true */
        var vm = this;

        vm.message = message;

        vm.confirm = confirm;
        vm.cancel = cancel;

        function confirm() {
            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss();
        }

	};

})();
