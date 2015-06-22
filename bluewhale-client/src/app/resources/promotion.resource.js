(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('PromotionResource', PromotionResource);

    function PromotionResource($resource, config) {
        return $resource(config.apiUrl + '/promotions/:promotionId', {promotionId: '@id'}, {
            query: {
                isArray: false
            }
        });
    }
})();