(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:ParentCtrl
	 * @description
	 * # ParentCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('Parent', Parent);

    /* @ngInject */
	function Parent() {
		/*jshint validthis: true */
        var vm = this;
	};

})();
