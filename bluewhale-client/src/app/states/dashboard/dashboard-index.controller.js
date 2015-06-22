(function () {
    'use strict';

    angular
        .module('app.states.dashboard')
        .controller('DashboardIndexController', DashboardIndexController);

    DashboardIndexController.$inject = [];

    function DashboardIndexController() {
        var vm = this;
        vm.hello = 'Hello, world!';
    }
})();