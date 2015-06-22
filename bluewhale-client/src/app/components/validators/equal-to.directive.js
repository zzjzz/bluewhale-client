(function () {
    'use strict';

    angular
        .module('app.components.validators')
        .directive('equalTo', equalToDirective);

    function equalToDirective() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.equalTo = function(modelValue, viewValue) {
                    return viewValue == scope.$eval(attrs.equalTo);
                };
            }
        };
    }
})();