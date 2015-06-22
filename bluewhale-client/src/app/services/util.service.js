(function () {
    'use strict';

    angular
        .module('app.services')
        .service('util', Util);

    function Util() {
        var self = this;

        this.isNumeric = function (num) {
            return !isNaN(parseFloat(num)) && isFinite(num);
        };

        this.isInteger = function (num) {
            return self.isNumeric(num) && parseFloat(num) % 1 === 0;
        };

        this.isPositiveInt = function (num) {
            return self.isInteger(num) && num > 0;
        };
    }
})();