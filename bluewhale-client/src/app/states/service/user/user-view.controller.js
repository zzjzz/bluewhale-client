(function () {
    'use strict';

    angular
        .module('app.states.service.user')
        .controller('UserViewController', UserViewController);

    UserViewController.$inject = [
        '$state',
        'user'
    ];

    function UserViewController($state, user) {
        var vm = this;

        vm.user = user;
        vm.updatePassword = updatePassword;

        function updatePassword(user) {
            $state.go('service.user.password', {
                userId: user.id
            });
        }
    }
})();