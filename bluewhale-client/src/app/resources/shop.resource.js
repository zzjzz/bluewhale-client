(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('ShopResource', ShopResource);

    ShopResource.$inject = [
        '$resource',
        'config'
    ];

    function ShopResource($resource, config) {
        return $resource(config.apiUrl + '/shops/:shopId', {shopId: '@id'}, {
            query: {
                isArray: false
            },
            setApproved: {
                method: 'PUT',
                url: config.apiUrl + '/shops/:shopId/approved'
            },
            setBrandCert: {
                method: 'PUT',
                url: config.apiUrl + '/shops/:shopId/brandcert'
            },
            setGeoInfo: {
                method: 'PUT',
                url: config.apiUrl + '/shops/:shopId/geoinfo'
            }
        });
    }
})();