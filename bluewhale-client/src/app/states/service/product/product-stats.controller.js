(function () {
    'use strict';

    angular
        .module('app.states.service.product')
        .controller('ProductStatsController', ProductStatsController);

    function ProductStatsController($modalInstance, $scope, $translate, message, ProductResource, product) {
        var vm = this;

        vm.product = product;
        vm.submit = submit;
        vm.cancel = cancel;

        vm.submitting = false;
        vm.submitError = false;

        function submit() {
            vm.submitError = false;
            $scope.form.$setSubmitted();

            if ($scope.form.$valid) {
                vm.submitting = true;
                var params = {productId: vm.product.id};
                var postData = {
                    adjustFavCount: vm.product.stats.adjustFavCount
                };
                ProductResource.setStats(params, postData, success, error);
            }

            function success(value, responseHeaders) {
                vm.submitting = false;
                $modalInstance.close(vm.product);
                $translate('PRODUCT.SET_STATS_SUCCESS', product).then(function (msg) {
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