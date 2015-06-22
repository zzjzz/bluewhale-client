(function () {
    'use strict';

    angular.module('app.config', []);

    var config = {
        appTitle: 'Bluewhale',
        appVersion: '0.1.0',
        indexState: 'dashboard.index',
        //apiUrl: '/api/mgm/v1',
        //uploadsUrl: 'http://uploads.17mg.com/mgm/v1',
        apiUrl: 'http://local.api.mg.yoohn.com/mgm/v1',
        uploadsUrl: 'http://local.uploads.mg.yoohn.com/mgm/v1',
        oysterApiUrl: '/api/oyster/v1',
        defItemsPerPage: 20
    };

    angular
        .module('app.config')
        .value('config', config)
        .config(configure)
        .run(run);

    function configure($provide, $urlRouterProvider, $translateProvider, cfpLoadingBarProvider, growlProvider) {

        $provide.decorator('$state', function ($delegate, $rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                // 更新TransitionID
                $delegate.transitionId = _.uniqueId();
                $delegate.toState = toState;
                $delegate.toParams = toParams;
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $delegate.fromState = fromState;
                $delegate.fromParams = fromParams;
            });
            return $delegate;
        });

        $urlRouterProvider.otherwise('/');

        $translateProvider
            .translations('zh', getLangPack())
            .preferredLanguage('zh');

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = false;
        cfpLoadingBarProvider.latencyThreshold = 100;

        growlProvider.onlyUniqueMessages(false);
        growlProvider.globalTimeToLive(5000);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalPosition('top-center');
    }

    function run($log, $rootScope, $state, $stateParams, message) {
        // 将$state暴露给view
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // 常用方法 - 返回历史页面
        $rootScope.backTo = function (stateName) {
            if ($state.fromState.name !== stateName) {
                $state.go(stateName);
            } else {
                $state.go($state.fromState, $state.fromParams);
            }
        };

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error !== 'MODAL_STATE') {
                message.error(error);
            }
        });
    }

    function getLangPack() {
        return {
            STATES: {
                'CONTENT': '内容管理',
                'BIZ': '业务管理',
                'SERVICE': '平台服务',
                'TOOLS': '工具服务',
                'ANALYTICS': '数据分析',
                'SYSTEM': '系统设置'
            },
            USER: {
                PASSWORD: {
                    UPDATE_SUCCESS: '用户（{{alias}}）密码重置成功！'
                },
                STATE: {
                    ACTIVE: '有效',
                    DELETED: '已删除'
                }
            },
            SHOP: {
                SET_GEO_INFO_SUCCESS: '店铺（{{name}}）地理位置更新成功！',
                APPROVED: {
                    TRUE: '已认证',
                    FALSE: '待认证'
                },
                BRAND_CERT: {
                    TRUE: '已认证',
                    FALSE: '待认证'
                },
                STATE: {
                    ACTIVE: '有效',
                    DELETED: '已删除'
                }
            },
            PRODUCT: {
                SET_STATS_SUCCESS: '商品（{{name}}）参数更新成功！',
                STATE: {
                    ACTIVE: '有效',
                    HIDDEN: '下架',
                    DELETED: '已删除'
                }
            },
            DATASET: {
                STATE: {
                    ACTIVE: '有效',
                    DELETED: '已删除'
                }
            },
            REVISION: {
                STATE: {
                    ACTIVE: '有效',
                    DELETED: '已删除'
                }
            },
            SMS: {
                SEND_SUCCESS: '发送成功！'
            },
            RESERVATION: {
                STATE: {
                    OPENED: '新增',
                    SUBMITTED: '提交',
                    REJECTED: '拒绝',
                    CONFIRMED: '确认',
                    DELIVERED: '配送',
                    DEAL: '成交',
                    UNDEAL: '未成交',
                    CLOSED: '关闭'
                },
                ACTION: {
                    CONFIRM: '确认',
                    REJECT: '拒绝',
                    DELIVER: '配送',
                    DEAL: '成交',
                    UNDEAL: '未成交',
                    CLOSE: '关闭',
                    CONFIRM_SUCCESS: '预订单确定操作成功！',
                    REJECT_SUCCESS: '预订单拒绝操作成功！',
                    DELIVER_SUCCESS: '预订单配送操作成功！',
                    DEAL_SUCCESS: '预订单成交操作成功！',
                    UNDEAL_SUCCESS: '预订单未成交操作成功！',
                    CLOSE_SUCCESS: '预订单关闭操作成功！'
                }
            }
        };
    }
})();