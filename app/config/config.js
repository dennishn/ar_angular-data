(function () {
    'use strict';

    var core = angular.module('config', ['core.exception', 'core.logger', 'angular-loading-bar', 'cgBusy', 'hj.gsapifyRouter']);

    var config = {
        appErrorPrefix: '[NG-Modular Error] ', //Configure the exceptionHandler decorator,
        appTitle: 'Title'
    }

    core.value('config', config);
    core.constant('toastr', toastr);

    core.value('cgBusyDefaults', {
        message:'Loading Stuff',
        backdrop: true,
        templateUrl: '../common/core/loadingindicator/loadingindicator.template.html'
    });

    core.config(configure);

    /* @ngInject */
    function configure($logProvider, exceptionHandlerProvider, $stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, gsapifyRouterProvider, APP_ENV) {

        if($logProvider.debugEnabled && APP_ENV === 'development') {
            $logProvider.debugEnabled(true);
        } else {
            $logProvider.debugEnabled(false);
        }

        exceptionHandlerProvider.configure(config.appErrorPrefix);

        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 600;

        gsapifyRouterProvider.defaults = {
            enter: 'right',
            leave: 'left'
        };

        $locationProvider.html5Mode(true);
        //$urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('notfound', {
                url: '/404',
                templateUrl: '404.html'
            })
            .state('error', {
                url: '/503',
                templateUrl: '503.html'
            });

        // Hardcore MongoLabs API of doom
        //DSHttpAdapterProvider.defaults.basePath = 'https://api.mongolab.com/api/1/databases/sandbox/collections';
        //DSHttpAdapterProvider.defaults.queryTransform = function (resourceName, params) {
        //    params.apiKey = 'ztditW8VtqvTMRyV6jdQzWb0i_8WBJgJ';
        //    return params;
        //};
        //angular.extend(DSHttpAdapterProvider.defaults.$httpConfig, {
        //    params: {
        //        apiKey: 'ztditW8VtqvTMRyV6jdQzWb0i_8WBJgJ'
        //    }
        //});
        //
        //// Global Cache Settings
        //DSCacheFactoryProvider.setCacheDefaults({
        //    maxAge: 6000,
        //    deleteOnExpire: 'aggressive',
        //    onExpire: function(key, value) {
        //        console.log('Global Cache Expire: ', key, value);
        //    }
        //});

    }

})();
