(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:LandingPageCtrl
	 * @description
	 * # LandingPageCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('LandingPage', LandingPage);

    /* @ngInject */
	function LandingPage() {
		/*jshint validthis: true */
        var vm = this;

        activate();

        function activate() {

        };
	};

})();