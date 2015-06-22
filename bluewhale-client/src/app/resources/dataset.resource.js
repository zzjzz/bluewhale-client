(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('DatasetResource', DatasetResource);

    function DatasetResource($resource, config) {
        return $resource(config.apiUrl + '/datasets/:datasetId', {datasetId: '@id'}, {
            query: {
                isArray: false
            }
        });
    }
})();