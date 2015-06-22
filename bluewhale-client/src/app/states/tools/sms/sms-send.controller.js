(function () {
    'use strict';

    angular
        .module('app.states.tools.sms')
        .controller('SmsSendController', SmsSendController);

    SmsSendController.$inject = [
        '$rootScope',
        '$scope',
        '$translate',
        'message',
        'SmsResource'
    ];

    function SmsSendController($rootScope, $scope, $translate, message, SmsResource) {
        var vm = this;

        vm.sms = {};
        vm.submit = submit;

        vm.submitting = false;
        vm.submitError = false;

        function submit(form) {
            vm.submitError = false;
            form.$setSubmitted();

            if (form.$valid) {
                vm.submitting = true;
                SmsResource.send(vm.sms, success, error);
            }

            function success(value, responseHeaders) {
                vm.submitting = false;
                $rootScope.$broadcast('smsSendSuccess', vm.sms);
                $translate('SMS.SEND_SUCCESS', vm.sms).then(function (msg) {
                    message.success(msg);
                });
            }

            function error(httpResponse) {
                vm.submitting = false;
                vm.submitError = httpResponse.data.message;
            }
        }
    }
})();