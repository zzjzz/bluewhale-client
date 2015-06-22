(function () {
    'use strict';

    angular
        .module('app.states.service.product')
        .controller('ProductIndexController', ProductIndexController);

    function ProductIndexController($state, $stateParams, config, products) {
        var vm = this;

        vm.q = $stateParams.q;
        vm.items = products.items;
        vm.totalItems = products.total;
        vm.itemsPerPage = config.defItemsPerPage;
        vm.currentPage = products.page;

        vm.search = search;
        vm.changePage = changePage;
        vm.viewProduct = viewProduct;
        vm.setProdStats = setProdStats;
        vm.viewShop = viewShop;

        function search() {
            $state.go('.', {q: vm.q, page: undefined});
        }

        function changePage() {
            $state.go('.', {page: vm.currentPage});
        }

        function viewProduct(product) {
            $state.go('^.view', {productId: product.id});
        }

        function setProdStats(product) {
            $state.go('^.stats', {productId: product.id});
        }

        function viewShop(shop) {
            $state.go('service.shop.view', {shopId: shop.id});
        }
    }
})();