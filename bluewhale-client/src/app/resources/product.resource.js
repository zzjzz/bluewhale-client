(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('ProductResource', ProductResource);

    function ProductResource($resource, config) {
        return $resource(config.apiUrl + '/products/:productId', {productId: '@id'}, {
            query: {
                isArray: false
            },
            setStats: {
                method: 'PUT',
                url: config.apiUrl + '/products/:productId/stats'
            }
        });
    }
})();