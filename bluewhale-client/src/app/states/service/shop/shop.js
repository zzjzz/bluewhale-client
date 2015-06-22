(function () {
    'use strict';

    angular
        .module('app.states.service.shop', [])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('service.shop', {
                abstract: true,
                url: '/shops',
                template: '<ui-view/>',
                data: {
                    title: '店铺资料'
                }
            })
            .state('service.shop.index', {
                url: '?q&{page:int}',
                resolve: {
                    shops: ShopsResolver
                },
                controller: 'ShopIndexController as vm',
                templateUrl: 'states/service/shop/shop-index.html',
                data: {
                    title: '店铺列表'
                }
            })
            .state('service.shop.view', {
                url: '/{shopId:int}',
                templateUrl: 'states/service/shop/shop-view.html',
                controller: 'ShopViewController as vm',
                resolve: {
                    shop: ShopResolver
                },
                data: {
                    title: '店铺详情'
                }
            })
            .state('service.shop.geo', {
                url: '/{shopId:int}/geo',
                resolve: {
                    transId: function ($state) {
                        return $state.transitionId;
                    },
                    shop: ShopResolver,
                    district: resolveDistrict,
                    modal: GeoModalResolver
                }
            });
    }

    function ShopsResolver($stateParams, $q, config, util, ShopResource) {
        var params = {
            q: $stateParams.q,
            rows: config.defItemsPerPage,
            page: util.isPositiveInt($stateParams.page) ? $stateParams.page : 1
        };
        return ShopResource.query(params).$promise.catch(function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function ShopResolver($stateParams, $q, ShopResource) {
        return ShopResource.get($stateParams).$promise.catch(function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function resolveDistrict($q, LocationResource, shop) {
        var params = {
            locationId: shop.location.id,
            recursive: 1,
            depth: 2
        };
        return LocationResource.getTree(params).$promise.catch(function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function GeoModalResolver($state, $modal, $q, transId, shop, district) {
        if ($state.transitionId === transId) {
            $modal.open({
                resolve: {
                    shop: function () {
                        return shop;
                    },
                    district: function () {
                        return district;
                    }
                },
                controller: 'ShopGeoController as vm',
                templateUrl: 'states/service/shop/shop-geo.html',
                backdrop: 'static'
            });
        }
        var deferred = $q.defer();
        deferred.reject('MODAL_STATE');
        return deferred.promise;
    }
})();