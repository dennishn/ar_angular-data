(function () {
'use strict';

	/**
	 * @ngdoc function
	 * @name arAngularDataApp.controller:CreateVideoCtrl
	 * @description
	 * # CreateVideoCtrl
	 * Controller of the arAngularDataApp
	 */
	angular
		.module('arAngularDataApp')
	  	.controller('CreateVideo', CreateVideo);

    /* @ngInject */
	function CreateVideo($modalInstance, Videos) {
		/*jshint validthis: true */
        var vm = this;

        console.log(Videos)

        /*
            View Methods

            submit: close modal, return video
            interacted: use this to make the form validation less aggressive
            hasError: use this to toggle the labels error classes
            cancel: close modal, return nothing
         */
        vm.submit = submit;
        vm.interacted = interacted;
        vm.hasError = hasError;
        vm.cancel = cancel;

        // validation flag
        vm.formSubmitted = false;

        //

        function submit() {
            vm.formSubmitted = true;

            if(vm.createForm.$invalid) return;

            /*
                We have two options here

                1: Return the video view-model, and handle API communication in the view instead of the modal

             */
            //$modalInstance.close(vm.video);

            /*
                2: Create the instance straight away, then close the modal returning the created resource (from the API)
             */
            vm.createForm.$pending = true;

            var video = new Videos(vm.video);

            video.$save().then(function(result) {
                $modalInstance.close(result);
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
            $modalInstance.dismiss();
        }

	};

})();
