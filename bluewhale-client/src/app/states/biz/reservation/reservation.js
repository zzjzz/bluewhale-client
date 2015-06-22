(function () {
    'use strict';

    angular
        .module('app.states.biz.reservation', [])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('biz.reservation', {
                abstract: true,
                url: '/reservations',
                template: '<ui-view/>',
                data: {
                    title: '预订单管理'
                }
            })
            .state('biz.reservation.index', {
                url: '?q&{page:int}',
                templateUrl: 'states/biz/reservation/reservation-index.html',
                resolve: {
                    pageData: ['$stateParams', 'ReservationIndexResolver', function ($stateParams, resolver) {
                        return resolver.getPageData($stateParams.page, $stateParams.q);
                    }]
                },
                controller: 'ReservationIndexController as vm',
                data: {
                    title: '预订单列表'
                }
            })
            .state('biz.reservation.view', {
                url: '/{reservationId:string}',
                resolve: {
                    reservation: ['$stateParams', 'ReservationResource', function ($stateParams, ReservationResource) {
                        return ReservationResource.get($stateParams).$promise;
                    }]
                },
                templateUrl: 'states/biz/reservation/reservation-view.html',
                controller: 'ReservationViewController as vm',
                data: {
                    title: '预订单详情'
                }
            })
            .state('biz.reservation.action', {
                url: '/{reservationId:string}/{actionName:string}',
                resolve: {
                    transId: ['$state', function ($state) {
                        return $state.transitionId;
                    }],
                    reservation: ['$stateParams', 'ReservationActionResolver', function ($stateParams, resolver) {
                        return resolver.getReservationById($stateParams.reservationId);
                    }],
                    actionName: ['$stateParams', function ($stateParams) {
                        return $stateParams.actionName;
                    }],
                    modal: ['$state', '$q', 'ReservationActionResolver', 'transId', 'reservation', 'actionName', function ($state, $q, resolver, transId, reservation, actionName) {
                        // 只有当发起state和当前state一致时才输出Modal
                        // 避免同时创建多个Modal实例
                        if ($state.transitionId === transId) {
                            resolver.openModal(reservation, actionName);
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