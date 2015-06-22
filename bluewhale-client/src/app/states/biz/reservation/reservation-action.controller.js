(function () {
    'use strict';

    angular
        .module('app.states.biz.reservation')
        .service('ReservationActionResolver', ReservationActionResolver)
        .controller('ReservationActionController', ReservationActionController);

    ReservationActionResolver.$inject = [
        '$q',
        '$modal',
        'ReservationResource'
    ];

    function ReservationActionResolver($q, $modal, ReservationResource) {
        return {
            getReservationById: getReservationById,
            openModal: openModal
        };

        function getReservationById(reservationId) {
            return ReservationResource.get({reservationId: reservationId}).$promise.catch(function (httpResponse) {
                return $q.reject(httpResponse.data.message);
            });
        }

        function openModal(reservation, actionName) {
            return $modal.open({
                templateUrl: 'states/biz/reservation/reservation-action.html',
                resolve: {
                    reservation: function () {
                        return reservation;
                    },
                    actionName: function () {
                        return actionName;
                    }
                },
                controller: 'ReservationActionController as vm',
                backdrop: 'static'
            });
        }
    }

    ReservationActionController.$inject = [
        '$rootScope',
        '$scope',
        '$modalInstance',
        '$translate',
        'message',
        'ReservationResource',
        'reservation',
        'actionName'
    ];

    function ReservationActionController($rootScope, $scope, $modalInstance, $translate, message, ReservationResource, reservation, actionName) {
        var vm = this;

        vm.reservation = {};
        vm.actionName = actionName || '';
        vm.submit = submit;
        vm.cancel = cancel;

        vm.submitting = false;
        vm.submitError = false;

        function submit() {
            vm.submitError = false;
            $scope.form.$setSubmitted();

            if ($scope.form.$valid) {
                vm.submitting = true;
                if (vm.actionName === 'confirm') {
                    ReservationResource.confirm({reservationId: reservation.reservationId}, vm.reservation, success, error);
                } else if (vm.actionName === 'reject') {
                    ReservationResource.reject({reservationId: reservation.reservationId}, vm.action, success, error);
                } else if (vm.actionName === 'deliver') {
                    ReservationResource.deliver({reservationId: reservation.reservationId}, vm.reservation, success, error);
                } else if (vm.actionName === 'deal') {
                    ReservationResource.deal({reservationId: reservation.reservationId}, vm.reservation, success, error);
                } else if (vm.actionName === 'undeal') {
                    ReservationResource.undeal({reservationId: reservation.reservationId}, vm.action, success, error);
                } else if (vm.actionName === 'close') {
                    ReservationResource.close({reservationId: reservation.reservationId}, vm.reservation, success, error);
                }
            }

            function success(value, responseHeaders) {
                vm.submitting = false;
                if (vm.actionName === 'confirm') {
                    $rootScope.$broadcast('reservationConfirmSuccess', reservation);
                    $modalInstance.close(reservation);
                    $translate('RESERVATION.ACTION.CONFIRM_SUCCESS', reservation).then(function (msg) {
                        message.success(msg);
                    });
                } else if (vm.actionName === 'reject') {
                    $rootScope.$broadcast('reservationRejectSuccess', reservation);
                    $modalInstance.close(reservation);
                    $translate('RESERVATION.ACTION.REJECT_SUCCESS', reservation).then(function (msg) {
                        message.success(msg);
                    });
                } else if (vm.actionName === 'deliver') {
                    $rootScope.$broadcast('reservationDeliverSuccess', reservation);
                    $modalInstance.close(reservation);
                    $translate('RESERVATION.ACTION.DELIVER_SUCCESS', reservation).then(function (msg) {
                        message.success(msg);
                    });
                } else if (vm.actionName === 'deal') {
                    $rootScope.$broadcast('reservationDealSuccess', reservation);
                    $modalInstance.close(reservation);
                    $translate('RESERVATION.ACTION.DEAL_SUCCESS', reservation).then(function (msg) {
                        message.success(msg);
                    });
                } else if (vm.actionName === 'undeal') {
                    $rootScope.$broadcast('reservationUndealSuccess', reservation);
                    $modalInstance.close(reservation);
                    $translate('RESERVATION.ACTION.UNDEAL_SUCCESS', reservation).then(function (msg) {
                        message.success(msg);
                    });
                } else if (vm.actionName === 'close') {
                    $rootScope.$broadcast('reservationCloseSuccess', reservation);
                    $modalInstance.close(reservation);
                    $translate('RESERVATION.ACTION.CLOSE_SUCCESS', reservation).then(function (msg) {
                        message.success(msg);
                    });
                }
                // refresh
                //$scope.search();
            }

            function error(httpResponse) {
                vm.submitting = false;
                vm.submitError = httpResponse.data.message;
            }
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();