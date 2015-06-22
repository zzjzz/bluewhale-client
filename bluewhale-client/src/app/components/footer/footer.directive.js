(function() {
    'use strict';

    angular
        .module('app.components.footer')
        .directive('appFooter', footerDirective);

    function footerDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/footer/footer.html'
        };
    }
})();