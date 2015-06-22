(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('ReleaseResource', ReleaseResource);

    function ReleaseResource($resource, config) {
        return $resource(config.apiUrl + '/apps/:appId/releases/:releaseId', {appId: '@app.id', releaseId: '@id'}, {
            query: {
                isArray: false
            },
            slientQuery: {
                isArray: false,
                ignoreLoadingBar: true
            }
        });
    }
})();