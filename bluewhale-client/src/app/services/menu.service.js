(function () {
    'use strict';

    angular
        .module('app.services')
        .service('menu', menu);

    function menu($state, $q, $cacheFactory, $log, DatasetResource) {
        return {
            getNavItems: function () {
                return getMenuData().then(function (menuData) {
                    var items = [];
                    angular.forEach(menuData, function (item) {
                        var state = $state.get(item.state.name);
                        items.push({
                            title: item.title || (state.data && state.data.title ? state.data.title : state.name),
                            state: item.state,
                            navState: item.navState
                        });
                    });
                    return items;
                });
            },

            getSidebarItems: function () {
                return getMenuData().then(function (menuData) {
                    var curTopState = $state.toState.name.split('.').shift();
                    var items = [];
                    angular.forEach(menuData, function (item) {
                        if (item.state.name === curTopState) {
                            angular.forEach(item.children, function (subItem) {
                                var state = $state.get(subItem.state.name);
                                items.push({
                                    title: subItem.title || (state.data && state.data.title ? state.data.title : state.name),
                                    state: subItem.state,
                                    navState: subItem.navState
                                });
                            });
                        }
                    });
                    return items;
                });
            }
        };

        function getMenuData() {
            var deferred = $q.defer();
            var menuCache = $cacheFactory.get('menuCache');
            var menuData = null;

            // 初始化Cache Object
            if (!menuCache) {
                menuCache = $cacheFactory('menuCache');
            }

            // 查找Cache
            if (menuData = menuCache.get('menuData')) {
                deferred.resolve(menuData);
            } else {
                // 查找Dataset动态填充菜单
                DatasetResource.query({rows: 1e7}, function (datasets) {
                    menuData = populateMenuData(datasets.items);
                    menuCache.put('menuData', menuData);
                    deferred.resolve(menuData);
                }, function (httpResponse) {
                    deferred.reject(httpResponse.data.message);
                });
            }

            // 返回Promise
            return deferred.promise;
        }

        function populateMenuData(datasetsItems) {
            return [
                {
                    state: {name: 'content'},
                    navState: {name: 'content.dataset.index'},
                    children: [
                        {
                            state: {name: 'content.dataset'},
                            navState: {name: 'content.dataset.index'}
                        },
                        {
                            state: {name: 'content.revision'},
                            navState: {name: 'content.revision.index', params: {datasetId: datasetsItems.shift().id}}
                        }
                    ]
                },
                {
                    state: {name: 'biz'},
                    navState: {name: 'biz.reservation.index'},
                    children: [
                        {
                            state: {name: 'biz.reservation'},
                            navState: {name: 'biz.reservation.index'}
                        }
                    ]
                },
                {
                    state: {name: 'service'},
                    navState: {name: 'service.user.index'},
                    children: [
                        {
                            state: {name: 'service.user'},
                            navState: {name: 'service.user.index'}
                        },
                        {
                            state: {name: 'service.shop'},
                            navState: {name: 'service.shop.index'}
                        },
                        {
                            state: {name: 'service.product'},
                            navState: {name: 'service.product.index'}
                        }
                    ]
                },
                {
                    state: {name: 'tools'},
                    navState: {name: 'tools.sms.index'},
                    children: [
                        {
                            state: {name: 'tools.sms'},
                            navState: {name: 'tools.sms.index'}
                        }
                    ]
                },
                {
                    state: {name: 'analytics'},
                    navState: {name: 'analytics.index'},
                    children: [
                        {
                            state: {name: 'analytics.index'},
                            navState: {name: 'analytics.index'}
                        }
                    ]
                },
                {
                    state: {name: 'system'},
                    navState: {name: 'system.index'},
                    children: [
                        {
                            state: {name: 'system.index'},
                            navState: {name: 'system.index'}
                        }
                    ]
                }
            ];
        }
    }
})();