(function () {
    'use strict';

    angular
        .module('app.states.content.revision')
        .controller('RevisionIndexController', RevisionIndexController);

    function RevisionIndexController($log, $state, $stateParams, message, config, util, RevisionResource, datasets, revisions) {
        var vm = this;

        vm.datasets = datasets.items;
        vm.curDataset = datasets.current;
        vm.excludeCurDataset = excludeCurDataset;

        vm.revisions = revisions.items;
        vm.totalItems = revisions.total;
        vm.itemsPerPage = config.defItemsPerPage;
        vm.currentPage = revisions.page;
        vm.changePage = changePage;

        vm.addRevision = addRevision;
        vm.editRevision = editRevision;
        vm.deleteRevision = deleteRevision;

        function excludeCurDataset(dataset) {
            return dataset.id !== vm.curDataset.id;
        }

        function changePage() {
            $state.go('.', {page: vm.currentPage});
        }

        function addRevision() {
            $state.go('^.add');
        }

        function editRevision(revision) {
            $state.go('^.edit', {revisionId: revision.id});
        }

        function deleteRevision(revision) {
            var params = {
                datasetId: revision.dataset.id,
                revisionId: revision.id
            };

            RevisionResource.delete(params, onSuccess, onError);

            function onSuccess(value, httpHeaders) {
                message.success('REVISION.DELETE_OK');
                refreshRevisions();
            }

            function onError(httpResponse) {
                message.error(httpResponse.data.message);
            }
        }

        function refreshRevisions() {
            var params = {
                datasetId: datasets.current.id,
                rows: config.defItemsPerPage,
                page: util.isPositiveInt($stateParams.page) ? $stateParams.page : 1
            };
            RevisionResource.query(params, function (revisions, httpHeaders) {
                vm.revisions = revisions.items;
                vm.totalItems = revisions.total;
                vm.currentPage = revisions.page;
            });
        }
    }
})();