(function () {
    'use strict';

    angular
        .module('app.states.analytics', [])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('analytics', {
                abstract: true,
                parent: 'defaultLayout',
                url: '/analytics',
                template: '<ui-view/>',
                data: {
                    title: '数据分析'
                }
            })
            .state('analytics.index', {
                url: '',
                templateUrl: 'states/analytics/index.html'
            });
    }
})();