(function () {
    'use strict';

    angular
        .module('app.states.content.revision')
        .controller('RevisionAddController', RevisionAddController);

    function RevisionAddController($log, $state, FileUploader,
                                   config, message,
                                   ReleaseResource, ShopResource, ProductResource, PromotionResource, RevisionResource,
                                   datasets, apps, releases, cities, revision) {
        var vm = this;

        vm.dataset = datasets.current;
        vm.apps = apps;
        vm.releases = releases;
        vm.cities = cities;
        vm.uploader = getUploader();
        vm.slideTargetTypes = getSlideTgtTypes();
        vm.revision = getRevision(revision);

        vm.loadingReleases = false;
        vm.submittingForm = false;

        vm.refreshReleases = refreshReleases;
        vm.chgSlideTgtType = chgSlideTgtType;
        vm.searchShops = searchShops;
        vm.searchProducts = searchProducts;
        vm.searchPromotions = searchPromotions;
        vm.addSlide = addSlide;
        vm.deleteSlide = deleteSlide;
        vm.submit = submit;

        function getUploader() {
            var uploader = new FileUploader({
                url: config.uploadsUrl + '/images',
                alias: 'file',
                autoUpload: true,
                removeAfterUpload: true
            });

            uploader.onWhenAddingFileFailed = function (item, filter, options) {
                message.error('Invalid file');
            };

            uploader.onBeforeUploadItem = function (item) {
                item.formData.push({
                    accessToken: window.session.accessToken,
                    name: item.file.name,
                    type: item.file.type,
                    size: item.file.size
                });
            };

            uploader.onSuccessItem = function (item, response, status, headers) {
                item.slide.image = response;
            };

            uploader.onErrorItem = function (item, response, status, headers) {
                message.error(response.message);
            };

            return uploader;
        }

        function getSlideTgtTypes() {
            return {
                shop: '店铺',
                product: '商品',
                promotion: '活动'
            };
        }

        function getRevision(revision) {
            return angular.extend({
                payload: {
                    slides: [{
                        targetType: 'product'
                    }]
                }
            }, revision);
        }

        function refreshReleases() {
            // 清空现有Release
            delete vm.revision.release;
            // 更改状态
            vm.loadingReleases = true;
            // 加载数据
            if (vm.revision.app) {
                ReleaseResource.slientQuery({appId: vm.revision.app.id, rows: 1e7}, function (releases) {
                    vm.releases = releases.items;
                }).$promise.finally(function () {
                        vm.loadingReleases = false;
                    });
            } else {
                vm.releases = [];
                vm.loadingReleases = false;
            }
        }

        function chgSlideTgtType(slide) {
            delete slide.target;
        }

        function searchShops(q, limit) {
            return ShopResource.query({q: q, rows: limit || 10}).$promise.then(function (shops) {
                return shops.items;
            });
        }

        function searchProducts(q, limit) {
            return ProductResource.query({q: q, rows: limit || 10}).$promise.then(function (products) {
                return products.items;
            });
        }

        function searchPromotions(q, limit) {
            return PromotionResource.query({q: q, rows: limit || 10}).$promise.then(function (promotions) {
                return promotions.items;
            });
        }

        function addSlide(pos) {
            vm.revision.payload.slides.splice(pos + 1, 0, {
                targetType: 'product'
            });
        }

        function deleteSlide(pos) {
            vm.revision.payload.slides.splice(pos, 1);
        }

        function submit(form) {
            form.$setSubmitted();

            if (form.$valid) {
                // 收集数据
                var params = {
                    datasetId: datasets.current.id,
                    revisionId: vm.revision.id
                };

                var postData = {
                    appId: vm.revision.app.id,
                    releaseId: vm.revision.release.id,
                    cityId: vm.revision.city.id,
                    payload: {
                        quote: vm.revision.payload.quote,
                        slides: []
                    }
                };

                angular.forEach(vm.revision.payload.slides, function (slide) {
                    postData.payload.slides.push({
                        imageId: slide.image.id,
                        targetType: slide.targetType,
                        targetId: slide.target.id
                    });
                });

                // 提交数据
                vm.submittingForm = true;
                if (vm.revision.id) {
                    RevisionResource.update(params, postData, success, error).$promise.finally(function () {
                        vm.submittingForm = false;
                    });
                } else {
                    RevisionResource.save(params, postData, success, error).$promise.finally(function () {
                        vm.submittingForm = false;
                    });
                }
            }

            function success(value, responseHeaders) {
                $state.go('content.revision.index', {datasetId: value.dataset.id});
                if (vm.revision.id) {
                    message.success('REVISION.UPDATE_OK');
                } else {
                    message.success('REVISION.ADD_OK');
                }
            }

            function error(httpResponse) {
                message.error(httpResponse.data.message);
            }
        }
    }
})();