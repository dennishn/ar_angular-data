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
	  	.controller('ListAchievements', ListAchievements);

    /* @ngInject */
	function ListAchievements(achievements, Achievements) {
		/*jshint validthis: true */
        var vm = this;

        vm.achievements = achievements;

        vm.createAchievement = createAchievement;

        function createAchievement() {
            vm.createForm.$pending = true;

            Achievements.save(vm.achievement).then(function(achievement) {
                vm.createForm.$pending = false;
            });
        }


	};

})();
