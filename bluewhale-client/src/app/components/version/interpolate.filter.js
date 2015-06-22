(function () {
    'use strict';

    angular
        .module('app.components.version')
        .filter('interpolate', interpolateFilter);

    interpolateFilter.$inject = [
        'version'
    ];

    function interpolateFilter(version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }
})();