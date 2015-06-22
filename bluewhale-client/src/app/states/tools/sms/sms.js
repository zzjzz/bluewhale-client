(function () {
    'use strict';

    angular
        .module('app.states.tools.sms', [])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('tools.sms', {
                abstract: true,
                url: '/sms',
                template: '<ui-view/>',
                data: {
                    title: '短消息'
                }
            })
            .state('tools.sms.index', {
                url: '/index',
                templateUrl: 'states/tools/sms/sms-send.html',
                controller: 'SmsSendController as vm',
                data: {
                    title: '短消息发送'
                }
            });
    }
})();