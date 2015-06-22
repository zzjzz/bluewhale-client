(function () {
    'use strict';

    angular
        .module('app.states.service.user')
        .service('UserIndexResolver', UserIndexResolver)
        .controller('UserIndexController', UserIndexController);

    function UserIndexResolver($q, config, UserResource) {
        return {
            getPageData: getPageData
        };

        function getPageData(pageNumber, query) {
            var params = {
                q: query,
                rows: config.defItemsPerPage,
                page: parsePageNumber(pageNumber)
            };

            return UserResource.query(params).$promise.catch(function (httpResponse) {
                return $q.reject(httpResponse.data.message);
            });
        }

        function parsePageNumber(pageNumber) {
            var n = parseInt(pageNumber);
            return angular.isNumber(n) && n % 1 === 0 && n > 0 ? n : 1;
        }
    }

    function UserIndexController($state, $stateParams, config, pageData) {
        var vm = this;

        vm.q = $stateParams.q;
        vm.items = pageData.items;
        vm.totalItems = pageData.total;
        vm.itemsPerPage = config.defItemsPerPage;
        vm.currentPage = pageData.page;

        vm.search = search;
        vm.changePage = changePage;
        vm.viewUser = viewUser;
        vm.setPassword = setPassword;

        function search() {
            $state.go('.', {q: vm.q, page: undefined});
        }

        function changePage() {
            $state.go('.', {
                page: vm.currentPage
            });
        }

        function viewUser(user) {
            $state.go('^.view', {userId: user.id});
        }

        function setPassword(user) {
            $state.go('^.password', {userId: user.id});
        }
    }
})();