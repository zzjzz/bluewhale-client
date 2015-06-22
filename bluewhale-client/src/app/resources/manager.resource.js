(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('ManagerResource', ManagerResource);

    function ManagerResource($resource, config) {
        return $resource(config.apiUrl + '/managers/:managerId', {managerId: '@id'}, {
            query: {
                isArray: false
            },
            getCurrent: {
                isArray: false,
                url: config.apiUrl + '/manager'
            }
        });
    }
})();