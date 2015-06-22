(function () {
    'use strict';

    angular
        .module('app.states.biz.reservation')
        .service('ReservationIndexResolver', ReservationIndexResolver)
        .controller('ReservationIndexController', ReservationIndexController);

    function ReservationIndexResolver($q, config, ReservationResource) {
        return {
            getPageData: getPageData
        };

        function getPageData(pageNumber, query) {
            var params = {
                q: query,
                rows: config.defItemsPerPage,
                page: parsePageNumber(pageNumber)
            };

            return ReservationResource.query(params).$promise.catch(function (httpResponse) {
                return $q.reject(httpResponse.data.message);
            });
        }

        function parsePageNumber(pageNumber) {
            var n = parseInt(pageNumber);
            return angular.isNumber(n) && n % 1 === 0 && n > 0 ? n : 1;
        }
    }

    function ReservationIndexController($rootScope, $scope, $state, $stateParams, config, pageData) {
        var vm = this;

        vm.q = $stateParams.q;
        vm.items = pageData.items;
        vm.totalItems = pageData.total;
        vm.itemsPerPage = config.defItemsPerPage;
        vm.currentPage = pageData.page;

        vm.search = search;
        vm.changePage = changePage;
        vm.viewReservation = viewReservation;
        vm.confirmReservation = confirmReservation;
        vm.rejectReservation = rejectReservation;
        vm.deliverReservation = deliverReservation;
        vm.dealReservation = dealReservation;
        vm.undealReservation = undealReservation;
        vm.closeReservation = closeReservation;

        $scope.search = search;

        function search() {
            $state.go('.', {q: vm.q, page: undefined});
        }

        function changePage() {
            $state.go('.', {
                page: vm.currentPage
            });
        }

        function viewReservation(reservation) {
            $state.go('^.view', {reservationId: reservation.reservationId});
        }

        function confirmReservation(reservation) {
            $state.go('^.action', {reservationId: reservation.reservationId, actionName: 'confirm'});
        }

        function rejectReservation(reservation) {
            $state.go('^.action', {reservationId: reservation.reservationId, actionName: 'reject'});
        }

        function deliverReservation(reservation) {
            $state.go('^.action', {reservationId: reservation.reservationId, actionName: 'deliver'});
        }

        function dealReservation(reservation) {
            $state.go('^.action', {reservationId: reservation.reservationId, actionName: 'deal'});
        }

        function undealReservation(reservation) {
            $state.go('^.action', {reservationId: reservation.reservationId, actionName: 'undeal'});
        }

        function closeReservation(reservation) {
            $state.go('^.action', {reservationId: reservation.reservationId, actionName: 'close'});
        }
    }
})();