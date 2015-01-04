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
        vm.editAchievement = editAchievement;
        vm.removeAchievement = removeAchievement;

        function createAchievement() {
            vm.createForm.$pending = true;

            Achievements.save(vm.achievement).then(function() {
                vm.createForm.$pending = false;
            });
        }

        function editAchievement(achievement) {

            vm.achievement = achievement;

        }

        function removeAchievement(achievement) {

            console.log(achievement);

            Achievements.remove(achievement);

        }


	};

})();
