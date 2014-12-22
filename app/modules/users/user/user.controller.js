(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:VideoCtrl
	 * @description
	 * # VideoCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('Video', Video);

    /* @ngInject */
	function Video() {
		/*jshint validthis: true */
        var vm = this;

        activate();

        function activate() {

        };
	};

})();