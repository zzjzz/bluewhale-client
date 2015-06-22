(function () {
    'use strict';

    angular
        .module('app.states.content', [
            'app.states.content.dataset',
            'app.states.content.revision'
        ])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('content', {
                abstract: true,
                parent: 'defaultLayout',
                url: '/content',
                template: '<ui-view/>',
                data: {
                    title: '内容管理'
                }
            });
    }
})();