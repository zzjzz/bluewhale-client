(function () {
    'use strict';

    angular
        .module('app.states.service.shop')
        .controller('ShopIndexController', ShopIndexController);

    function ShopIndexController($state, $stateParams, config, ShopResource, shops) {
        var vm = this;

        vm.q = $stateParams.q;
        vm.items = shops.items;
        vm.totalItems = shops.total;
        vm.itemsPerPage = config.defItemsPerPage;
        vm.currentPage = shops.page;

        vm.search = search;
        vm.changePage = changePage;
        vm.viewShop = viewShop;
        vm.setGeoInfo = setGeoInfo;
        vm.viewUser = viewUser;

        vm.toggleApproved = toggleApproved;
        vm.toggleBrandCert = toggleBrandCert;

        function search() {
            $state.go('.', {q: vm.q, page: undefined});
        }

        function changePage() {
            $state.go('.', {page: vm.currentPage});
        }

        function viewShop(shop) {
            $state.go('^.view', {shopId: shop.id});
        }

        function setGeoInfo(shop) {
            $state.go('^.geo', {shopId: shop.id});
        }

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
    }
})();