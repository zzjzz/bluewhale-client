(function () {
    'use strict';

    angular
        .module('app.services.message', [
            'angular-growl'
        ])
        .service('message', message);

    function message(growl) {
        return {
            info: info,
            success: success,
            warning: warning,
            error: error
        };

        function info(msg) {
            growl.info(msg);
        }

        function success(msg) {
            growl.success(msg);
        }

        function warning(msg) {
            growl.warning(msg);
        }

        function error(msg) {
            growl.error(msg);
        }
    }
})();