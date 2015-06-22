(function () {
    'use strict';

    angular
        .module('app.states.service.shop')
        .controller('ShopViewController', ShopViewController);

    function ShopViewController($state, message, ShopResource, shop) {
        var vm = this;

        vm.shop = shop;
        vm.viewUser = viewUser;
        vm.toggleApproved = toggleApproved;
        vm.toggleBrandCert = toggleBrandCert;
        vm.setGeoInfo = setGeoInfo;

        function viewUser(user) {
            $state.go('service.user.view', {userId: user.id});
        }

        function toggleApproved(shop) {
            var params = {shopId: shop.id};
            var postData = {approved: !shop.approved};
            ShopResource.setApproved(params, postData, success, error);

            function success(data, headers) {
                shop.approved = !shop.approved;
            }

            function error(httpResponse) {
                message.error(httpResponse.data.message);
            }
        }

        function toggleBrandCert(shop) {
            var params = {shopId: shop.id};
            var postData = {brandCert: !shop.brandCert};
            ShopResource.setBrandCert(params, postData, success, error);

            function success(data, headers) {
                shop.brandCert = !shop.brandCert;
            }

            function error(httpResponse) {
                message.error(httpResponse.data.message);
            }
        }

        function setGeoInfo(shop) {
            $state.go('^.geo', {shopId: shop.id});
        }
    }
})();