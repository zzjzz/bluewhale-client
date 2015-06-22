(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('SmsResource', SmsResource);

    SmsResource.$inject = [
        '$resource',
        'config'
    ];

    function SmsResource($resource, config) {
        return $resource(config.apiUrl + '/notices/sms', {}, {
            query: {
                isArray: false
            },
            send: {
                method: 'POST',
                url: config.apiUrl + '/notices/sms/send'
            }
        });
    }
})();