(function () {
    'use strict';

    angular
        .module('app.states.dashboard', [])
        .config(configure);

    configure.$inject = [
        '$stateProvider'
    ];

    function configure($stateProvider) {
        $stateProvider
            .state('dashboard', {
                abstract: true,
                parent: 'basicLayout',
                url: '/',
                template: '<ui-view/>'
            })
            .state('dashboard.index', {
                url: '',
                templateUrl: 'states/dashboard/dashboard-index.html',
                controller: 'DashboardIndexController as vm'
            });
    }
})();