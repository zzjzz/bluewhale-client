(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('LocationResource', LocationResource);

    function LocationResource($resource, config) {
        return $resource(config.apiUrl + '/locations/:locationId', {locationId: '@id'}, {
            getTree: {
                method: 'GET',
                url: config.apiUrl + '/locations/:locationId/tree'
            }
        });
    }
})();