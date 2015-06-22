(function () {
    'use strict';

    angular
        .module('app.states.service.product')
        .controller('ProductViewController', ProductViewController);

    function ProductViewController($state, product) {
        var vm = this;

        vm.product = product;
        vm.setProdStats = setProdStats;
        vm.viewShop = viewShop;

        function setProdStats(product) {
            $state.go('^.stats', {productId: product.id});
        }

        function viewShop(shop) {
            $state.go('service.shop.view', {shopId: shop.id});
        }
    }
})();