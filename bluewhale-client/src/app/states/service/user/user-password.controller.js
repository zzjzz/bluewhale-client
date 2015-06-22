(function () {
    'use strict';

    angular
        .module('app.states.service.user')
        .service('UserPasswordResolver', UserPasswordResolver)
        .controller('UserPasswordController', UserPasswordController);

    UserPasswordResolver.$inject = [
        '$q',
        '$modal',
        'UserResource'
    ];

    function UserPasswordResolver($q, $modal, UserResource) {
        return {
            getUserById: getUserById,
            openModal: openModal
        };

        function getUserById(userId) {
            return UserResource.get({userId: userId}).$promise.catch(function (httpResponse) {
                return $q.reject(httpResponse.data.message);
            });
        }

        function openModal(user) {
            return $modal.open({
                templateUrl: 'states/service/user/user-password.html',
                resolve: {
                    user: function () {
                        return user;
                    }
                },
                controller: 'UserPasswordController as vm',
                backdrop: 'static'
            });
        }
    }

    UserPasswordController.$inject = [
        '$rootScope',
        '$scope',
        '$modalInstance',
        '$translate',
        'message',
        'UserResource',
        'user'
    ];

    function UserPasswordController($rootScope, $scope, $modalInstance, $translate, message, UserResource, user) {
        var vm = this;

        vm.user = {};
        vm.submit = submit;
        vm.cancel = cancel;

        vm.submitting = false;
        vm.submitError = false;

        function submit() {
            vm.submitError = false;
            $scope.form.$setSubmitted();

            if ($scope.form.$valid) {
                vm.submitting = true;
                UserResource.updatePassword({userId: user.id}, vm.user, success, error);
            }

            function success(value, responseHeaders) {
                vm.submitting = false;
                $rootScope.$broadcast('userPasswordUpdateSuccess', user);
                $modalInstance.close(user);
                $translate('USER.PASSWORD.UPDATE_SUCCESS', user).then(function (msg) {
                    message.success(msg);
                });
            }

            function error(httpResponse) {
                vm.submitting = false;
                vm.submitError = httpResponse.data.message;
            }
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();