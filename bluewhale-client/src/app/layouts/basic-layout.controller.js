(function () {
    'use strict';

    angular
        .module('app.layouts')
        .controller('BasicLayoutController', BasicLayoutController);

    function BasicLayoutController(config, navItems) {
        var vm = this;

        vm.brandName = config.appTitle;
        vm.brandSref = config.indexState;
        vm.navItems = navItems;
    }
})();