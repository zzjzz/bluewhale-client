(function () {
    'use strict';

    angular
        .module('app.states.service.product', [])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('service.product', {
                abstract: true,
                url: '/products',
                template: '<ui-view/>',
                data: {
                    title: '商品资料'
                }
            })
            .state('service.product.index', {
                url: '?q&{page:int}',
                resolve: {
                    products: resolveProducts
                },
                controller: 'ProductIndexController as vm',
                templateUrl: 'states/service/product/product-index.html',
                data: {
                    title: '商品列表'
                }
            })
            .state('service.product.view', {
                url: '/{productId:int}',
                resolve: {
                    product: resolveProduct
                },
                controller: 'ProductViewController as vm',
                templateUrl: 'states/service/product/product-view.html',
                data: {
                    title: '商品详情'
                }
            })
            .state('service.product.stats', {
                url: '/{productId:int}/stats',
                resolve: {
                    transId: function ($state) {
                        return $state.transitionId;
                    },
                    product: resolveProduct,
                    modal: resolveStatsModal
                }
            });
    }

    function resolveProducts($stateParams, $q, config, util, ProductResource) {
        var params = {
            q: $stateParams.q,
            rows: config.defItemsPerPage,
            page: util.isPositiveInt($stateParams.page) ? $stateParams.page : 1
        };
        return ProductResource.query(params).$promise.catch(function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function resolveProduct($stateParams, $q, ProductResource) {
        return ProductResource.get($stateParams).$promise.catch(function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function resolveStatsModal($state, $modal, $q, transId, product) {
        if ($state.transitionId === transId) {
            $modal.open({
                resolve: {
                    product: function () {
                        return product;
                    }
                },
                controller: 'ProductStatsController as vm',
                templateUrl: 'states/service/product/product-stats.html',
                backdrop: 'static'
            });
        }
        var deferred = $q.defer();
        deferred.reject('MODAL_STATE');
        return deferred.promise;
    }
})();