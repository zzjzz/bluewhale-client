(function () {
    'use strict';

    angular
        .module('app.states.service', [
            'app.states.service.user',
            'app.states.service.shop',
            'app.states.service.product'
        ])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('service', {
                abstract: true,
                parent: 'defaultLayout',
                url: '/service',
                template: '<ui-view/>',
                data: {
                    title: '平台服务'
                }
            });
    }
})();