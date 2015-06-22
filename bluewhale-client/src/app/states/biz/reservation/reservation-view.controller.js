(function () {
    'use strict';

    angular
        .module('app.states.biz.reservation')
        .controller('ReservationViewController', ReservationViewController);

    ReservationViewController.$inject = [
        '$state',
        'reservation'
    ];

    function ReservationViewController($state, reservation) {
        var vm = this;

        vm.reservation = reservation;
        vm.confirmReservation = confirmReservation;
        vm.rejectReservation = rejectReservation;
        vm.deliverReservation = deliverReservation;
        vm.dealReservation = dealReservation;
        vm.undealReservation = undealReservation;
        vm.closeReservation = closeReservation;

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