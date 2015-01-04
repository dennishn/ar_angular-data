(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:AchievementsCtrl
	 * @description
	 * # AchievementsCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('Achievements', Achievements);

    /* @ngInject */
	function Achievements() {
		/*jshint validthis: true */
        var vm = this;

        activate();

        function activate() {

        };
	};

})();