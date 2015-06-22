(function () {
    'use strict';

    angular
        .module('app.components.nav')
        .directive('appNav', navDirective);

    function navDirective() {
        return {
            restrict: 'E',
            scope: {
                brandName: '@',
                brandSref: '@',
                navItems: '='
            },
            templateUrl: 'components/nav/nav.html'
        };
    }
})();