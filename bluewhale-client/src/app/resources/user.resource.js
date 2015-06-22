(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('UserResource', UserResource);

    UserResource.$inject = [
        '$resource',
        'config'
    ];

    function UserResource($resource, config) {
        return $resource(config.apiUrl + '/users/:userId', {userId: '@id'}, {
            query: {
                isArray: false
            },
            updatePassword: {
                method: 'PUT',
                url: config.apiUrl + '/users/:userId/password'
            }
        });
    }
})();