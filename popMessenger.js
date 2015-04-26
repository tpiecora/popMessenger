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
                animation: '',
                bgColor: '',
                index: attr.idx,
                id: 'popMsg' + attr.idx,
                msg: attr.msg,
                opacity: attr.alpha || 0.7,
                position: attr.pos,
                posHStyle: '',
                posVStyle: '',
                posVVal: '',
                posHideVal: '',
                show: true,
                showTime: attr.show || 5000,
                txtColor: '',
                styles: ''
            };

            var s = scope.style;

            s.bgColor = 'background: ' + (attr.bg || 'lightgray') + ';';

            s.position = attr.pos || 'bottom-right';
            var posArr = s.position.split('-');

            console.log(s.position, attr.pos);

            s.posVStyle = posArr[0];
            s.posHStyle = posArr[1];
            /*
            //scope.style.posVStyle
            switch (posArr[0]) {
                case 'top-left' || 'top-right' || 'top':
                    s.posVStyle = 'top';
                    break;
                case 'bottom-left' || 'bottom-right' || 'bottom':
                    s.posVStyle = 'bottom';
                    break;
                //default:
                //    s.posVStyle = 'bottom';
            }

            //scope.style.posHStyle
            switch (s.position.split('-'))) {
                case 'top-left' || 'bottom-left':
                    s.posHStyle = 'left';
                    break;
                case 'top-right' || 'bottom-right':
                    s.posHStyle = 'right';
                    break;
                //default:
                //    s.posHStyle = 'right';
            }
            */
            s.posVVal = (parseInt(attr.idx) * 35) + 15;

            s.posHideVal = s.posVVal - 40;


            s.txtColor = 'color: ' + (attr.txtCol || 'black') + ';';

            if(!attr.anim || attr.anim === 'vslide') {
                s.animation =
                    '#' + s.id + ' {' + s.posHStyle + ': 15px; ' + s.posVStyle + ': ' + s.posVVal + 'px; ' +
                    'opacity: ' + s.opacity + ';} ' +
                    '#' + s.id + '.ng-hide-add.ng-hide-add-active {transition: 0.75s ease-in all; }'
                    '#' + s.id + '.ng-hide-remove.ng-hide-remove-active {transition: all linear 0.5s; !important}' +
                    '#' + s.id + '.ng-hide {' + s.posVStyle + ': ' + s.posHideVal + 'px; opacity: 0;} '
            }

            if(!attr.anim || attr.anim === 'fade') {
                s.animation =
                    '#' + s.id + ' {' + s.posHStyle + ': 15px; ' + s.posVStyle + ': ' + s.posVVal + 'px; ' +
                    'opacity: ' + s.opacity + ';} ' +
                    '#' + s.id + '.ng-hide-add.ng-hide-add-active {transition: 0.75s ease-in all; }' +
                    '#' + s.id + '.ng-hide-remove.ng-hide-remove-active {transition: all linear 0.5s; !important}' +
                    '#' + s.id + '.ng-hide {opacity: 0;} '
            }
            s.styles = s.animation + ' #' + s.id + ' {position: absolute; ' +
            'height: 30px; width: auto;  text-align: center; border-radius: 5px;' +
            'line-height: 30px; ' + s.bgColor + '}' +
            '#pop-msg {padding: 10px; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;' +
            'vertical-align: middle; margin: auto auto; ' + s.txtColor + '}';

            scope.show = false;
            scope.animateHelper = '{top: -100; !important}';
            $timeout(function() {
                scope.show = true;
            scope.$apply();
            },0);
            scope.animateHelper = '';
            console.log(s);
            $timeout(function() {
                scope.show = false;
                $timeout(function () {
                    killMe();
                }, 750);
            }, s.showTime);

            var killMe = function () {
                element.remove();
            };

        },
        template:
        '<style> {{style.styles}}' +


        '</style>' +
        '<div ng-style="animateHelper" ng-show="show" id="{{style.id}}"><span id="pop-msg" >{{style.msg}}</span></div>'
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

                if (attr.anim) {
                    scope.anim = 'anim="' + attr.anim + '"';
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
                var pmc = $compile('<pop-message-child txt-col="' + attr.txtCol + '" ' + scope.anim + ' pos="' + attr.pos + '" ' + scope.bg + ' idx="' + count + '" msg="' + msg + '"></pop-message-child>')(newScope);
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