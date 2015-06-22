(function () {
    'use strict';

    angular
        .module('app.states.content.dataset')
        .controller('DatasetIndexController', DatasetIndexController);

    function DatasetIndexController($state, $stateParams, config, datasets) {
        var vm = this;

        vm.q = $stateParams.q;
        vm.items = datasets.items;
        vm.totalItems = datasets.total;
        vm.itemsPerPage = config.defItemsPerPage;
        vm.currentPage = datasets.page;

        vm.search = search;
        vm.changePage = changePage;

        function search() {
            $state.go('.', {q: vm.q, page: undefined}, {reload: true});
        }

        function changePage() {
            $state.go('.', {page: vm.currentPage});
        }
    }
})();