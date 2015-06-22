(function () {
    'use strict';

    angular
        .module('app.layouts', [])
        .config(configure)
        .run(run);

    function configure($stateProvider) {
        $stateProvider
            .state('baseLayout', {
                abstract: true,
                controller: 'BaseLayoutController as baseLayout',
                templateUrl: 'layouts/base-layout.html'
            })
            .state('basicLayout', {
                abstract: true,
                parent: 'baseLayout',
                resolve: {
                    manager: resolveManager,
                    navItems: function (menu) {
                        return menu.getNavItems();
                    }
                },
                controller: 'BasicLayoutController as basicLayout',
                templateUrl: 'layouts/basic-layout.html'
            })
            .state('defaultLayout', {
                abstract: true,
                parent: 'basicLayout',
                resolve: {
                    sidebarItems: function (menu) {
                        return menu.getSidebarItems();
                    }
                },
                controller: 'DefaultLayoutController as defaultLayout',
                templateUrl: 'layouts/default-layout.html'
            });
    }

    function resolveManager($q, $cacheFactory, ManagerResource) {
        var defered = $q.defer();
        var cacheKey = 'managerCache';
        var managerCache = $cacheFactory.get(cacheKey) || $cacheFactory(cacheKey);
        var manager = managerCache.get('manager');

        if (manager) {
            defered.resolve(manager);
        } else {
            ManagerResource.getCurrent(null, function(manager) {
                managerCache.put('manager', manager);
                defered.resolve(manager);
            });
        }

        return defered.promise;
    }

    function run($rootScope, $state, $stateParams, $timeout, config) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.pageTitle = config.appTitle;
        $rootScope.fullPageTitle = config.appTitle;

        $rootScope.$on('$stateChangeSuccess', updatePageTitle);

        function updatePageTitle(event, toState) {
            $timeout(function () {
                if (toState.data && toState.data.title) {
                    $rootScope.pageTitle = toState.data.title;
                    $rootScope.fullPageTitle = toState.data.title + ' - ' + config.appTitle;
                } else {
                    $rootScope.pageTitle = config.appTitle;
                    $rootScope.fullPageTitle = config.appTitle;
                }
            });
        }
    }
})();