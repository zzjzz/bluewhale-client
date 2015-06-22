(function () {
    'use strict';

    angular
        .module('app.components.validators')
        .directive('longitude', longitudeDirective);

    function longitudeDirective(util) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.longitude = function (modelValue, viewValue) {
                    return util.isNumeric(viewValue) && Math.abs(viewValue) <= 180;
                };
            }
        };
    }
})();