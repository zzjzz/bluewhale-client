(function () {
    'use strict';

    angular
        .module('app.components.pageHeader')
        .directive('myPageHeader', myPageHeaderDirective);

    function myPageHeaderDirective($state) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/page-header/page-header.html',
            link: function (scope, element, attrs) {
                scope.title = $state.current.data ? $state.current.data.title : '';
            }
        };
    }
})();