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

app.directive('popMessageChild', function($timeout, $compile) {
    return {
        restrict: 'E',
        scope: {
            alpha: '=?',
            anim: '=?',
            bg: '=?',
            pos: '=?',
            show: '=?',
            txtCol: '=?'
        },
        link: function(scope, element, attr) {
            scope.style = {
                animation: ''
                bgColor: attr.bg,
                index: '',
                id: '#popMsg' + attr.idx,
                opacity: attr.alpha,
                position: attr.pos,
                posStyle: '',
                posStyleVal: '',
                posHideVal: '',
                showTime: attr.show,
                txtColor: attr.txtCol,
                styles: ''

            };
            var s = scope.style;
            if(attr.anim === 'vslide') {
                 s = '{{style.id}}.ng-hide {{{style.posStyle}}: {{style.posStyleVal}}px; opacity: {{style.opacity}}; transition: 0.75s ease-in all;}' +
                '{{.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -15px); } ' +
                '.top-left.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }'
            }
            scope.msg = attr.msg;
            scope.popClass = attr.pos || 'bottom-right';

            console.log(attr.idx);
            //scope.style.posVal = '200';
            scope.style.bg = attr.bg || 'lightgray';
            scope.style.opacity = attr.alpha || '0.5';
            scope.style.posVal = (parseInt(attr.idx) * 35) + 15 + 'px';
           /* if (scope.popClass === 'bottom-right' || scope.popClass === 'bottom-left') {
                scope.bg = {'background': (attr.bg || 'lightgray'), 'opacity': (attr.alpha || '0.5'), 'bottom': posVal};
            }
            if (scope.popClass === 'top-right' || scope.popClass === 'top-left') {
                scope.bg = {'background': (attr.bg || 'lightgray')};
            }*/

            scope.showTime = attr.show || 15000;
            console.log(scope.bg);
            scope.txt = {'color': (attr.txt || 'black')};
                scope.show = true;
            $timeout(function() {
                scope.show = false;
                $timeout(function () {
                    killMe();
                }, 750);
            },scope.showTime);

            var killMe = function () {
                element.remove();
            };

        },
        template:
        '<style>' +
        '.top-left {opacity: {{style.opacity}}; left: 15px; top: {{style.posVal}} } ' +
        '.top-left.ng-hide {top: -15px; opacity: 0; transition: opacity 0.75s ease-in all;}' +
        '.top-left.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -15px); } ' +
        '.top-left.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +

        '.top-right { right: 15px;} ' +
        '.top-right.ng-hide {top: -15px; opacity: 0; transition: 0.75s ease-in all;}' +
        '.top-right.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -25px); } ' +
        '.top-right.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +

        '.bottom-left { left: 15px;} ' +
        '.bottom-left.ng-hide {bottom: -25px; opacity: 0; transition: 0.75s ease-in all;}' +
        '.bottom-left.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -25px); } ' +
        '.bottom-left.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +

        '.bottom-right { right: 15px;   } ' +
        '.bottom-right.ng-hide {bottom: -25px; opacity: 0; transition: 0.75s ease-in all;}' +
        '.bottom-right.ng-hide-add-active {transition: 0.75s ease-in all; transform: translate(0, -25px); } ' +
        '.bottom-right.ng-hide-remove.ng-hide-remove-active {transition: 0.75s ease-out all; }' +


        '#pop-body {position: absolute;' +
        'height: 30px; width: auto;  text-align: center; border-radius: 5px;' +
        'line-height: 30px; background: {{style.bg}}}' +
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

app.directive('popMessage', function($timeout, $window, $compile, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            pos: '=?'
        },
        link: function (scope, element, attr) {

            var popMsg = function (msg) {
                scope.show = true;

                if (attr.pos) {
                    scope.childPos = 'pos="' + attr.pos + '"';
                }
                if (attr.bg) {
                    scope.bg = 'bg="' + attr.bg + '"';
                }

                var newScope = $rootScope.$new(),
                    count = 0,
                    x = angular.element(document.querySelector('pop-message')),
                    y = angular.element(document.querySelector('pop-message-child')),
                    z = y.next();

                if(y[0]) {
                    var indexes = [], i;
                    indexes.push(y.attr('idx'));
                    for (i = 0; i < 6; i++) {
                        if (z[0]) {
                            indexes.push(z.attr('idx'));
                            z = z.next();
                        }
                    }
                    indexes.sort(function (a, b) {
                        return a - b
                    });
                    for (i = 0; i < indexes.length; i++) {
                        if (indexes[i] != i) {
                            count = i;
                            break;
                        }
                        count++;
                    }
                }
                var pmc = $compile('<pop-message-child ' + scope.bg + ' ' + scope.childPos + ' idx="' + count + '" msg="' + msg + '"></pop-message-child>')(newScope);
                x.append(pmc);
            };

            //watch for incoming messages
            scope.$on('popMsg', function (event, msg) {
                console.log('receiving: ' + msg);
                popMsg(msg);
            })
        }
    }
});

app.factory('popMsg', function($rootScope, $injector, $compile) {
    return function (msg){
        $rootScope.$broadcast('popMsg', msg);
        /*return function getContainer () {
         var x = angular.element(document.querySelector('div'));
         //x.append('<p>I am appended</p>');

         var scope = $rootScope.$new();
         var angularDomEl = angular.element('trest');


         console.log(x);
         //return x
         return $compile(angularDomEl)(scope)    ;
         }
         */

    }

});