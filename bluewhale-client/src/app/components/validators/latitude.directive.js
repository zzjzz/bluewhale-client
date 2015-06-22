(function () {
    'use strict';

    angular
        .module('app.components.validators')
        .directive('latitude', latitudeDirective);

    function latitudeDirective(util) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.latitude = function (modelValue, viewValue) {
                    return util.isNumeric(viewValue) && Math.abs(viewValue) <= 90;
                };
            }
        };
    }
})();