(function () {
    'use strict';

    angular
        .module('app.states.service.shop')
        .controller('ShopGeoController', ShopGeoController);

    function ShopGeoController($modalInstance, $scope, $timeout, $translate, message, ShopResource, shop, district) {
        var vm = this;

        vm.shop = shop;
        vm.district = district;
        vm.submit = submit;
        vm.cancel = cancel;

        vm.submitting = false;
        vm.submitError = false;

        activate();

        function activate() {
            $timeout(function () {
                $scope.form.bd.$setTouched();
            });
        }

        function submit() {
            vm.submitError = false;
            $scope.form.$setSubmitted();

            if ($scope.form.$valid) {
                vm.submitting = true;
                var params = {shopId: shop.id};
                var postData = {
                    bdId: vm.shop.bd.id,
                    lat: vm.shop.lat,
                    lng: vm.shop.lng
                };
                ShopResource.setGeoInfo(params, postData, success, error);
            }

            function success(value, responseHeaders) {
                vm.submitting = false;
                $modalInstance.close(vm.shop);
                $translate('SHOP.SET_GEO_INFO_SUCCESS', shop).then(function (msg) {
                    message.success(msg);
                });
            }

            function error(httpResponse) {
                vm.submitting = false;
                vm.submitError = httpResponse.data.message;
            }
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();