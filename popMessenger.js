/**
 * Created by michaelpiecora on 4/24/15.
 */
/*
    Dependencies:
        ngAnimate

    Setup:
        Add 'PopMessenger' as a dependency in your app.
        Add 'popMsg' as a dependency in your controller.

    To Use:
        Insert the directive '<pop-message pos="*position*" show="#></pop-message> into your HTML.
        In your controller, call 'popMsg(msg)' to display a message.

    Config:
        The <pop-message> directive can be configured through the following attributes:
            pos: position in the window where you want messages to display.
                'top-left': pill-style, width: auto, 15px margins
                'top-right': pill-style, width: auto, 15px margins
                'bottom-left': pill-style, width: auto, 15px margins
                'bottom-right': pill-style, width: auto, 15px margins
                'top': 100% width, no margins
                'bottom': 100% width, no margins
                Default: bottom-right

            show: the time in ms you want messages to display
                Default: 3000

            bg: the background color of the message box.  Accepts all standard CSS color designators:
                #444, #00FF00, rgb(100, 100, 100), lightblue, etc.
                Default: lightgray

            txt: the color of the message text.  Accepts the same parameters as bg.
                Default: black

            alpha: the opacity of the message box and message text.  Accepts 0 through 1:
                30% = 0.3, 100% = 1, 80% = 0.8
                Default: 0.5


 */

var app = angular.module('PopMessenger', ['ngAnimate']);

app.controller('MainCtrl', function($scope, popMsg) {
    $scope.message = function (msg) {
        popMsg(msg);
        //console.log($scope.msg)
    };
});

app.directive('popMessage', function($timeout, $window) {
    return {
        restrict: 'E',
        scope: {
            pos: '=?'
        },
        link: function(scope, element, attr) {
            scope.popClass = attr.pos || 'bottom-right';
            scope.showTime = attr.show || 3000;
            scope.bg = {'background': (attr.bg || 'lightgray'), 'opacity': (attr.alpha || '0.5')};
            scope.txt = {'color': (attr.txt || 'black')};
            var popMsg = function(msg) {
                console.log($window.innerWidth, $window.innerHeight)
                scope.msg = msg;
                scope.show = true;
                console.log(scope.msg);
                $timeout(function(){
                    scope.show = false;
                    $timeout(function() {
                        scope.msg = '';
                    },750)
                },scope.showTime);
            };

            scope.$on('popMsg', function(event, msg) {
                console.log('receiving: ' + msg);
                popMsg(msg);
            })
        },
        template:
        '<style>' +
        '.top-left { left: 15px; top: 15px;} ' +
        '.top-left.ng-hide {top: -15px; opacity: 0; transition: 0.75s ease-in all;}' +
        '.top-left.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -15px); } ' +
        '.top-left.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +

        '.top-right { right: 15px; top: 15px;} ' +
        '.top-right.ng-hide {top: -15px; opacity: 0; transition: 0.75s ease-in all;}' +
        '.top-right.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -25px); } ' +
        '.top-right.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +

        '.bottom-left { left: 15px; bottom: 15px;} ' +
        '.bottom-left.ng-hide {bottom: -25px; opacity: 0; transition: 0.75s ease-in all;}' +
        '.bottom-left.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -25px); } ' +
        '.bottom-left.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +

        '.bottom-right { right: 15px; bottom: 15px;} ' +
        '.bottom-right.ng-hide {bottom: -25px; opacity: 0; transition: 0.75s ease-in all;}' +
        '.bottom-right.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -25px); } ' +
        '.bottom-right.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +


        '#pop-body {position: absolute;' +
        'height: 30px; width: auto;  text-align: center; border-radius: 5px;' +
        'line-height: 30px;}' +
        '#pop-msg {padding: 10px; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;' +
        'vertical-align: middle; margin: auto auto; }' +


        '#pop-body.bottom { left: 0; width: 100%; bottom: 0px; border-radius: 0;}' +
        '#pop-body.bottom.ng-hide {bottom: -25px; opacity: 0; transition: 0.75s ease-in all;}' +
        '#pop-body.bottom.ng-hide-add-active {transition: 0.75s ease-in-out all;' +
        'transform: translate(0, -15px); } #pop-body.bottom.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +

        '#pop-body.top { left: 0; width: 100%; top: 0px; border-radius: 0;}' +
        '#pop-body.top.ng-hide {top: -25px; opacity: 0; transition: 0.75s ease-in all;}' +
        '#pop-body.top.ng-hide-add-active {transition: 0.75s ease-in-out all;' +
        'transform: translate(0, -15px); } #pop-body.top.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +


        '</style>' +
        '<div ng-class="popClass" ng-style="bg" ng-show="show" id="pop-body"><span id="pop-msg" ng-style="txt">{{msg}}</span></div>'
    }
});

app.service('popMsg', function($rootScope) {
    return function (msg){
        $rootScope.$broadcast('popMsg', msg);
    }
});