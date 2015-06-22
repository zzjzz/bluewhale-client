(function () {
    'use strict';

    angular
        .module('app.components.pageContent')
        .directive('myPageContent', myPageContentDirective);

    function myPageContentDirective() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/page-content/page-content.html'
        };
    }
})();