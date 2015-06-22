(function () {
    'use strict';

    angular
        .module('app.states.content.dataset', [])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('content.dataset', {
                abstract: true,
                url: '/datasets',
                template: '<ui-view/>',
                data: {
                    title: '数据集'
                }
            })
            .state('content.dataset.index', {
                url: '?q&{page:int}',
                resolve: {
                    datasets: resolveDatasets
                },
                controller: 'DatasetIndexController as vm',
                templateUrl: 'states/content/dataset/index.html',
                data: {
                    title: '数据集列表'
                }
            })
            .state('content.dataset.view', {
                url: '/{datasetId:int}',
                resolve: {
                    dataset: resolveDataset
                },
                controller: 'DatasetViewController as vm',
                templateUrl: 'states/content/dataset/view.html',
                data: {
                    title: '数据集详情'
                }
            });
    }

    function resolveDatasets($stateParams, $q, config, util, DatasetResource) {
        var params = {
            q: $stateParams.q,
            rows: config.defItemsPerPage,
            page: util.isPositiveInt($stateParams.page) ? $stateParams.page : 1
        };
        return DatasetResource.query(params).$promise.catch(function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function resolveDataset($stateParams, $q, DatasetResource) {
        return DatasetResource.get($stateParams).$promise.catch(function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }
})();