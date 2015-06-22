(function () {
    'use strict';

    angular
        .module('app.components.sidebar')
        .directive('appSidebar', sidebarDirective);

    sidebarDirective.$inject = [];

    function sidebarDirective() {
        return {
            restrict: 'E',
            scope: {
                items: '='
            },
            templateUrl: 'components/sidebar/sidebar.html'
        };
    }
})();