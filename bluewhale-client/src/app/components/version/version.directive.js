(function () {
    'use strict';

    angular
        .module('app.components.version')
        .directive('version', versionDirective);

    versionDirective.$inject = [
        'version'
    ];

    function versionDirective(version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }
})();