(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('RevisionResource', RevisionResource);

    function RevisionResource($resource, config) {
        return $resource(config.apiUrl + '/datasets/:datasetId/revisions/:revisionId', {revisionId: '@id'}, {
            query: {
                isArray: false
            },
            update: {
                method: 'PUT'
            },
            setState: {
                method: 'PUT',
                url: config.apiUrl + '/datasets/:datasetId/revisions/:revisionId/state'
            }
        });
    }
})();