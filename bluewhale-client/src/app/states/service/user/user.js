(function () {
    'use strict';

    angular
        .module('app.states.service.user', [])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('service.user', {
                abstract: true,
                url: '/users',
                template: '<ui-view/>',
                data: {
                    title: '用户资料'
                }
            })
            .state('service.user.index', {
                url: '?q&{page:int}',
                templateUrl: 'states/service/user/user-index.html',
                resolve: {
                    pageData: ['$stateParams', 'UserIndexResolver', function ($stateParams, resolver) {
                        return resolver.getPageData($stateParams.page, $stateParams.q);
                    }]
                },
                controller: 'UserIndexController as vm',
                data: {
                    title: '用户列表'
                }
            })
            .state('service.user.view', {
                url: '/{userId:int}',
                resolve: {
                    user: ['$stateParams', 'UserResource', function ($stateParams, UserResource) {
                        return UserResource.get($stateParams).$promise;
                    }]
                },
                templateUrl: 'states/service/user/user-view.html',
                controller: 'UserViewController as vm',
                data: {
                    title: '用户详情'
                }
            })
            .state('service.user.password', {
                url: '/{userId:int}/password',
                resolve: {
                    transId: ['$state', function ($state) {
                        return $state.transitionId;
                    }],
                    user: ['$stateParams', 'UserPasswordResolver', function ($stateParams, resolver) {
                        return resolver.getUserById($stateParams.userId);
                    }],
                    modal: ['$state', '$q', 'UserPasswordResolver', 'transId', 'user', function ($state, $q, resolver, transId, user) {
                        // 只有当发起state和当前state一致时才输出Modal
                        // 避免同时创建多个Modal实例
                        if ($state.transitionId === transId) {
                            resolver.openModal(user);
                        }
                        // 返回失败的promise，阻止state继续切换
                        var deferred = $q.defer();
                        deferred.reject('MODAL_STATE');
                        return deferred.promise;
                    }]
                }
            });
    }
})();