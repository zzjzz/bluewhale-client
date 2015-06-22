(function () {
    'use strict';

    angular
        .module('app.states.system', [])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('system', {
                abstract: true,
                parent: 'defaultLayout',
                url: '/system',
                template: '<ui-view/>',
                data: {
                    title: '系统设置'
                }
            })
            .state('system.index', {
                url: '',
                templateUrl: 'states/system/index.html'
            });
    }
})();