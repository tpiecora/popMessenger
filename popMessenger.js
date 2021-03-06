var app = angular.module('PopMessenger', ['ngAnimate']);

app.controller('MainCtrl', ["$scope", "pop", function($scope, pop) {
    $scope.message = function (msg) {
        pop(msg);
    };
    $scope.myMsg = "PopMessenger";
}]);

app.directive('popMessageChild', ["$timeout", "$compile", function($timeout, $compile) {
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
        link: function (scope, element, attr) {
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

            if (attr.pos == 'undefined') {
                s.position = 'bottom-right';
            } else {
                s.position = attr.pos;
            }

            var posArr = s.position.split('-');

            s.posVStyle = posArr[0];
            s.posHStyle = posArr[1];

            s.posVVal = (parseInt(attr.idx) * 35) + 15;

            s.posHideVal = s.posVVal - 40;


            s.txtColor = 'color: ' + (attr.txtCol || 'black') + ';';

            if (!attr.anim || attr.anim === 'vslide') {
                s.animation =
                    '#' + s.id + ' {' + s.posHStyle + ': 15px; ' + s.posVStyle + ': ' + s.posHideVal + 'px; ' +
                    'opacity: 0; transition: 0.75s ease-in all;} ' +
                    '#' + s.id + '.show {' + s.posVStyle + ': ' + s.posVVal + 'px; opacity: ' + s.opacity + '; transition: 0.75s ease-in all; } ';
            }

            if (!attr.anim || attr.anim === 'fade') {
                s.animation =
                    '#' + s.id + ' {' + s.posHStyle + ': 15px; ' + s.posVStyle + ': ' + s.posVVal + 'px; ' +
                    'opacity: 0; transition: 0.75s ease-in all; opacity: 0;} ' +
                    '#' + s.id + '.show {opacity: ' + s.opacity + '; transition: 0.75s ease-out all;}';
            }
            s.styles = s.animation + ' #' + s.id + ' {position: fixed; ' +
                'height: 30px; width: auto;  text-align: center; border-radius: 5px;' +
                'line-height: 30px; ' + s.bgColor + '}' +
                '#pop-msg {padding: 10px; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;' +
                'vertical-align: middle; margin: auto auto; ' + s.txtColor + '}';
            scope.animator = '';
            $timeout(function () {
                scope.animator = 'show';

            }, 1);
            //console.log(s);
            $timeout(function () {
                scope.animator = '';
                $timeout(function () {
                    killMe();
                }, 750);
            }, s.showTime);

            var killMe = function () {
                element.remove();
            };

        },
        template: '<style> {{style.styles}}' +


        '</style>' +
        '<div ng-class="animator" id="{{style.id}}"><span id="pop-msg" >{{style.msg}}</span></div>'
    };
}]);

app.directive('popMessage', ["$timeout", "$window", "$compile", "$rootScope", function($timeout, $window, $compile, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            alpha: '@?',
            anim: '@?',
            bg: '@?',
            pos: '@?',
            show: '@?',
            txtCol: '@?'
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

                if (attr.alpha) {
                    scope.alpha = 'alpha="' + attr.alpha + '"';
                }
                var newScope = $rootScope.$new(),
                    count = 0,
                    x = angular.element(document.querySelector('pop-message')),
                    y = angular.element(document.querySelector('pop-message-child')),
                    z = y.next();

                if (y[0]) {
                    var indexes = [], i;
                    indexes.push(y.attr('idx'));
                    for (i = 0; i < 6; i++) {
                        if (z[0]) {
                            indexes.push(z.attr('idx'));
                            z = z.next();
                        }
                    }
                    indexes.sort(function (a, b) {
                        return a - b;
                    });
                    for (i = 0; i < indexes.length; i++) {
                        if (indexes[i] != i) {
                            count = i;
                            break;
                        }
                        count++;
                    }
                }
                var pmc = $compile('<pop-message-child txt-col="' + attr.txtCol + '" ' + scope.anim + ' alpha= "' + attr.alpha + '" show="' + attr.show + '" pos="' + attr.pos + '" ' + scope.bg + ' idx="' + count + '" msg="' + msg + '"></pop-message-child>')(newScope);
                x.append(pmc);
            };

            //watch for incoming messages
            scope.$on('popMsg', function (event, msg) {
                popMsg(msg);
            });
        }
    };
}]);

app.factory('pop', ["$rootScope", "$injector", "$compile", function($rootScope, $injector, $compile) {
    return function (msg) {
        $rootScope.$broadcast('popMsg', msg);
    };

}]);
