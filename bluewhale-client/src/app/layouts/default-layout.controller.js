(function () {
    'use strict';

    angular
        .module('app.layouts')
        .controller('DefaultLayoutController', DefaultLayoutController);

    function DefaultLayoutController(sidebarItems) {
        var vm = this;

        vm.sidebarItems = sidebarItems;
    }
})();