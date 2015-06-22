(function () {
    'use strict';

    angular
        .module('app.states.biz', [
            'app.states.biz.reservation'
        ])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('biz', {
                abstract: true,
                parent: 'defaultLayout',
                url: '/biz',
                template: '<ui-view/>',
                data: {
                    title: '业务管理'
                }
            });
    }
})();