(function () {
    'use strict';

    angular
        .module('app.states.tools', [
            'app.states.tools.sms'
        ])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('tools', {
                abstract: true,
                parent: 'defaultLayout',
                url: '/tools',
                template: '<ui-view/>',
                data: {
                    title: '工具服务'
                }
            });
    }
})();