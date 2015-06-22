(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('AppResource', AppResource);

    function AppResource($resource, config) {
        return $resource(config.apiUrl + '/apps/:appId', {appId: '@id'}, {
            query: {
                isArray: false
            }
        });
    }
})();