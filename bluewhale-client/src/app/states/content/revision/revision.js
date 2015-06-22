(function () {
    'use strict';

    angular
        .module('app.states.content.revision', [
            'angularFileUpload'
        ])
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('content.revision', {
                abstract: true,
                url: '/revisions?{datasetId:int}',
                resolve: {
                    datasets: resolveDatasets
                },
                template: '<ui-view/>',
                data: {
                    title: '数据版本'
                }
            })
            .state('content.revision.index', {
                url: '?q&{page:int}',
                resolve: {
                    revisions: resolveRevisions
                },
                controller: 'RevisionIndexController as vm',
                templateUrl: 'states/content/revision/index.html',
                data: {
                    title: '版本列表'
                }
            })
            .state('content.revision.add', {
                url: '/add',
                resolve: {
                    apps: resolveApps,
                    releases: resolveReleases,
                    cities: resolveCities,
                    revision: resolveRevision
                },
                controller: 'RevisionAddController as vm',
                templateUrl: 'states/content/revision/add.html',
                data: {
                    title: '创建版本'
                }
            })
            .state('content.revision.edit', {
                url: '/:revisionId/edit',
                resolve: {
                    apps: resolveApps,
                    releases: resolveReleases,
                    cities: resolveCities,
                    revision: resolveRevision
                },
                controller: 'RevisionAddController as vm',
                templateUrl: 'states/content/revision/add.html',
                data: {
                    title: '编辑版本'
                }
            });
    }

    function resolveDatasets($q, $stateParams, DatasetResource) {
        return DatasetResource.query({rows: 1e7}).$promise.then(function (datasets) {
            angular.forEach(datasets.items, function (dataset) {
                if (dataset.id === $stateParams.datasetId) {
                    datasets.current = dataset;
                }
            });
            if (datasets.current) {
                return datasets;
            } else {
                return $q.reject('UNKNOWN_DATASET');
            }
        }, function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function resolveRevisions($q, $stateParams, config, util, RevisionResource, datasets) {
        var params = {
            datasetId: datasets.current.id,
            rows: config.defItemsPerPage,
            page: util.isPositiveInt($stateParams.page) ? $stateParams.page : 1
        };
        return RevisionResource.query(params).$promise.catch(function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function resolveApps($q, AppResource) {
        return AppResource.query({rows: 1e7}).$promise.then(function (apps) {
            return apps.items;
        }, function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function resolveReleases($q, ReleaseResource, revision) {
        if (revision) {
            return ReleaseResource.query({appId: revision.app.id, rows: 1e7}).$promise.then(function (releases) {
                return releases.items;
            }, function (httpResponse) {
                return $q.reject(httpResponse.data.message);
            });
        } else {
            return [];
        }
    }

    function resolveCities($q, LocationResource) {
        return LocationResource.getTree({locationId: 86, recursive: 1, depth: 3}).$promise.then(function (country) {
            var cities = [];
            angular.forEach(country.children, function (province) {
                angular.forEach(province.children, function (city) {
                    cities.push(city);
                });
            });
            return cities;
        }, function (httpResponse) {
            return $q.reject(httpResponse.data.message);
        });
    }

    function resolveRevision($q, $stateParams, message, RevisionResource, datasets) {
        if (!validDataset(datasets.current.code)) {
            return $q.reject('Comming soon ...');
        }

        if ($stateParams.revisionId) {
            var params = {
                datasetId: datasets.current.id,
                revisionId: $stateParams.revisionId
            };
            return RevisionResource.get(params).$promise
                .then(function (revision) {
                    if (revision.dataset.code != 'dolphin-0.1-today') {
                        return $q.reject('Comming soon ...');
                    } else {
                        return revision;
                    }
                }, function (httpResponse) {
                    return $q.reject(httpResponse.data.message);
                });
        }
        return null;

        function validDataset(code) {
            var codes = [
                'dolphin-0.1-today'
            ];
            return _.indexOf(codes, code) !== -1;
        }
    }
})();