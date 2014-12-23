(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name oompApp.factory:Uuid
     * @description
     * # Uuid
     * Factory of the oompApp
     */
    angular
        .module('arAngularDataApp')
        .factory('UUID', uuid);

    /* @ngInject */
    function uuid() {

        var service = {
            generate: generate,
            empty: empty
        };

        return service;

        function generate() {
            function _p8(s) {
                var p = (Math.random().toString(16)+'000000000'.substr(2,8));
                return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        }

        function empty() {
            return '00000000-0000-0000-0000-000000000000';
        }
    };

})();
