(function () {
    'use strict';

    angular
        .module('app.states.content.dataset')
        .controller('DatasetViewController', DatasetViewController);

    function DatasetViewController($state, dataset) {
        var vm = this;

        vm.dataset = dataset;

        vm.backStateName = 'content.dataset.index';
        vm.backToList = backToList;

        function backToList() {
            if ($state.fromState.name !== vm.backStateName) {
                $state.go(vm.backStateName);
            } else {
                $state.go($state.fromState, $state.fromParams);
            }
        }
    }
})();