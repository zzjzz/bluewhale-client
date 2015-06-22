(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('ReservationResource', ReservationResource);

    ReservationResource.$inject = [
        '$resource',
        'config'
    ];

    function ReservationResource($resource, config) {
        return $resource(config.oysterApiUrl + '/reservations/:reservationId', {reservationId: '@reservationId'}, {
            query: {
                isArray: false
            },
            confirm: {
                method: 'PUT',
                url: config.oysterApiUrl + '/reservations/:reservationId/confirm'
            },
            reject: {
                method: 'PUT',
                url: config.oysterApiUrl + '/reservations/:reservationId/reject'
            },
            deliver: {
                method: 'PUT',
                url: config.oysterApiUrl + '/reservations/:reservationId/deliver'
            },
            deal: {
                method: 'PUT',
                url: config.oysterApiUrl + '/reservations/:reservationId/deal'
            },
            undeal: {
                method: 'PUT',
                url: config.oysterApiUrl + '/reservations/:reservationId/undeal'
            },
            close: {
                method: 'PUT',
                url: config.oysterApiUrl + '/reservations/:reservationId/close'
            }
        });
    }
})();